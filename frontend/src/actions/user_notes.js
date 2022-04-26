import axios from 'axios'
import {url_dir} from '../URL'

export const user_notes = async (id) =>{
  const token = localStorage.getItem('token')
  const config = {headers: {Authorization: `Bearer ${token}`}}
  const {data} = await axios.get(`${url_dir}/api/comments/user/${id}`,config)
  return await data
}

export const delete_note = async(credentials) =>{
  const token = localStorage.getItem('token')
  axios.delete(`${url_dir}/api/comments`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      ...credentials
    }
  })
  .then(response => response.data)
  .catch(false)
}