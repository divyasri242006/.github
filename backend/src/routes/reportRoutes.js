const express = require('express');
const controller = require('../controllers/reportController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.get('/', auth, asyncHandler(controller.listReports));
router.get('/patient/:patientId', auth, asyncHandler(controller.getPatientReports));
router.post('/', auth, upload.single('file'), asyncHandler(controller.createReport));

module.exports = router;
