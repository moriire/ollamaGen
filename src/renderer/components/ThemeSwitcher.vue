<template>
      <div @click="toggleTheme" class="text-warning d-inline">
        <i class="bi bi-moon-stars-fill fs-2"  v-if="theme=='light'"></i>
        <i class="bi bi-sun-fill fs-2" v-else></i> 
      </div>
  </template>
  
  <script setup>
import { onMounted, ref } from 'vue';
let theme = ref(localStorage.getItem('theme') || 'light');
const  toggleTheme = () => {
theme = theme.value === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', theme.value);
        updateTheme();
      };
   const updateTheme = () => {
    document.documentElement.setAttribute('data-theme', theme.value)
    window.localStorage.setItem('theme', theme.value)
  };
 
onMounted(()=>{
  updateTheme()
})
    
  </script>