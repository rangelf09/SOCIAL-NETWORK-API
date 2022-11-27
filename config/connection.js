const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialnetworkapi', {
    userNewUrlParser: true,
    userUnifiedTopology: true
});

module.exports = mongoose.connection;
