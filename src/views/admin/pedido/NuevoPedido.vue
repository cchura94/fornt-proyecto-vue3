<template>
  <div class="grid">
    <div class="col-12">
      <Card>
        <template #title> DATOS DE PEDIDO </template>
        <template #content>
          <p></p>
        </template>
      </Card>
    </div>
    <div class="col-7">
      <Card>
        <template #title> PRODUCTOS </template>
        <template #content>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="buscar"
              placeholder="Buscar"
              @keypress.enter="buscarProductos"
            />
          </span>
          <DataTable :value="products" responsiveLayout="scroll">
            <Column field="id" header="ID"></Column>
            <Column field="nombre" header="NOMBRE"></Column>
            <Column field="precio" header="PRECIO"></Column>
            <Column field="stock" header="CANT"></Column>
            <Column field="accion" header="GESTION">
              <template #body="slotProps">
                <Button
                  icon="pi pi-plus"
                  class="p-button-rounded p-button-success"
                  aria-label="Eliminar"
                  @click="addCarrito(slotProps.data)"
                /> </template
            ></Column>
          </DataTable>
        </template>
      </Card>
    </div>
    <div class="col-5">
      <div class="grid">
        <div class="col-12">
          <div class="card">
            <h5>CARRITO</h5>
            <DataTable :value="carrito" responsiveLayout="scroll">
                <Column field="nombre" header="NOM"></Column>
                <Column field="precio" header="PRECIO"></Column>
                <Column field="cantidad" header="CANT"></Column>
                <Column field="accion" header="ACCION"></Column>
            </DataTable>
          </div>
        </div>
        <div class="col-12">
          <div class="card">
            <h5>CLIENTE</h5>
            <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="buscar_clie"
              placeholder="Buscar por CI/NIT"
              @keypress.enter="buscarClientes"
            />
          </span>
          <Button label="Nuevo" icon="pi pi-external-link" @click="visible = true" />
          {{ cliente?.id?'':'CLiente No encotrado' }}

            <h4>CLIENTE: {{ cliente.nombre_completo }}</h4>
            <h4>CI/NIT: {{ cliente.ci_nit }}</h4>

          </div>
        </div>
        <div class="col-12">
          <div class="card">
            <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="guardarPedido"></Button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Dialog v-model:visible="visible" modal header="Nuevo Cliente" :style="{ width: '50vw' }" class="p-fluid">
    <!--{{ product }} -->
    <div class="filed">
        <label for="nom">Ingrese Nombre Completo</label>
        <InputText type="text" id="nom" v-model="cliente.nombre_completo" required autofocus  />
    </div>
    <div class="filed">
        <label for="ci">Ingrese CI/NIT</label>
        <InputText type="text" id="ci" v-model="cliente.ci_nit" required  />
    </div>
    <div class="filed">
        <label for="tel">TELEFONO</label>
        <InputText type="text" id="tel" v-model="cliente.telefono"  />
    </div>
    <div class="filed">
        <label for="dir">DIRECCION</label>
        <InputText type="text" id="dir" v-model="cliente.direccion"  />
    </div>

    <template #footer>
        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="visible=false"></Button>
        <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="guardarCliente"></Button>

    </template>

</Dialog>
</template>

<script setup>
import { onMounted, ref } from "vue";
import productoService from "@/service/ProductoService";
import clienteService from "@/service/ClienteService";
import pedidoService from "@/service/PedidoService";

const products = ref([]);
const buscar = ref("");
const carrito = ref([]);
const buscar_clie = ref("");
const cliente = ref({});
const visible = ref(false)


onMounted(async () => {
  const { data } = await productoService.listar();

  products.value = data.data;
});

const buscarProductos = async () => {
  const { data } = await productoService.filtrar(buscar.value);

  console.log(data.data);
  products.value = data.data;
};

const addCarrito = (prod) => {
    const {id, nombre, precio} = prod

    let p = {
        id:id, nombre:nombre, precio: precio, cantidad: 1
    }
    carrito.value.push(p)

}

const buscarClientes = async() => {
    const { data } = await clienteService.buscar(buscar_clie.value);
    cliente.value = data
}

const guardarCliente = async () => {
    const { data } = await clienteService.guardar(cliente.value);
    cliente.value = data

    visible.value = false
}

const guardarPedido = async () => {
  const datos_ped = {
    cliente_id: cliente.value,
    productos: carrito.value
  } 

  const {data} =await pedidoService.guardar(datos_ped)
}
</script>