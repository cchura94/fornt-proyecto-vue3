import axios from 'axios'

// const urlServidor = 'http://127.0.0.1:8000/api';
const urlServidor = 'https://api.ventas.blumbit.net/laravel/public/api';
export const urlAsset = 'https://api.ventas.blumbit.net/laravel/public'

export const http = () => {

    let token = localStorage.getItem("access_token")
    
    const interceptor = axios.create({
        baseURL: urlServidor,
        headers: {
            'Accept': 'application/json',
            // 'Content-Type': 'application/json'
            'Authorization': 'Bearer ' + token
        },
        timeout: 30000
    });

    // capturar errores (401, 403)
    interceptor.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if(error.response.status === 401){
                localStorage.removeItem("access_token");
                window.location.href = "/login"
            }
            
            return Promise.reject(error);
        }
    )


    return interceptor;
}
