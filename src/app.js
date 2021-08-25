const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());

const dotenv = require('dotenv');

dotenv.config({ path: './.env'});

app.use(express.json());

app.use(require('./Routers/index'));

require('./Database/index');

if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("App is running");
});