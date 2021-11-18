const mongoose = require('mongoose');
const statusList = require('../seed/Status');
const uniqueValidator = require('mongoose-unique-validator');

const SCHEMA = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    faqCategory: {
        faq_cat_name: {
            type: String,
            required: true
        }
    },
    question: {
        type: String
    },
    answer: {
        type: String
    },
    status: {
        type: String,
        enum: statusList.User_status,
        default: 'InActive'
    }
},
    {
        timestamps: true
    })

SCHEMA.plugin(uniqueValidator);
const Faq = module.exports = mongoose.model('Faq', SCHEMA);