const express =require('express')
const cors=require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app=express()
const port=process.env.PORT || 5000



// this is middleware 

app.use(cors())
app.use(express.json())


// from here mongodb is started 


const uri=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8bwej.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const artCollection = client.db("canvasDB").collection('artCanvas')
 
    //  to read this data 

    app.get('/craftItems', async (req,res) => {
        const cursor = artCollection.find();
        const result = await cursor.toArray()
        res.send(result)

    })
    //  this is first post section This is Creation 

    app.post('/craftItems', async (req,res)=> {
        const  newCraftItems=req.body
      const result= await artCollection.insertOne(newCraftItems)
        res.send(result)
    } )
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ping:1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);











//  from here i am write root section of serverSIde

app.get('/', (req, res) => {
    res.send('canvas-strokes server is running')
})

app.listen(port, () => {
    console.log(`Canvas-strokes sever is running on port ${port}`)
})