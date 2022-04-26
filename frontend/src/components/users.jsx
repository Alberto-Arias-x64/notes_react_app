import './styles/users.css'

import { Link } from "react-router-dom"

import { url_dir } from '../URL'

const Users = users =>{
    return users.map(user => {
        return(
        <div className='online_user'>
            <Link to={`/profile/${user.id}`}><img className='online_user_img' src={`${url_dir}/${user.imagen}`} alt="user_img" /></Link>
            <h3>{user.name}</h3>
        </div>
        )
    })
}
export default Users