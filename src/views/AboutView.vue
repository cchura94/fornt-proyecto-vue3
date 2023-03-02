<template>
  <div class="about">
    <h1>ACERCA DE</h1>
    <button @click="salir">SALIR</button>
    {{ mis_datos }}
  </div>
</template>

<script>
import authService from "@/service/AuthService"
import {ref} from "vue"
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()

    const mis_datos = ref({})

    const perfil = async () => {
      const {data} = await authService.getPerfil();
      mis_datos.value = data
    }

    const salir = async () => {

      await authService.logout();

      localStorage.removeItem("access_token");

      router.push({name: 'Login'})

    }

    perfil()

    return {mis_datos, salir}
    
  },
}
</script>
