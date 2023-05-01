const express = require('express');
const router = express.Router();
const userHandler = require('../handlers/user');

router.get('/list', userHandler.list)
router.get('/myPage', userHandler.myPage)
router.post('/update', userHandler.update)
router.post('/withdrawal', userHandler.withdrawal)

module.exports = router;