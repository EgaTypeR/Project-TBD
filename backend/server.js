const express = require("express")
const bookRoutes = require('./book/bookRoute')


const app = express()
const port = 5000

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Ganti dengan domain Anda
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(express.json())
app.use('/api/v1/book', bookRoutes)


app.listen(port, () => console.log(`app listening on port ${port}`))