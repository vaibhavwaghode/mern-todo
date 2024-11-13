const express = require('express');
const app = express();
const mongoose = require('mongoose');
const FriendModel = require('./models/friend');

mongoose.connect(
    "mongodb://localhost:27017/mern-todo",
    {useNewUrlParser:true}
);

app.get('/insert',async (req,res)=>{
    const friend = new FriendModel({
        name: "bhalaldevaaa",
        age: '29',
        discription: "cheater charismatic warrior"
    })
    await friend.save();
    res.send("Inserted Data")
})


app.get('/read',async (req,res)=>{

    try{
        const result = await FriendModel.find();
        res.status(200).json(result);
    }catch(err){
        res.status(500).json(err);
    }

    // FriendModel.find()
    //     .then((data)=>{
    //             res.status(200).json(data)
    //     })
    //     .catch((error)=>{
    //         res.status(500).json(error)
    //     })
})
app.listen( 3030 ,()=>{
    console.log("server is running on port 3030")
})