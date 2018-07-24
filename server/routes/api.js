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

router.get('/articles/:id',function(req,res){
    console.log('Requesting a specific article');
    console.log(req.params.id);
    article.findById(req.params.id)
        .exec(function(err,article){
            if(err)
            {
                console.log(err)
                console.log('Error getting the article');
            }
            else
            {
                console.log(article);
                res.json(article);
            }
        });
});

router.post('/create',function(req,res){
    console.log('Posting an Article');
    var newArticle=new article();
    newArticle.title=req.body.title;
    newArticle.content=req.body.content;
    newArticle.save(function(err,article){
        if(err)
        {
            console.log(1, err)
            console.log('Error inserting the article');
        }
        else
        {
            res.json(article);
        }
    });

});

router.post('/update/:id', function (req, res) {
    console.log('Updating an Article', req.body);

    article.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body._id)}, { $set: req.body}, { new: true}).exec(function (err, doc) {
        if (err) {
            console.log('update err', err)
        } else {
            console.log('----',doc)
            res.json(req.body);
        }
    })
});

module.exports=router;

