import { MongoClient } from 'mongodb' // will not be included in client-side bundle

import MeetupList from  '../components/meetups/MeetupList'

const Home = props => {
  return <MeetupList meetups={props.meetups} />
}

export const getStaticProps = async () => {
  // fetch data from API
  // getStaticProps code is only executed serverside, which means a seperate API function to get data from db is unnecessary/cumbersome
  const usr = process.env.NEXT_PUBLIC_MONGODB_USER
  const pass = process.env.NEXT_PUBLIC_MONGODB_PASS

  const client = await MongoClient.connect(
    "mongodb+srv://" +
      usr +
      ":" +
      pass +
      "@cluster0.j7nvv.mongodb.net/meetups?retryWrites=true&w=majority"
  ); // NEVER RUN THIS CODE ON THE CLIENT SIDE!!! EVER!!! thank you for coming to my ted talk
  const db = client.db()

  const meetupsCollection = db.collection("meetups")

  const meetups = await meetupsCollection.find().toArray() // Get all documents with .find() and convert to array

  // Close connection
  client.close()

  // Must return object
  return {
    props: {
      meetups: meetups.map(meetup => ({ // Need to use map bc MongoDB returns a crazy auto-generated object id instead of string
        title: meetup.title,
        address: meetup.address,
        image: meetup.image, 
        // Description not needed here
        // Convert object _id returned by MongoDB to string
        id: meetup._id.toString()
      }))
    },
    revalidate: 10 // number of seconds until re-generating on server so long as there are requests coming in
  }
}

export default Home

// getStaticProps alternative
// export const getServerSideProps = async (context) => {
//   // fetch data from API, etc
//   // this code only runs on server

//   const req = context.req
//   const res = context.res

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//     // no need to revalidate in getServerSideProps runs for every request
//   }
// }
