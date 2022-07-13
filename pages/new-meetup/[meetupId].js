import { MongoClient, ObjectId } from 'mongodb'

const usr = process.env.NEXT_PUBLIC_MONGODB_USER;
const pass = process.env.NEXT_PUBLIC_MONGODB_PASS;


import MeetupDetail from "../../components/meetups/MeetupDetail"

const MeetupDetails = props => {
  return (
    <MeetupDetail 
      src={props.meetupData.image}
      alt={props.meetupData.title} 
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
     />
  )
}

// getStaticProps needs getStaticPaths
export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://" +
      usr +
      ":" +
      pass +
      "@cluster0.j7nvv.mongodb.net/meetups?retryWrites=true&w=majority"
  ) // NEVER RUN THIS CODE ON THE CLIENT SIDE!!! EVER!!! thank you for coming to my ted talk
  const db = client.db()

  const meetupsCollection = db.collection("meetups")

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray()

  client.close()

  return { // Returns object 
    // Always add fallback, false indicates that all supported paths are outlined below
    fallback: false,
    paths: meetups.map(meetup => ({
      // Dynamically generate array of paths based on the array of ids returned from collection.find() above
      params: { meetupId: meetup._id.toString() },
    })),
  }
}

// If data changes often (multiple times a second), getServerSideProps is optimal
// However, here data is not changing that often at all so we use getStaticProps
export const getStaticProps = async context => {
  // Fetch data for single meetup

  // Parent key
  const meetupId = context.params.meetupId

  const client = await MongoClient.connect(
    "mongodb+srv://" +
      usr +
      ":" +
      pass +
      "@cluster0.j7nvv.mongodb.net/meetups?retryWrites=true&w=majority"
  ) // NEVER RUN THIS CODE ON THE CLIENT SIDE!!! EVER!!! thank you for coming to my ted talk
  const db = client.db()

  const meetupsCollection = db.collection("meetups")

  // Access single meetup
  const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) })

  client.close()

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description
      },
    },
  }
}

export default MeetupDetails