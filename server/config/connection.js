const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/spacehub', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
.catch((err) => console.log(err));

module.exports = mongoose.connection;