<template>
  <div class="card">
    <h1>Lista de Pedidos</h1>
    <DataTable :value="pedidos" tableStyle="min-width: 50rem">
      <Column field="fecha" header="FECHA"></Column>
      <Column field="cliente.nombre_completo" header="CLIENTE"></Column>
      <Column field="productos" header="PRODUCTOS">
        <template #body="slotProps">
          <Button
            label="Mostrar Productos"
            icon="pi pi-external-link"
            @click="verProductos(slotProps.data.productos)"
          />
          
        </template>
      </Column>
      <Column field="estado" header="ESTADO"></Column>
    </DataTable>

    <Dialog
            v-model:visible="visible"
            modal
            header="Productos"
            :style="{ width: '50vw' }"
          >
            <DataTable
              :value="productosDT"
              tableStyle="min-width: 50rem"
            >
              <Column field="id" header="ID"></Column>
              <Column field="nombre" header="NOMBRE"></Column>
              <Column field="precio" header="PRECIO"></Column>
              <Column field="pivot.cantidad" header="CANTIDAD"></Column>
            </DataTable>
          </Dialog>
  </div>
</template>
<script setup>
import pedidoService from "@/service/PedidoService";
import { ref } from "vue";

let pedidos = ref([]);
let visible = ref(false);

let productosDT = ref([]);

async function getPedidos() {
  const { data } = await pedidoService.listar();

  pedidos.value = data.data;
}

async function verProductos(productos){
    visible.value = true
productosDT.value = productos
}

getPedidos();
</script>