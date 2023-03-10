<template>


<Button label="Nuevo producto" icon="pi pi-external-link" @click="abrirDialogProducto" />

<Dialog v-model:visible="dialogNuevoProducto" modal header="Nuevo Producto" :style="{ width: '50vw' }" class="p-fluid">
    {{ product }}
    <div class="filed">
        <label for="nom">Ingrese Nombre</label>
        <InputText type="text" id="nom" v-model="product.nombre" required autofocus  />
    </div>
    <div class="filed">
        <label for="desc">Descripción</label>
        <Textarea id="desc" v-model="product.descripcion"></Textarea>
    </div>
    <div class="filed">
        <label >Categoria</label>
        <div class="formgrid grid">
            <div class="field-radiobutton col-6" v-for="cat in categorias" :key="cat.id">
                <RadioButton :value="cat.id" v-model="product.categoria_id"></RadioButton>
                <label >{{cat.nombre}}</label>

            </div>
        </div>
    </div>
    <div class="formgrid grid">
        <div class="filed col">
            <label for="pr">Precio</label>
            <InputNumber id="pr" v-model="product.precio" mode="currency" currency="USD" locale="en-US"></InputNumber>
        </div>
        <div class="filed col">
            <label for="cant">Cantidad</label>
            <InputNumber id="cant" v-model="product.stock" integeronly></InputNumber>
        </div>
    </div>

    <template #footer>
        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarDialogProducto"></Button>
        <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="guardarProducto"></Button>

    </template>

</Dialog>


  <DataTable :value="products" tableStyle="min-width: 50rem">
    <template #header>
      <div
        class="flex flex-wrap align-items-center justify-content-between gap-2"
      >
        <span class="text-xl text-900 font-bold">Products</span>
        <Button icon="pi pi-refresh" rounded raised />
      </div>
    </template>
    <Column field="id" header="ID"></Column>
    <Column field="nombre" header="Nombre"></Column>
    <Column header="Imagen">
      <template #body="slotProps">
        <img
          :src="`http://127.0.0.1:8000/${slotProps.data.imagen}`"
          :alt="slotProps.data.imagen"
          class="w-6rem shadow-2 border-round"
        />
      </template>
    </Column>
    <Column field="precio" header="Precio">
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.precio) }}
      </template>
    </Column>
    <Column field="categoria_id" header="Categoria"></Column>
    
    <Column header="Estado">

    </Column>
    <template #footer>
      En total hay {{ products ? products.length : 0 }} productos.
    </template>
  </DataTable>
</template>

<script setup>
import { ref } from "vue";
import productoService from "@/service/ProductoService";
import categoriaService from "@/service/CategoriaService";

const products = ref([]);
const dialogNuevoProducto = ref(false)
const product = ref({})
const categorias = ref([]);

const abrirDialogProducto = () => {
    dialogNuevoProducto.value = true
}

const cerrarDialogProducto = () => {
    dialogNuevoProducto.value = false
}

// productoService
const listaProductos = async() => {
    const {data} = await productoService.listar();

    products.value = data.data
}

const listaCategorias = async() => {
    const {data} = await categoriaService.listar();

    categorias.value = data
}

listaProductos()
listaCategorias()

const guardarProducto = async () => {
    await productoService.guardar(product.value);
    listaProductos()
    cerrarDialogProducto()
}

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

</script>
