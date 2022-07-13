// Define functions containing serverside code
// The code in the api folder will never run on the client, only on the server
// Triggered whenever the api route is called in the NextJS app

// /api/new-meetup

import { MongoClient } from 'mongodb'

// Posting this to my github so using environment variables
// Sorry, my mongodb free plan is just too valuable
const usr = process.env.NEXT_PUBLIC_MONGODB_USER
const pass = process.env.NEXT_PUBLIC_MONGODB_PASS

// Function is often called handler
const handler = async (req, res) => {
  if (req.method === 'POST') {
    // Executes following code if POST request...
    const data = req.body

    // Connect to MongoDB Atlas (async)
    // TO-DO: wrap following w/ try catch to handle errors
    const client = await MongoClient.connect(
      "mongodb+srv://" + usr + ":" + pass + "@cluster0.j7nvv.mongodb.net/meetups?retryWrites=true&w=majority"
    ) // NEVER RUN THIS CODE ON THE CLIENT SIDE!!! EVER!!! thank you for coming to my ted talk
    const db = client.db()

    const meetupsCollection = db.collection('meetups')

    // MongoDB documents are just objects
    const result = await meetupsCollection.insertOne(data)

    console.log(result)

    // Just like with the toilet seat, always close when finished!
    client.close()

    res.status(201).json({message: 'meetup inserted'})
  }
}

export default handler