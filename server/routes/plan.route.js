const express = require('express')
const router = express.Router()
const Plan = require('../controllers/plan.controller')

router.get('/subscription/:id', Plan.subscription__Plan)
router.get('/payment/gettoken/:userId', Plan.getToken)
router.post('/payment/braintree/:userId', Plan.processPayment)
router.get('/getplan/:userId', Plan.GetPlan)
router.get('/runningplan/:userId', Plan.runningPlans)

module.exports = router