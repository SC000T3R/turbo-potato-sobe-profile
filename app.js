
const express = require('express')
require('dotenv').config()
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;
const port = process.env.PORT || 4444;
const bodyParser = require('body-parser')

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})


const mongoCollection = client.db("scooter-turbo-potato-sobe-profile").collection("scooter-turbo-potato-sobe-profile"); 

function initProfileData() {

  mongoCollection.insertOne({ 
    title: "this is blog title",
    post: "this is the post"
  });

// }

app.get('/', async function (req, res) {
  
  let results = await mongoCollection.find({}).toArray(); 
  
  res.render('profile', 
    { profileData : results} ); 

})

app.post('/insert', async (req,res)=> {

  let results = await mongoCollection.insertOne({ 
    title: req.body.title,
    post: req.body.post
  });

  res.redirect('/');

}); 
app.post('/delete', async function (req, res) {
  
    let result = await mongoCollection.findOneAndDelete( 
    {
      "_id": new ObjectId(req.body.deleteId)
    }
  ).then(result => {
    
    res.redirect('/');
  })

}); 

app.post('/update', async (req,res)=>{
  let result = await mongoCollection.findOneAndUpdate( 
  {_id: ObjectId.createFromHexString(req.body.updateId)}, { 
    $set: 
      {
        title : req.body.updateTitle, 
        post : req.body.updatePost 
      }
     }
  ).then(result => {
  console.log(result); 
  res.redirect('/');
})
}); 

app.listen(port, ()=> console.log(`server is running on ... localhost:${port}`) );
