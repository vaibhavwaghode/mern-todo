const mongoose = require('mongoose');

const FriendSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    age:{
        type: Number,
        require: true
    },
    discription:{
        type: String,
        require: false
    }
});

const FriendModel = mongoose.model('friends',FriendSchema);

module.exports = FriendModel;