
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + `/public`))


app.get('/', function (req, res) {
  res.sendFile('index.html')
})

app.post('/saveMyName', (req,res)=>{
  console.log('did we hit the endpoint');

  console.log(req.body);

  res.redirect('/ejs');
})

app.get('/nodemon', function (req, res) {
  res.send('look ma, no kill process')
})


//endpoint, middleware(s)
app.get('/HelloRender', function (req, res) {
  res.send('Hello Express from Real World<br><a href="/">back to home</a>')
})

app.get('/ejs', function (req, res) {
  res.render('indexy', {pageTitle: 'my cool ejs page'});
})


app.listen(
  port, 
  ()=> console.log(
    ` server is running on ... ${port}`
  )
);

//ejs stuff
// app.get('/ejs', async (req, res) => {
 
//   await client.connect();
//   let result = await client.db("barrys-db").collection("whatever-collection").find({}).toArray();

//   console.log(result);

//   res.render('index', {
//     ejsResult : result
//   });
// });

// app.listen(3000)