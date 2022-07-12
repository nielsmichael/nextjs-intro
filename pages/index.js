import MeetupList from  '../components/meetups/MeetupList'

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Scintillant_hummingbird_%28Selasphorus_scintilla%29_female_in_flight_1.jpg/1280px-Scintillant_hummingbird_%28Selasphorus_scintilla%29_female_in_flight_1.jpg',
    address: 'An address',
    description: 'A description'
  },
  {
    id: 'm2',
    title: 'Another Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Scintillant_hummingbird_%28Selasphorus_scintilla%29_female_in_flight_1.jpg/1280px-Scintillant_hummingbird_%28Selasphorus_scintilla%29_female_in_flight_1.jpg',
    address: 'A second address',
    description: 'A second description'
  }
]

const Home = props => {
  return <MeetupList meetups={props.meetups} />
}

export const getStaticProps = async () => {
  // fetch data from API
  // Must return object
  return {
    props: {
      meetups: DUMMY_MEETUPS
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
