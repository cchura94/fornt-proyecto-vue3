<template>
  <div class="card">
    <h1>Categorias</h1>

    <Button
      label="Nueva Categoria"
      icon="pi pi-external-link"
      @click="visible = true"
    />

    <Dialog
      v-model:visible="visible"
      modal
      header="Nueva categoria"
      :style="{ width: '50vw' }"
    >
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText v-model="categoria.nombre" placeholder="Nombre cat" />
      </span>

      <template #footer>
        <Button label="Cerrar" icon="pi pi-times" class="p-button-text" />
        <Button
          label="Guardar"
          @click="guardarCategoria()"
          icon="pi pi-check"
          autofocus
        />
      </template>
    </Dialog>

    <DataTable :value="categorias" responsiveLayout="scroll">
      <Column field="id" header="Code"></Column>
      <Column field="nombre" header="Name"></Column>
      <Column field="accion" header="Reviews">
        <template #body="slotProps">
          <Button @click="editarCategoria(slotProps.data)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import categoriaService from "@/service/CategoriaService";

const categorias = ref([]);
const visible = ref(false);
const categoria = ref({ nombre: "" });

onMounted(() => {
  getCategorias();
});

const getCategorias = async () => {
  const { data } = await categoriaService.listar();
  categorias.value = data;
};

const guardarCategoria = async () => {
  try {
    if (categoria.value.id) {
      const { data } = await categoriaService.modificar(
        categoria.value.id,
        categoria.value
      );
      categoria.value = { nombre: "" };
      getCategorias();
      visible.value = false;
    } else {
      const { data } = await categoriaService.guardar(categoria.value);
      categoria.value = { nombre: "" };
      getCategorias();
      visible.value = false;
    }
  } catch (error) {
    console.log(error);
  }
};

const editarCategoria = async (obj) => {
  categoria.value = obj;

  visible.value = true;
};

const modificarCategoria = async () => {
  try {
    const { data } = await categoriaService.modificar(categoria.value);

    getCategorias();
    visible.value = false;
  } catch (error) {
    console.log(error);
  }
};
</script>