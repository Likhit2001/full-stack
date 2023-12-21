const connectToMongo = require('./db');
const express = require('express')

 connectToMongo();
const app = express()
var cors = require('cors')


app.use(cors())
const port = 5500

// A middle ware so that we could use request's body 
app.use(express.json());

// required routes
app.use('/api/auth' , require('./routes/auth'));
app.use('/api/notes' , require('./routes/notes'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

