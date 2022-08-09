const express = require('express');
const router = express.Router();

router.get('/',(req, res)=>{        // This a GET to the root of our application. The server should be informed about this route before it can be used
    res.render('index.ejs') // This render the index.ejs file and place it in "body in the layout.ejs file"
});

module.exports = router; // Here the router is being exported so that the server can make use of it
