import './styles/new_notes.css'

import { useState } from "react"
import { useDispatch,useSelector } from "react-redux"

import { create_note } from "../actions/notes"
import {socket} from '../App'

function New_note() {
  const [title, set_title] = useState()
  const [note,set_note] = useState()

  const dispatch = useDispatch()

  const handle_post_note = event =>{
    event.preventDefault()
    const new_data = {
      id : localStorage.getItem('id_user'),
      title, 
      note
    }
    dispatch(create_note(new_data))
    set_title('')
    set_note('')
    socket.emit('@client/new_message')
  }
  return(
      <section id='new_note_form'>
        <form onSubmit={handle_post_note}>
          <input type="text" name='title' autoFocus autoComplete="off" value={title} onChange={({target}) => set_title(target.value)} placeholder='Titulo'/>
          <textarea name='note' id="text_area" cols="30" rows="10" placeholder='Nota' value={note} onChange={({target}) => set_note(target.value)}></textarea>
          <button>Enviar</button>
        </form>
      </section>
  )
}

export default New_note