import { useRouter } from 'next/router'

import NewMeetupForm from '../components/meetups/NewMeetupForm'

const NewMeetup = () => {
  const router = useRouter()

  const addMeetupHandler = async enteredMeetupData => {
    // Send request to /api/new-meetup
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    console.log(data)

    // Redirect with router.push()
    router.push('/')
    // Can also use router.replace() to ensure that page cannot be reloadable
  }

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />
}

export default NewMeetup