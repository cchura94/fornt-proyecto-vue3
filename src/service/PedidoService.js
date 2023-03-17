import { http } from "./HttpAxios"

export default {
    listar(){
        return http().get(`/admin/pedido`);
    },
    guardar(datos){
        console.log(datos)
        return http().post("/admin/pedido", datos);
    },
    mostrar(id){
        return http().get(`/admin/pedido/${id}`);
    },
    modificar(id, datos){
        return http().put(`/admin/pedido/${id}`, datos);
    },
    eliminar(id){
        return http().delete(`/admin/pedido/${id}`);
    },
    buscar(q=''){
        return http().get(`/admin/pedido?q=${q}&limit=5`);
    }
}