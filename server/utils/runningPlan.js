const moment = require('moment')
const { Packages } = require('./packages');

exports.subscriptionPlans = (result) => {
  let pending = [];
  let running = [];

  for (let obj of result) {
    obj.status == 'pending' ? pending.push(obj) : running.push(obj);
  }

  if (running.length) {
    for (let i = 0; i < running.length; i++) {
      let { Sale_price, Duration } =
        Packages[running[i].plan.split('$')[0]][
          running[i].plan.split('$')[1]
        ];
      running[i].Sale_price = Sale_price;
      running[i].Duration = Duration;

      today = new Date();
      now =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();
      due_date = new Date(running[i].dueDate);
      ExpiredDate =
        due_date.getFullYear() +
        '-' +
        (due_date.getMonth() + 1) +
        '-' +
        due_date.getDate();
      console.log('now===' + now);
      console.log('expired===' + ExpiredDate);

      if (ExpiredDate < now) {
        running[i].status = 'Completed';
      }
    }
  }
  return { pending, running };
};
