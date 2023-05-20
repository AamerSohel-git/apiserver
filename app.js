const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken")
const {json} = require("body-parser")
const connectDatabase = require("./database")
const userModel  = require("./Models/userModel")
const app = express();
app.use(cors());
app.use(json());
app.get("/", (request, response)=>{
    response.send("My Server is running on 7000 and up-to-date")
})

app.get('/api/deleteUsers',async(req,res)=>{
    connectDatabase("cnlidb");
  userModel.deleteMany().then((res)=>{
    res.send(res)
  }).catch((err)=>{
    res.send(err)
  })
})

app.post('/api/register',async(req,res)=>{
    connectDatabase("cnlidb");
    const count=await userModel.find({})
    const payload={
        ...req.body,
        user_name: `${req.body?.first_name} ${req.body?.last_name}`,
        is_active: true,
        user_id:Number(count.length+1),
        created_on: new Date(),
        updated_on: new Date()
    }
    const data = new userModel(payload)
    data.save().then((res)=>{
        res.json(data)
    }).catch((err)=>{
        res.send(err)
    })

})

app.post("/api/login", async(request, response)=>{
    connectDatabase("cnlidb");
    const payload = request.body
    const data = await userModel.find(payload);
    if(data.length>0){
        const key = "access_token";
        const access_token = jwt.sign(payload, key)
        response.json({user:data,token:access_token})
    }else{
        response.json("inviled credential")
    }

})

app.listen(port = 7000, ()=>{
    console.log(`my API server is listening on ${port} port`)
})

