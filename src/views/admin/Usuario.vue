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

<Button label="Nuevo" icon="pi pi-external-link" @click="openModalNuevoUsuario" />

        <Dialog header="Nuevo Usuario" v-model:visible="displayModal" :breakpoints="{'720px': '75vw', '540px': '90vw'}" :style="{width: '50vw'}" :modal="true" class="p-fluid">
            
            <InputText id="nom" type="text" v-model="usuario.name" />

            <InputText id="em" type="email" v-model="usuario.email" />

            <InputText id="pas" type="password" v-model="usuario.password" />

            <template #footer>
                <Button label="No" icon="pi pi-times" @click="closeModal" class="p-button-text"/>
                <Button label="Yes" icon="pi pi-check" @click="guardarUsuario" autofocus />
            </template>
        </Dialog>

<DataTable :value="usuarios" responsiveLayout="scroll">
            <Column field="id" header="ID"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="created_at" header="Creado en"></Column>
        </DataTable>

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

        const displayModal = ref(false);

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

        const openModalNuevoUsuario = () => {
            displayModal.value = true;
        }


        return { titulo, usuarios, usuario, guardarUsuario, errors, editarUsuario, resetForm, eliminar, buscar, listarUsuarios, openModalNuevoUsuario, displayModal}
    }    
    
}
</script>