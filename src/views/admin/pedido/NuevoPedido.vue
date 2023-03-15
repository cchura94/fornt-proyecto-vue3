<template>

    <div class="grid">
        
        <div class="col-12">
            <div class="card">
                <h5>DATOS DE PEDIDO</h5>
            </div>
        </div>
        <div class="col-7">
            <div class="card">
                <h5>Productos</h5>

                <DataTable :value="products" responsiveLayout="scroll">
                    <Column field="id" header="ID"></Column>
                    <Column field="nombre" header="NOMBRE"></Column>
                    <Column field="precio" header="PRECIO"></Column>
                    <Column field="stock" header="CANT"></Column>
                    <Column field="accion" header="GESTION"></Column>
                </DataTable>

                
            </div>            
        </div>
        <div class="col-5">
            <div class="grid">
                <div class="col-12">
                    <div class="card">
                        <h5>CARRITO</h5>
                    </div>
                </div>
                <div class="col-12">
                    <div class="card">
                        <h5>CLIENTE</h5>
                    </div>
                </div>
                <div class="col-12">
                    <div class="card">
                        <h5>GUARDAR PEDIDO</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { onMounted, ref } from "vue";
import productoService from "@/service/ProductoService";

const products = ref([]);

onMounted(async() => {
    const {data} = await productoService.listar();

    products.value = data.data
})


</script>