const express =require('express')
const app=express()
const cors=require('cors')
const port=process.env.PORT || 5000




// this is middleware 

app.use(cors())
app.use(express.json())










//  from here i am write root section of serverSIde

app.get('/', (req, res) => {
    res.send('canvas-strokes server is running')
})

app.listen(port, () => {
    console.log(`Canvas-strokes sever is running on port ${port}`)
})