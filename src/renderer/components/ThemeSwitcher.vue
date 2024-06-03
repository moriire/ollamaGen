<template>
      <div @click="toggleTheme" class="text-warning d-inline">
        <i class="bi bi-sun-fill fs-2"  v-if="theme=='light'"></i>
        <i class="bi bi-moon-stars-fill fs-2" v-else></i> 
      </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        theme: localStorage.getItem('theme') || 'light',
      };
    },
    methods: {
      toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.updateTheme();
      },
      updateTheme() {
        const themeLink = document.getElementById('theme-link');
        themeLink.setAttribute('href', this.theme === 'light' ? '/src/renderer/assets/css/light-theme.css' : '/src/renderer/assets/css/dark-theme.css');
      },
    },
    mounted() {
      this.updateTheme();
    },
  };
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>  