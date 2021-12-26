const braintree = require('braintree');
const moment = require('moment');
const Plan = require('../models/plan.model');
const User = require('../models/user.model');
const { Packages } = require('../utils/packages');
const { subscriptionPlans } = require('../utils/runningPlan');
const config = require('../config/config');
const { transporter, invoiceTemp } = require('../helper/email.template');
const { getErrorMessage } = require('../helper/dbErrorHandler');

//braintree config
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: config.merchantId,
  publicKey: config.publicKey,
  privateKey: config.privateKey,
});

exports.subscription__Plan = async (req, res) => {
  let subscriptionPkg = req.params.id.split('$')[0];
  let subscriptionPlan = req.params.id.split('$')[1];

  if (Packages[subscriptionPkg] === undefined) {
    return res.status(404).json({
      error: 'Plan does not exist',
    });
  } else if (Packages[subscriptionPkg][subscriptionPlan] === undefined) {
    return res.status(404).json({
      error: 'Plan does not exist',
    });
  } else {
    const result = Packages[subscriptionPkg][subscriptionPlan];
    res.status(200).json({
      msg: 'Package found',
      data: result,
    });
  }
};

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    console.log(req.params.userId);

    if (err)
      return res.status(500).json({
        error: err,
      });
    res.status(200).json({
      response,
    });
  });
};

exports.processPayment = async (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amountFromTheClient = req.body.amount;
  let Package = req.body.package;
  let userID = req.body.userId;

  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    async (err, result) => {
      console.log('err0r:' + err);
      if (err)
        return res.status(400).json({
          error: err,
        });
      if (result) {
        if (result.success === true) {
          // let {running, pending} = subscriptionPlans(result)
          let duration = parseInt(
            Packages[Package.split('$')[0]][
              Package.split('$')[1]
            ].Duration.split('$')[0]
          );

          let deposit_date = new Date();
          let now = new Date();
          let due_date_converter = now.setTime(
            now.getTime() + duration * 24 * 60 * 60 * 1000
          );
          let due_date = new Date(due_date_converter);
          let format_deposit_date = moment(deposit_date).format('DD-MMM-YYYY');
          let format_due_date = moment(due_date).format('DD-MMM-YYYY');

          const newPlan = new Plan({
            recieptStatus: true,
            status: 'running',
            plan: Package,
            dueDate: format_due_date,
            depositDate: format_deposit_date,
            user_id: userID,
          });
          newPlan.save((err, plann) => {
            if (err) return console.log(err);

            User.find(
              {
                _id: userID,
              },
              (err, usr) => {
                if (err) {
                  console.log('Server Error');
                } else {
                  const sendEmail = async () => {
                    transporter.sendMail(invoiceTemp(...usr, plann));
                  };
                  sendEmail();
                }
              }
            );
          });
        } else {
          const newPlan = new Plan({
            recieptStatus: false,
            status: 'pending',
            plan: Package,
            dueDate: null,
            depositDate: null,
            user_id: userID,
          });
          newPlan.save((err, res) => {
            if (err) {
              return res.status(401).json({
                error: getErrorMessage(err),
              });
            } else {
              return res.status(200).json({
                message: 'Error Purchasing Plan',
              });
            }
          });
        }
      }
    }
  );
};



exports.ProcessPaymentSuccess = async (req, res) => {
  const { userId } = req.params
  
 }




exports.GetPlan = (req, res) => {
  let pending = [];
  let running = [];
  let userID = req.params.userId;
  Plan.find(
    {
      user_id: userID,
    },
    (err, plan) => {
      if (err)
        return res.status(400).json({
          error: err,
        });
      if (plan) {
        for (var obj of plan) {
          obj.status == 'pending' ? pending.push(obj) : running.push(obj);
        }
        let runningCounter = running.length;
        let pendingCounter = pending.length;
        return res.status(200).json({
          msg: 'SUCCESS ',
          runningCounter,
          pendingCounter,
        });
      }
    }
  );
};

exports.runningPlans = async (req, res) => {
  let userID = req.params.userId;
  await Plan.find(
    {
      user_id: userID,
    },
    (err, plan) => {
      if (err)
        return res.status(400).json({
          error: err,
        });
      let { running, pending } = subscriptionPlans(plan);
      console.log(
        `runing======================================== ${running}==================================`
      );
      // console.log(pending);
      res.status(200).json({
        running,
        pending,
      });
    }
  );
};
