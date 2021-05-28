const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());

const PORT = config.get('port') || 8000

app.use(express.json({extended:true}));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/theme', require('./routes/theme'));



async function start(){
  try{
    await mongoose.connect(config.get('url'),{
      useNewUrlParser:true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false 
    })
  } catch (e){
    console.log('error' , e.message);
    process.exit(code,1);
  }
}

start()

app.listen(PORT,()=> console.log(`  CORS-enabled web server listening on port  ${PORT}`))