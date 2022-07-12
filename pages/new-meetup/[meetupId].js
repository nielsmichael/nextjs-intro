import MeetupDetail from "../../components/meetups/MeetupDetail"

const MeetupDetails = () => {
  return (
    <MeetupDetail 
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Scintillant_hummingbird_%28Selasphorus_scintilla%29_female_in_flight_1.jpg/1280px-Scintillant_hummingbird_%28Selasphorus_scintilla%29_female_in_flight_1.jpg"
      alt='A first meetup' 
      address='Some address'
      description='Meetup description'
     />
  )
}

// getStaticProps needs getStaticPaths
export const getStaticPaths = async () => {
  return { // Returns object 
    // Always add fallback, false indicates that all supported paths are outlined below
    fallback: false,
    paths: [ // To be generated dynamically, but for now hardcode
      { 
        params: {
          meetupId: 'm1',
        },
      },
      {
        params: {
          meetupId: 'm2'
        },
      },
    ]
  }
}

// If data changes often (multiple times a second), getServerSideProps is optimal
// However, here data is not changing that often at all so we use getStaticProps
export const getStaticProps = async context => {
  // Fetch data for single meetup

  // Parent key
  const meetupId = context.params.meetupId

  return {
    props: {
      meetupData: {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Scintillant_hummingbird_%28Selasphorus_scintilla%29_female_in_flight_1.jpg/1280px-Scintillant_hummingbird_%28Selasphorus_scintilla%29_female_in_flight_1.jpg",
        id: meetupId,
        title: 'First meetup',
        address: 'Some address',
        description: 'First meetup description',
      },
    },
  }
}

export default MeetupDetails