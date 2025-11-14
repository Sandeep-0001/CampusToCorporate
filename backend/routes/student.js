const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const ctrl = require('../controllers/student');

router.use(fileUpload());

router.post('/upload', ctrl.uploadStudents);
router.get('/leaderboard', ctrl.getLeaderboard);
router.post('/:id/refresh', ctrl.refreshStudent);
router.post('/refresh-all', ctrl.refreshAll);

module.exports = router;
