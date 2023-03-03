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
        <button @click="guardarUsuario()">{{ usuario.id?'Modificar Usuario':'Guardar Usuario' }}</button>
        <button type="button" @click="resetForm()">Reset</button>

<!-- Lista de usuarios -->

<input type="search" v-model="buscar" @keypress.enter="listarUsuarios()">

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
                    <button @click="editarUsuario(u)">editar</button>
                    <button @click="eliminar(u.id)">x</button>
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
        const buscar = ref('')

        // metodos
        const listarUsuarios = async () => {
            const {data} = await usuarioService.listar(buscar.value);
            usuarios.value = data
        }

        listarUsuarios()

        const buscador= () => {
            listarUsuarios()
        }

        const guardarUsuario = async () => {
            try{
                if(usuario.value.id){
                    // modificar
                    const {data} = await usuarioService.modificar(usuario.value.id, usuario.value);
                    listarUsuarios();
                    resetForm()
                }else{
                    const {data} = await usuarioService.guardar(usuario.value);
                    console.log(data);
                    // listarUsuarios()
                    usuarios.value.push(data.data)

                    resetForm()
                }
            }catch(error){
                console.log(error.response.data)
                errors.value = error.response.data.errors
            }

            // usuarioService.guardar(usuario.value).then(data).catch(e => console.log(e))
        }

        const editarUsuario = (u) => {
            const {name, email, id} = u
            usuario.value = {name, email, id}
        }

        const resetForm = () => {
            usuario.value.id = null;
            usuario.value = {name: "", email: "", password: ""};
        }

        const eliminar = async (id) => {
            if(confirm("¿Esta seguro de eliminar al usuario?")){
                
                const {data} = await usuarioService.eliminar(id);
            listarUsuarios();
            }            
        }


        return { titulo, usuarios, usuario, guardarUsuario, errors, editarUsuario, resetForm, eliminar, buscar, listarUsuarios}
    }    
    
}
</script>