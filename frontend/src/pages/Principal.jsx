import './styles/notes.css'

import {useEffect,useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {init_notes} from '../actions/notes'

import New_note from '../components/form_new_notes'
import Notes from '../components/notes'
import Principal from '../components/principal'
import Users from '../components/users'
import {socket} from '../App'

const Principal_notes = () =>{
    const [charge, set_charge] = useState(true)
    const [online_users, set_online_users] = useState([])
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(init_notes())
        if (state.lenth !== 0) set_charge(false)
        socket.emit('@client/new_user',{
            id: state.user.id,
            name: state.user.name,
            imagen: state.user.imagen
        })
    }, []);

    useEffect(() => {
        socket.on('@server/new_user', data => {
            set_online_users(data)
        })
        socket.on('@server/new_message',() =>{
            dispatch(init_notes())
        })
    }, [socket]);

    return(
        <Principal>
            <div id='Bienvenida'>
                <h1>Bienvenido a la aplicacion de notas</h1>
                <br />
                <h1>Tablero publico: </h1>
            </div>
            <div id='principal_grid'>
                <Notes notes ={state.notes} charge={charge}/>
                <div id='form_new_note_principal'>
                    <New_note/>
                    <div>
                        <h2>Online Users</h2>
                        {Users(online_users)}
                    </div>
                </div>
            </div>
        </Principal>
    )
}
export default Principal_notes