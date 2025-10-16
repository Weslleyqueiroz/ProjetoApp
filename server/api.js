import express from "express";


const app = express();
const PORT = 3000;

app.get('/login', (req,res)=>{
    res.send('deu bom')
})


app.listen(3000, ()=>{
    console.log("rodando!")
})