const mongoose = require('mongoose');
const FaqSchema = require('../models/Faq');
const FaqService = require('../services/FaqService');
const Faq = require('../models/Faq');


exports.GetAll = (req, res, next) => {
    Faq.GetAll((err, faq) => {
        if (err) {
            console.log(err)
        }
        return res.json({
            success: true,
            faq
        })
    })
}

exports.GetByStatus = (req, res, next) => {
    Faq.GetByStatus(req.params.status, (err, faq) => {
        if (err) {
            console.log(err)
        }
        return res.json({
            success: true,
            faq
        })
    })
}

exports.Add = (req, res, next) => {
    console.log(req.body)
    let formData = new FaqSchema({
        _id: new mongoose.Types.ObjectId(),
        faqCategory: {
            faq_cat_name: req.body.faq_cat_name
        },
        question: req.body.question,
        answer: req.body.answer,
        status: req.body.status
    })
    console.log(formData)

    FaqService.Add(formData, (err, faq) => {
        if (err) {
            // console.log(err);
            let message = [];
            if (err.errors.question) message.push("Question is required.")
            if (err.errors.answer) message.push("Answer was not entered.")

            return res.json({
                success: false,
                err_subject: "Error!!",
                err_message: message
            })
        } else {
            return res.json({
                success: true,
                faq
            })
        }
    })
}

exports.GetById = (req, res, next) => {
    let id = req.params.id
    WarehouseService.GetByID(id, (err, user) => {
        res.json({
            success: true,
            user
        })
    })
}

exports.Update = (req, res, next) => {
    console.log("performing update")
    const id = req.params.id;
    let update = new FaqSchema({
        faqCategory: {
            faq_cat_name: req.body.faq_cat_name
        },
        question: req.body.question,
        answer: req.body.answer,
        status: req.body.status
    })
   
    FaqService.Update(id, update, (err, data) => {
        if (err) {
            let message = [];
            console.log(err);
            if (err.errors.question) message.push("Question is required.")
            if (err.errors.answer) message.push("Answer was not entered.")

            return res.json({
                success: false,
                err_subject: "Error !!",
                err_message: message
            })
        } else {
            return res.json({
                success: true,
                success_subject: "Success !!",
                success_message: "Faq Updated Successfully.."
            })
        }
    })

}

exports.UpdateStatus = (req, res, next) => {
    console.log(req.params._id)
    FaqService.GetByID(req.params._id, (err, user) => {
        if (user) {
            if (user.status == "Active") {
                FaqService.updateUserStatus(req.params._id, 'InActive', (err, data) => {
                    if (err) {
                        res.json({
                            success: false,
                            err_subject: "Error..",
                            err_message: err
                        })
                    }
                    if (data) {
                        res.json({
                            success: true,
                            success_subject: "Success!!",
                            success_message: "Faq Status InActivated Successfully."
                        })
                    }
                })
            } else if (user.status == "InActive") {

                FaqService.updateUserStatus(req.params._id, 'Active', (err, data) => {
                    if (err) {
                        res.json({
                            success: false,
                            err_subject: "Error..",
                            err_message: err
                        })
                    }
                    if (data) {
                        res.json({
                            success: true,
                            success_subject: "Success!!",
                            success_message: "Faq Status Activated Successfully."
                        })
                    }
                })
            } else if (user.status == "DeActivate") {
                FaqService.updateUserStatus(req.params._id, 'Active', (err, data) => {
                    if (err) {
                        res.json({
                            success: false,
                            err_subject: "Error..",
                            err_message: err
                        })
                    }
                    if (data) {
                        res.json({
                            success: true,
                            success_subject: "Success!!",
                            success_message: "Faq Status Activated Successfully."
                        })
                    }
                })

            }
        }
        if (err) {
            res.json({
                success: false,
                err_subject: 'unhandled',
                err_message: err
            })
        }
    });
}

exports.DeActivateUser = (req, res, next) => {
    console.log(req.params._id)
    FaqService.deactivateUser(req.params._id, (err, success) => {
        if (err) {
            res.json({
                success: false,
                err_subject: 'Error!!',
                err_message: 'Oops Something went wrong, Please contact your admin'
            })
        }
        if (success) {
            res.json({
                success: true,
                success_subject: 'Success!!',
                success_message: 'Faq Deactivated Successfully'
            })
        }
    })
}