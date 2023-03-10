import { http } from "./HttpAxios"

export default {
    listar(){
        return http().get("/admin/producto");
    },
    guardar(datos){
        return http().post("/admin/producto", datos);
    },
    mostrar(id){
        return http().get(`/admin/producto/${id}`);
    },
    modificar(id, datos){
        return http().put(`/admin/producto/${id}`, datos);
    },
    eliminar(id){
        return http().delete(`/admin/producto/${id}`);
    }
}