import axios from 'axios'
import {url_dir} from '../URL'

const get_notes = (token) =>{
  const config = {headers: {Authorization: `Bearer ${token}`}}
  return axios.get(`${url_dir}/api/comments`,config)
  .then(response => response.data)
  .catch(false)
}

function post_note (token,credentials){
  const config = {headers: {Authorization: `Bearer ${token}`}}

  return axios.post(`${url_dir}/api/comments`,credentials,config)
  .then(response => response.data)
  .catch(false)
}

export const init_notes = () =>{
  return async (dispatch) =>{
      const notes = await get_notes(localStorage.getItem('token'))
      dispatch({
          type: '@notes/init',
          payload: notes
      })
  }
}

export const create_note = element =>{
  return async (dispatch) =>{
    const notes = await post_note(localStorage.getItem('token'),element)
    dispatch({
        type: '@notes/create_new_note',
        payload: notes
    })
  }
}
