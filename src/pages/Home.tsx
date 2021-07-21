import { FormEvent } from 'react';
import { useHistory } from 'react-router-dom';


import { Button } from '../components/Button'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'



import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { database } from '../services/firebase';

export function Home(){ 
  const history = useHistory();
  const { user, sigInWithGoogle } = useAuth();
  const [ roomCode, setRoomCode ] = useState('')


  async function handleCreateRoom(){
      if (!user){
        await sigInWithGoogle()
      }
      history.push('/rooms/new')
  }

  //join one classroom

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    if (roomCode.trim() === ''){
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()){
      alert('Room does not exists.');
      return
    }

    if (roomRef.val().endedAt){
      alert('Room already closed')
      return
    }

    history.push(`rooms/${roomCode}`)
  } 
    
  

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Illustration home page"/>
        <strong>Create gamers Classrooms  </strong>
        <p>make question about games and more.. </p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="logo"/>
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="google icon"/>
            create your Classroom with google
          </button>
          <div className="separator"> or join one room </div>
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text"
              placeholder="classroom code. "
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Join</Button>
          </form>
        </div>
      </main>
    </div>
  )
}