"use strict";
var request = require("request");

module.exports = {

    getPostByLink:function(blog,link,callback){
        request.get('/posts/'+blog+"/"+link,function(err,response,body){
           if(err){
               callback(err,null);
           }else{
               callback(null,body);
           }
        });
    }
};
