"use strict";
var request = require("request");

module.exports = {
    getUserByUsername:function(username,callback){
        request('/users/username/:username',function(err,response,body){
            callback(err,body);
        });
    }
};
