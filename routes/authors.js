const express = require('express');
const router =  express.Router();
const Author = require('../models/author');

// All Authors route
router.get('/',async (req,res)=>{
    let searchOptions = {}// this is added for the search of the authors
    if(req.query.name != null && req.query.name !== ''){ // using query insread of req.body, this is because is GET sends information through the query string
        searchOptions.name = new RegExp(req.query.name, 'i') // this will make that the name will be searched even if it is partially typed in. The i is used to indicate that the case should be ignored
    }
    try{
        const authors = await Author.find(searchOptions) // this is the author model from mongoose
        res.render('authors/index',{
            authors:authors,
            searchOptions: req.query
        });
    }catch{
        res.redirect('/');
    }
});

// New Authors route
router.get('/new', (req,res)=>{
    res.render('authors/new',{author: new Author() })
});

// Create Authors route
router.post('/', async (req,res)=>{
    const author = new Author({
        name: req.body.name
    })
    try{
        const newAuthor = await author.save() // this is due to the fact that the database is async
        res.redirect('authors');
    }catch{
        res.render('authors/new',{
            author:author,
            errorMessage: 'Error creating Author'
        })
    }
});

module.exports = router;
