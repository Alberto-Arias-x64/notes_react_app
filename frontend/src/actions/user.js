import axios from 'axios'
import {url_dir} from '../URL'

export const login = (mail,password) =>{
    return async (dispatch) =>{
        axios.post(`${url_dir}/api/user/login`,{mail,password})
        .then(({data}) => {
            localStorage.setItem('token',data.token)
            localStorage.setItem('id_user',data.id)
            dispatch({
                type:'@user/init',
                payload: data
            })
        })
        .catch(error =>{
            dispatch({
                type: '@user/fail',
                payload: {code:error.response.data.code}
            })
        })
    }
}

export const init_login = () =>{
    return async (dispatch) =>{
        const token = localStorage.getItem('token')
        const config = {headers: {Authorization: `Bearer ${token}`}}
        if (token){
            axios.post(`${url_dir}/api/user/login_token`,{token},config)
            .then (({data}) => {
                localStorage.setItem('token',data.token)
                localStorage.setItem('id_user',data.id)
                dispatch({
                    type:'@user/init',
                    payload: data
                })
            })
            .catch(error =>{
                dispatch({
                    type: '@user/fail'
                })
            })
        }
        else{
            dispatch()
        }
    }
}

export const create_user = (name,mail,password) =>{
    return async (dispatch) =>{
        axios.post(`${url_dir}/api/user`,{name,mail,password})
        .then(({data}) => {
            localStorage.setItem('token',data.token)
            localStorage.setItem('id_user',data.id)
            dispatch({
                type:'@user/init',
                payload: {code:'LOGGED',...data}
            })
        })
        .catch(error =>{
            console.log(error.response.data.errors[0].param)
            dispatch({
                type: '@user/fail',
                payload: {code:error.response.errors[0]}
            })
        })
    }
}

export const search_user = async(id) =>{
    const token = localStorage.getItem('token')
    const config = {headers: {Authorization: `Bearer ${token}`}}
    return axios.get(`${url_dir}/api/user/${id}`,config)
    .then(({data}) => data)
    .catch(null)
}

export const server_status = async () =>{
    return axios.get(`${url_dir}/api/`)
    .then(({data}) => data)
    .catch(null)
}