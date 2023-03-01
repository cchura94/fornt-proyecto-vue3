<template>
<div>
    <h1>Login - Ingresar</h1>
    {{ usuario }}
    <br>
    <input type="email" v-model="usuario.email">
    <br>
    <input type="password" v-model="usuario.password">
    <br>
    <button @click="funIngresar()">INGRESAR</button>

</div>
</template>

<script>
import authService from "@/service/AuthService.js";
import { ref } from "vue"
import { useRouter } from 'vue-router'

export default {
    // composition API
    setup(){
        const router = useRouter()

        const usuario = ref({email: "prueba", password: ""})
        // usuario.value

        const funIngresar = async () => {
            // console.log(usuario.value)
            const {data} = await authService.login(usuario.value)
            console.log(data);
            localStorage.setItem("access_token", data.access_token)

            router.push({name: 'about'})

        }

        return { usuario, funIngresar }
    }
}
</script>
