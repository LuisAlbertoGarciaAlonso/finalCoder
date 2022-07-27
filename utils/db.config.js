// const mongoose = require('mongoose');
// require('dotenv').config();

// //mongoose.set('debug', process.env.NODE_ENV !== 'production')

// const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@luisalgar.divye.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority` ;

// mongoose.connect(uri)
//     .then(() => {
//         console.log('Base de Datos Conectada')
//     }).catch((err) => {
//         console.log(err)
//     });

const mongoose = require('mongoose')

mongoose.set('debug', process.env.NODE_ENV !== 'production')

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@luisalgar.divye.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority` ;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(() => {
  console.log('Base de Datos Conectada')
}).catch((err) => {
  console.log(err)
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
})

module.exports = mongoose.connection
