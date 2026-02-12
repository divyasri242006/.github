const express = require('express');
const { body } = require('express-validator');
const controller = require('../controllers/authController');
const validate = require('../middleware/validate');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.post(
  '/signup',
  [body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 8 }), body('role').optional().isIn(['PATIENT', 'DOCTOR'])],
  validate,
  asyncHandler(controller.signup)
);
router.post('/login', [body('email').isEmail(), body('password').notEmpty()], validate, asyncHandler(controller.login));
router.post('/refresh', [body('refreshToken').notEmpty()], validate, asyncHandler(controller.refresh));

module.exports = router;
