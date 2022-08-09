if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const espressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index'); // inporting the index route to the server. The app should be told to use it bofore it can be useful

app.set('view engine', 'ejs');
app.set('views',__dirname+'/views'); // getting the views in the current directory in "views"
app.set('layout','layouts/layout'); // This is so that our layout is in one file and we do not have to duplicate
app.use(espressLayouts); // We are useing express layouts. Note that this is the varaible that we created "expressLayouts"
app.use(express.static('public')); // telling expess where our public files are going to be

const mongoose = require('mongoose'); // importing the mongoose library
mongoose.connect(process.env.DATABASE_URL,{ // This is such that the url does not have to be hardcoded. Thus the server can run on a diffrent machine.
    useNewUrlParser: true //todo this might not be needed
});
const db =  mongoose.connection;
db.on('error',error => console.error(error));
db.once('open',()=>console.log('Connected to Mongoose'));

app.use('/',indexRouter); // Telling the app to make use of the index router

app.listen(process.env.PORT||3000); // Telling the app were to listen. The port 3000 is there when our server is not telling us the port we should listen to, this is so that we are able to test it locally 


