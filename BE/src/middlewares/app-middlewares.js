const express = require('express');
const router = express.Router();
let cors = require('cors')

router.use(cors())
router.use(express.json());


module.exports = router;