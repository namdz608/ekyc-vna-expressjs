const express=require('express');
const router=require('./routes')
const app=express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(router)

//truy cap vao thu muc anh public ra ben ngoai
app.use("/images",express.static('uploads'));

app.listen(1337,()=>console.log('app is listening 0n 1337'))