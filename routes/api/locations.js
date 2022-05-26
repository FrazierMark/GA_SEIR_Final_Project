const express = require('express');
const router = express.Router();
const locationsCtrl = require('../../controllers/locations');
const multer = require('multer')
const upload = multer(); // <- handles multipart/formdata requests(photos)
// /*---------- Public Routes ----------*/
router.post('/', locationsCtrl.create);
router.get('/', locationsCtrl.index)


/*---------- Protected Routes ----------*/

module.exports = router;