const express = require ('express');
const app = express();


//ROUTES
const { getPosts } = require('./routes/post');


app.get('/',getPosts);

const port=8000;

app.listen(port,()=> {
    console.log (`The Api is listening on port: ${port}`);
});

