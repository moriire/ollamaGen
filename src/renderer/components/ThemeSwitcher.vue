<template>
      <div @click="toggleTheme" class="text-warning d-inline">
        <i class="bi bi-moon-stars-fill fs-2"  v-if="theme=='light'"></i>
        <i class="bi bi-sun-fill fs-2" v-else></i> 
      </div>
  </template>
  
  <script setup>
import { onMounted, ref } from 'vue';
var theme = ref(window.localStorage.getItem('theme') || 'light');
const  toggleTheme = () => {
        theme.value = theme.value === 'light' ? 'dark' : 'light';
        window.localStorage.setItem('theme', theme.value);
        document.documentElement.setAttribute('data-bs-theme', theme.value)
        updateTheme();
        console.log(window.localStorage.getItem('theme'))
      };
   const updateTheme = () => {
    theme.value = window.localStorage.getItem('theme')
  };
 onMounted(()=>{
  document.documentElement.setAttribute('data-bs-theme', theme.value)
 })
  </script>