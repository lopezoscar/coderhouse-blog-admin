"use strict";
var request = require("request");

module.exports = {

    getBlogByUsername:function(params,callback){
        request.get('/blog/'+params.blog+"/"+params.link,function(err,response,body){
            if(err){
                callback(err,null);
            }else{
                callback(null,body);
            }
        });
    }
};
