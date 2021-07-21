import { useHistory, useParams } from 'react-router-dom'

import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'
import deleteImg from '../assets/images/delete.svg'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'

import '../styles/room.scss'

type RoomParams = {
  id: string;

}



export function AdminRoom() {
  const history = useHistory()
  const params = useParams<RoomParams>();
  const roomId = params.id 
  
  const {title, questions} = useRoom(roomId)

  async function handleEndRoom(){
    database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    })
    history.push('/')
  }
  
  async function handleDeleteQuestion(questionId: string){
    if (window.confirm("Do you want to delete this question?")){
       await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  } 

  async function handleCheckQuestionAsAswered(questionId: string){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    })
    
  }

  async function handleHighLightQuestion(questionId: string){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true
    })
  }
  
 
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId}/>
            <Button isOutlined onClick={handleEndRoom}> Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Class {title}</h1>
          { questions.length > 0 && <span>{questions.length} questions</span>}
        </div>

       <div className="question-list">
        {questions.map(question => {
         return (
           <Question 
              content={question.content} 
              author={question.author} 
              key={question.id}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
              >
              {!question.isAnswered && (
                <>
                  <button type="button" onClick={() => handleCheckQuestionAsAswered(question.id)}>
                   <img src={checkImg} alt="check question" />
                  </button>
              
                <button type="button" onClick={() => handleHighLightQuestion(question.id)}>
                  <img src={answerImg} alt="answer question" />
                 </button>
                </>
              )}
              
              <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                <img src={deleteImg} alt="delete question" />
              </button>

           </Question>
           )
        })}
       </div>
      </main>
    </div>
  )
}