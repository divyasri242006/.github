const express = require('express');
const { body } = require('express-validator');
const controller = require('../controllers/patientController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/rbac');
const validate = require('../middleware/validate');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.get('/me', auth, authorize('PATIENT'), asyncHandler(controller.getMyProfile));
router.get('/', auth, authorize('DOCTOR'), asyncHandler(controller.listPatients));
router.post(
  '/',
  auth,
  authorize('DOCTOR'),
  [body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 8 })],
  validate,
  asyncHandler(controller.createPatient)
);
router.put('/:patientId', auth, authorize('DOCTOR'), asyncHandler(controller.updatePatient));

module.exports = router;
