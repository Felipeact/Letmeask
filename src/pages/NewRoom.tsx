import { FormEvent, useState } from 'react'

import { Link, useHistory } from 'react-router-dom'
import { Button } from '../components/Button'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import '../styles/auth.scss'
import { database } from '../services/firebase'
import { useAuth } from '../hooks/useAuth'


export function NewRoom(){ 
  const { user } = useAuth()
  const history = useHistory()
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })
    history.push(`/rooms/${firebaseRoom.key}`)

  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Illustration home page"/>
        <strong>Gamers Classroom </strong>
        <p>We are waiting for you </p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="logo"/>
          <h2> Create a new room</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder="Room name."
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Create Classroom</Button>
          </form>
          <p>
            Do you want to join an existent classroom? <Link to="/">click here</Link>
          </p>
        </div>
      </main>
    </div>
  )
}