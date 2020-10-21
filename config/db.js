const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err, res) =>{

    if (err) throw err
    console.log('DB Connected successfuly.');

});

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'));
