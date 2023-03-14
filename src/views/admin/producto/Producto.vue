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

  <DataTable ref="dt" :value="products" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem"
              lazy :totalRecords="totalRecords" :loading="loading" @page="onPage($event)">
    <template #header>
      <div
        class="flex flex-wrap align-items-center justify-content-between gap-2"
      >
        <span class="text-xl text-900 font-bold">Productos</span>
        <Button icon="pi pi-refresh" rounded raised />
      </div>
    </template>
    <Column field="id" header="ID"></Column>
    <Column field="nombre" header="Nombre"></Column>
    <Column header="Imagen">
      <template #body="slotProps">
        <img
          :src="slotProps.data.imagen?`http://127.0.0.1:8000/${slotProps.data.imagen}`:`https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg`"
          :alt="slotProps.data.imagen"
          class="w-6rem shadow-2 border-round"
        />
        <Button icon="pi pi-camera" @click="seleccionarImagen(slotProps.data.id)" />

      </template>
    </Column>
    <Column field="precio" header="Precio">
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.precio) }}
      </template>
    </Column>
    <Column field="categoria.nombre" header="Categoria"></Column>
    
    <Column field="estado" header="Estado">
      <template #body="slotProps">
        {{ slotProps.data.estado?'activo':'inactivo' }}
      </template>

    </Column>
    <template #footer>
      En total hay {{ products ? products.length : 0 }} productos.
    </template>
  </DataTable>


<Dialog v-model:visible="visible_img" modal header="Subir Imagen" :style="{ width: '50vw' }">
    <FileUpload name="demo[]" customUpload @uploader="subirImagen" @upload="onAdvancedUpload($event)" :multiple="false" accept="image/*" :maxFileSize="1000000">
      <template #empty>
          <p>Arrastre su imagen aqui.</p>
      </template>
  </FileUpload>
</Dialog>

</template>

<script setup>
import { ref } from "vue";
import productoService from "@/service/ProductoService";
import categoriaService from "@/service/CategoriaService";

const products = ref([]);
const dialogNuevoProducto = ref(false)
const product = ref({})
const categorias = ref([]);
const visible_img = ref(false)
const id_producto = ref(-1)
const totalRecords = ref(0)
const loading = ref(false)
const lazyParams = ref({});

const abrirDialogProducto = () => {
    dialogNuevoProducto.value = true
}

const cerrarDialogProducto = () => {
    dialogNuevoProducto.value = false
}

const seleccionarImagen = (id) => {
  visible_img.value = true
  id_producto.value = id
}

const onPage = (event) => {
    lazyParams.value = event;
    loadLazyData();
};

const loadLazyData = async () => {
    loading.value = true;
    
    const {data} = await productoService.listar({ lazyEvent: JSON.stringify(lazyParams.value) })
    products.value = data.data;
    totalRecords.value = data.total;
    loading.value = false;

};

// productoService
const listaProductos = async() => {
    const {data} = await productoService.listar({ lazyEvent: JSON.stringify(lazyParams.value) });

    console.log(data.data)

    products.value = data.data
}

const listaCategorias = async() => {
    const {data} = await categoriaService.listar();

    categorias.value = data
}

const subirImagen = async(event) => {
  console.log("Subiendo...", event.files)

  let fd = new FormData();
  fd.append('imagen', event.files[0])

  await productoService.guardarImagen(fd, id_producto.value);

visible_img.value = false
  listaProductos()
}

listaProductos()
listaCategorias()

const guardarProducto = async () => {
  console.log(product.value)

    await productoService.guardar(product.value);

    product.value = {} 
    listaProductos()
    cerrarDialogProducto()
}

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

</script>
