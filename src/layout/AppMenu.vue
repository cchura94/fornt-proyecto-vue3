<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'ADMINISTRADOR',
        items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
            { label: 'Perfil', icon: 'pi pi-fw pi-user', to: '/admin/about' }
        ]
        
    },
    {
        label: 'Gestión Productos',
        items: [
            { label: 'Categorias', icon: 'pi pi-fw pi-id-card', to: '/admin/categoria' },
            { label: 'Productos', icon: 'pi pi-fw pi-table', to: '/admin/producto' }
        ]
    },
    {
        label: 'Pedidos',
        items: [
            { label: 'Nuevo Pedido', icon: 'pi pi-fw pi-eye', to: '/admin/pedido/nuevo', badge: 'NUEVO' },
            { label: 'Lista Pedidos', icon: 'pi pi-fw pi-globe', url: 'https://www.primefaces.org/primeblocks-vue', target: '_blank' },
            { label: 'Clientes', icon: 'pi pi-fw pi-globe', url: 'https://www.primefaces.org/primeblocks-vue', target: '_blank' }
        ]
    },
    

]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
        <!--
        <li>
            <a href="https://www.primefaces.org/primeblocks-vue/#/" target="_blank">
                <img src="/layout/images/banner-primeblocks.png" alt="Prime Blocks" class="w-full mt-3" />
            </a>
        </li>
        -->
    </ul>
</template>

<style lang="scss" scoped></style>
