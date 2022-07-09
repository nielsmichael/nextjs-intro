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

const Home = () => {
  return <MeetupList meetups={DUMMY_MEETUPS} />
}

export default Home