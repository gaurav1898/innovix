const express = require('express');
const router = express.Router();
const FaqController = require('../controller/FaqController')

router.get('/', FaqController.GetAll);
router.get('/getByStatus/:status', FaqController.GetByStatus);
router.get('/:id', FaqController.GetById);
router.get('/statusUpdate/:_id', FaqController.UpdateStatus);

router.post('/', FaqController.Add);

router.put("/:id", FaqController.Update);

router.delete("/:id", FaqController.DeActivateUser);

module.exports = router;