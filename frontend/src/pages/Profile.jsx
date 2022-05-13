import './styles/profile.css'

import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"

import { search_user } from "../actions/user"
import { user_notes } from '../actions/user_notes'

import Principal from "../components/principal"
import Notes from '../components/notes'
import {socket} from '../App'
import { url_dir } from '../URL'

const Profile = () =>{
    const [user,set_user] = useState({})
    const [notes, set_notes] = useState([])

    const {id} = useParams()

    useEffect(() => {
        search_user(id)
        .then(data => {
            set_user(data)
        })
        user_notes(id)
        .then(data => {
            set_notes(data)
        })
    },[id]);

    useEffect(() => {
        socket.on('@server/new_message',() =>{
            user_notes(id)
            .then(data => set_notes(data))
        })
    }, [socket]);

    

    return(
        <Principal>
            {user !== {} ?
            <section id='nepe'>
                <div id='profile'>
                    <div id='profile_contend'>
                        <img src={`${url_dir}/${user.imagen}`} alt="user_img" />
                        <div id='contend'>
                            <h1 id='name'>{user.name}</h1>
                            <p>ID: {id}</p>
                            <h2 id='mail'>{user.mail}</h2>
                        </div>
                    </div>
                    <div id='decorador'></div>
                    <Notes notes={notes} charge={false} delete_button={id === localStorage.getItem('id_user')? true: false}/>
                </div>
            </section>:
            <div className='loading'>

            </div>
            }
        </Principal>
    )
}

export default Profile