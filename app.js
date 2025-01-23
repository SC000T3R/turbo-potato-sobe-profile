require('dotenv').config()
const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;

// const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

// const path = require('path)
//app.use(express.static(__dirname + `/public`))

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
// run().catch(console.dir);


app.get('/', function (req, res) {
  res.sendFile('index.html')
})

// app.get('/nodemon', function (req, res) {
//   res.send('look ma, no kill process')
// })


// //endpoint, middleware(s)
// app.get('/HelloRender', function (req, res) {
//   res.send('Hello Express from Real World<br><a href="/">back to home</a>')
// })

// app.get('/ejs', function (req, res) {
//   res.render('indexy')
// })


// app.listen(
//   port, 
//   ()=> console.log(
//     ` server is running on ... ${port}`
//   )
// );

//ejs stuff
app.get('/ejs', async (req, res) => {
 
  await client.connect();
  let result = await client.db("barrys-db").collection("whatever-collection").find({}).toArray();

  console.log(result);

  res.render('index', {
    ejsResult : result
  });
});

app.listen(3000)