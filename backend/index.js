const express = require('express')

const app = express()
app.use(express.json())

app.get('/', (req,res)=>{
    res.send({msg:"API Running!"})
})

const PORT = 8080;

app.listen(PORT, async ()=>{
    console.log(`Listening on PORT: ${PORT}`)
})