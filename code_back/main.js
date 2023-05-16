const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const bodyParser = require('body-parser');


dotenv.config()

const DB = process.env.DB_URL
mongoose.connect(DB, { useNewUrlParser: true })

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
},

    { timestamps: true }

);

const Users = mongoose.model("users", UserSchema)


const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.get("/users", async (req, res) => {
    try {
        const users = await Users.find({})
        res.send(users)
    } catch (err) {
        res.status(500).json({ message: err })
    }
})


app.get("/users/:id", async (req, res) => {
    try {
        const userId  = req.params.id;
        const user = await Users.findById(userId)
        res.send(user)
    }
    catch(err){
        res.status(404).json({message: err})
    }
})

app.post("/users", (req, res) => {
    try {
        let user = new Users({
            username: req.body.username,
            password: req.body.password
        })
        user.save()
        res.send(user)
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
})

app.delete("/users/:id", async(req,res)=>{
    try{
        const userId = req.params.id;
        const user = await Users.findByIdAndDelete(userId)
        res.send(user)
    }
    catch(err){
        res.status(404).json({message: "note found"})
    }
})

// update
app.put("/users/:id", async(req,res) =>{
    try{
        const userId = req.params.id;
        const updatedUser = req.body 
        const result = await Users.findByIdAndUpdate(userId, updatedUser, {new: true})
        res.send(result)
    }
    catch(err){
        res.status(404).json({message: err})
    }
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is up on port: ${PORT}`);
});