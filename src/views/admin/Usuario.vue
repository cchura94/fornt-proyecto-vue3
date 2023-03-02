<template>
    <div>
        <h1>{{ titulo }}</h1>

        <label for="">Nombre</label>
        <input type="text" v-model="usuario.name" required>
        {{ errors?.name }}
        <br>
        <label for="">Correo</label>
        <input type="email" v-model="usuario.email" required>
        {{ errors?.email }}
        <br>
        <label for="">Contraseña</label>
        <input type="password" v-model="usuario.password" required>
        {{ errors?.password }}
        <br>
        <button @click="guardarUsuario()">Guardar Usuario</button>

        <table border="1">
            <tr>
                <td>ID</td>
                <td>NOMBRE</td>
                <td>CORREO</td>
                <td>CREADO EN</td>
                <td>ACCION</td>
            </tr>
            <tr v-for="u in usuarios" :key="u.id">
                <td>{{ u.id }}</td>
                <td>{{ u.name }}</td>
                <td>{{ u.email }}</td>
                <td>{{ u.created_at }}</td>
                <td>
                    <button>editar</button>
                    <button>x</button>
                </td>
            </tr>

        </table>
        
    </div>
</template>

<script>
import usuarioService from "@/service/UsuarioService";
import { ref } from "vue"

export default {
    setup(){
        // variables
        const titulo = "Gestión Usuarios";
        const usuarios = ref([])
        const usuario = ref({name: "", email: "", password: ""});
        const errors = ref(null)

        // metodos
        const listarUsuarios = async () => {
            const {data} = await usuarioService.listar();
            usuarios.value = data
        }

        listarUsuarios()

        const guardarUsuario = async () => {
            try{
                const {data} = await usuarioService.guardar(usuario.value);
                console.log(data);
                // listarUsuarios()
                usuarios.value.push(data.data)
            }catch(error){
                console.log(error.response.data)
                errors.value = error.response.data.errors
            }

            // usuarioService.guardar(usuario.value).then(data).catch(e => console.log(e))
        }
        

        return { titulo, usuarios, usuario, guardarUsuario, errors}
    }    
    
}
</script>