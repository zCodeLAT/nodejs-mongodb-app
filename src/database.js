const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dbUser:AZSXDC$13579@cluster0.e5vyu.mongodb.net/Cluster0?retryWrites=true&w=majority', {
    useNewUrlParser: true
})
    .then(db=>console.log('DB is connected'))
    .catch(err=>console.error(err));