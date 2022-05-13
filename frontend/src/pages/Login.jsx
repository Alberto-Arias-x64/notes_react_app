import './styles/login.css'

import React, {useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { login, create_user,server_status } from '../actions/user'

export default function Login() {
    const [mail, set_mail] = useState('')
    const [name, set_name] = useState('')
    const [password,set_password] = useState('')
    const [password_confirm,set_password_confirm] = useState('')
    const [new_user,set_new_user] =useState(false)
    const [error,set_error] =useState('')
    const [server,set_server] = useState(false)

    const dispatch = useDispatch()
    const state  = useSelector(state => state.user)
    const navigate = useNavigate()

    const handle_submit = event =>{
        event.preventDefault()
        if(mail === '' || password === '') {
            set_error('*Datos Faltantes') 
            return
        }
        if(new_user === true && (mail === '' || password === '' || name === '' || password_confirm === '')) {
            set_error('*Datos Faltantes') 
            return
        }
        if(new_user === true && password !== password_confirm) {
            set_error('*Contraseña no coincide') 
            return
        }
        set_error('')
        if (new_user) dispatch(create_user(name,mail,password))
        else dispatch(login(mail,password))
    }

    useEffect(() => {
        if(state.code === 'LOGGED') navigate('/')
    }, [dispatch,state,handle_submit]);

    useEffect(()=>{
        server_status()
        .then(() =>set_server(true))
        .catch(() => set_server(false))
    },[handle_submit])

    return(
        <section id='login'>
            <div id='login_div'>
                <p id='advertencia'>** LA APP SE ENCUENTRA EN DESARROLLO XFAVOR UTILIZAR CREDENCIALES FALSAS **</p>
                <h2>App de notas</h2>
                <form onSubmit={handle_submit}>
                <input type="text" name='mail' autoFocus value={mail} onChange={({target}) => set_mail(target.value)} placeholder='notas@mail.com'/>
                {new_user ? <input type="text" name='name' value={name} onChange={({target}) => set_name(target.value)} placeholder='Nick name'/>:null}
                <input type="password" name='password' onChange={({target}) => set_password(target.value)} value={password} placeholder='Password'/>
                {new_user ? 
                    <>
                        <input type="password" name='password_confirm' onChange={({target}) => set_password_confirm(target.value)} value={password_confirm} placeholder='Confirm Password'/>
                        <button>Crear usuario</button>
                    </>
                    :<button>Validar</button>
                }

                </form>
                {!new_user ? <p className='new_user' onClick={() => set_new_user(!new_user)}>Nuevo por aqui?</p>:<p className='new_user' onClick={() => set_new_user(!new_user)}>Ya tengo cuenta</p>}
                {state.code === 'USER OR PASSWORD NO MATCH' ? <p className='highlight'>*usuaro o contraseña no coinciden</p>:null}
                {state.code === 'mail must be unique' ? <p className='highlight'>*El correo ya se encuentra registrado</p>:null}
                {state.code === 'name must be unique' ? <p className='highlight'>*El Nick ya esta en uso</p>:null}
                {error !== '' ? <p className='highlight'>{error}</p>:null}
                <div id='server_status'>
                    {server ? <><p>Server Status -- </p><div id='green'></div></>:<><p>Server Status -- </p><div id='red'></div></>}
                </div>
            </div>
        </section>
    )
}