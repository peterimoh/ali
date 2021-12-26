const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const {
  userSigninValidator,
  userSignupValidator,
} = require('../validators/auth.validate');
const { runValidation } = require('../validators/run.validate');

// router.post('/presignup', userSignupValidator, runValidation, auth.preSignup);
// router.post('/signup-redirect', auth.Signup);

router.post('/signup', userSignupValidator, runValidation, auth.Register);
router.post('/login', userSigninValidator, runValidation, auth.Login);

router.post('/forget-password', auth.ForgetPassword);
router.post('/reset-password', auth.resetPassword);
router.post('/update-password/:userID', auth.updatePassword);
router.post('/my-account', auth.getAuthorization)
router.post('/update-profile/:userId', auth.updateProfile)

//card
router.post('/add-card/:userId', auth.createCard);
router.get('/get-cards/:userId', auth.getCard);

//billing address
router.post('/add-address/:userId', auth.createBilling);
router.get('/get-address/:userId', auth.getBilling);

module.exports = router;
