import './styles/notes.css'

import { format,register } from 'timeago.js'
import {Link} from 'react-router-dom'

import {delete_note} from '../actions/user_notes'
import {socket} from '../App'
import {url_dir} from '../URL'
 
function cards(params,delete_button) {
  const localeFunc = (number,index,totalSec) => {
    // number: the timeago / timein number;
    // index: the index of array below;
    // totalSec: total seconds between date to be formatted and today's date;
    return [
      ['justo ahora', 'en un rato'],
      ['hace %s seg', 'en %s segundos'],
      ['hace 1 min', 'en 1 minuto'],
      ['hace %s min', 'en %s minutos'],
      ['hace 1 h', 'en 1 hora'],
      ['hace %s h', 'en %s horas'],
      ['hace 1 d', 'en 1 día'],
      ['hace %s d', 'en %s días'],
      ['hace 1 sem', 'en 1 semana'],
      ['hace %s sem', 'en %s semanas'],
      ['hace 1 m', 'en 1 mes'],
      ['hace %s m', 'en %s meses'],
      ['hace 1 año', 'en 1 año'],
      ['hace %s años', 'en %s años'], 
    ][index];
  };
  // register your locale with timeago
  register('es', localeFunc);

  const handle_delete = ({target}) => {
    const delete_element = {
      id_comment: target.id,
      id: localStorage.getItem('id_user')
    }
    delete_note(delete_element)
    .then(() => socket.emit('@client/new_message'))
  }
  
  return params.map(({title,note,id_comment,user,imagen,updatedAt,UserId}) =>{
    const date = new Date(updatedAt)
    return(
      <div key={id_comment} className='card'>
        <Link to={`/profile/${UserId}`}><img className='user_img' src={`${url_dir}/${imagen}`} alt="user_img" /></Link>
        <div>
          <div className='data_user'>
            <h3 className='titulo'>{user}</h3>
            <p>{format(date,'es')}</p>
          </div>
          <h4>{title}</h4>
          <p>{note}</p>
          {delete_button?
          <button className='delete_button' id={id_comment} onClick={handle_delete}> borrar</button>:
          null
          }
        </div>
      </div>
    )
  })
}

const Notes = ({notes,charge,delete_button = false}) => {
  return(
  <>
    {!charge ? <section id='cards'><div id='mantel'>{cards(notes,delete_button)}</div></section> : <p>Cargando...</p>}
  </>
  )
}

export default Notes