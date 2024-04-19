const express = require('express');
const router = express.Router();
const path = require('path');

//const modulRoute = require('./')
const authRoute = require('./auth.route');
const commentRoute = require('./comment.route')
const dataRoute = require('./data.route');
const noRoute = require('./no.route');

// router.use('/my-article', router.get('/', (req, res) => (req, res.sendFile(path.join(__dirname + '../../../public/index.html')))))
// router.get('/login', function (req, res) {
//     res.sendFile(path.join(__dirname + '../../../public/login.html'));
// });
// router.get('/admin/comments', function (req, res) {
//     res.sendFile(path.join(__dirname + '../../../public/admin/index.html'));
// });
// router.get('/admin/comments/edit', function (req, res) {
//     res.sendFile(path.join(__dirname + '../../../public/admin/edit.html'));
// });

router.use('/auth', authRoute);
router.use('/comment', commentRoute)
router.use('/data',dataRoute);
router.use(noRoute);

module.exports = router;