const bcrypt = require('bcryptjs');
const Faq = require('../models/Faq');

module.exports.GetCount = function (callback) {
    ;
    Faq.find().count(callback);
}
module.exports.GetCountByStatus = function (status, callback) {
    let query = {
        status: status
    }
    Warehouse.find(query).count(callback);
}

module.exports.GetByID = function (id, callback) {
    Faq.findById(id, callback)
}

module.exports.GetAll = function (callback) {
    Faq.find(callback);
}

module.exports.GetByStatus = function (status, callback) {
    let query = {
        status: status
    }
    Faq.find(query, callback);
}

module.exports.Add = function (formData, callback) {
    formData.save(callback);
}

module.exports.Update = function (id, updateData, callback) {
    let query = {
        _id: id,
    }
    Faq.updateOne(query, { $push: updateData }, callback);
}


module.exports.updateUserStatus = function (UserId, status, callback) {
    let query = {
        _id: UserId
    }
    let setStatus = {
        status: status
    }
    Faq.updateOne(query, { $set: setStatus }, callback);
}

module.exports.deactivateUser = function (UserId, callback) {
    let query = {
        _id: UserId
    }
    let setStatus = {
        status: 'DeActivate'
    }
    Faq.updateOne(query, { $set: setStatus }, callback);
}