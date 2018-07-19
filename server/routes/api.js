const express = require('express');
const router=express.Router();
const mongoose=require('mongoose');
const article=require('../models/article');

const db ="mongodb://bloguser:aktarmhd1@ds139921.mlab.com:39921/samsmongodb";

mongoose.Promise=global.Promise;
mongoose.connect(db, { useNewUrlParser: true },function (err) {
    console.log('called');
    if(err)
    {
        console.log('Error connecting');
    } else {
        console.log('connected successfully');
    }
});

router.get('/all',function(req,res)
{
    article.find({})
        .exec(function(err,articles)
            {
                if(err)
                {
                    console.log('Error getting the articles');
                } else
                {
                    console.log(articles);
                    res.json(articles);
                }
            });
});

module.exports=router;
