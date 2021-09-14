'use strict';

const express = require('express');

const router = express.Router();
const ctrl = require('./root.ctrl');
const loginAuth = require('../../middlewares/login-auth');
const signUpAuth = require('../../middlewares/signUp-auth');

router.get('/login-check', loginAuth.loginCheck, ctrl.process.resUserInfo);
router.post('/login', ctrl.process.login);
router.post('/sign-up', signUpAuth.signUpCheck, ctrl.process.signUp);

router.post('/find-id', ctrl.process.findId);
router.patch(
  '/reset-password',
  loginAuth.loginCheck,
  ctrl.process.resetPassword
);
router.post('/send-email', ctrl.process.sendEmail);
router.patch('/find-password', ctrl.process.findPassword);

module.exports = router;
