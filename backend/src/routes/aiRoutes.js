const express = require('express');
const { body } = require('express-validator');
const controller = require('../controllers/aiController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.post(
  '/analyze',
  auth,
  [body('medicalText').optional().isString(), body('ocrText').optional().isString(), body('doctorNotes').optional().isString()],
  validate,
  asyncHandler(controller.analyze)
);

module.exports = router;
