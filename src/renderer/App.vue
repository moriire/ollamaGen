<script>
import "alertifyjs/build/css/alertify.min.css";
import { ref } from "vue";
import SliderControl from "./components/SliderControll.vue";
import SideBar from "./components/SideBar.vue";
import ThemeSwitcher from './components/ThemeSwitcher.vue';
import { useVoiceSettingsStore } from './stores/counter.js';
import { useGenerateStore } from "./stores/generate.js";
import alertify from "alertifyjs";

import {
  RouterLink,
  RouterView
} from 'vue-router'
export default {
  components: { RouterLink, RouterView, SliderControl, ThemeSwitcher, SideBar},

  setup() {
    const gen = useGenerateStore();
    const showMessage = async () => {
      await alertify.alert('ollamaGen', `Response mode changed to ${resMode.value}`)
    }
    const params = useVoiceSettingsStore();
    return {
      params,
      SliderControl,
      RouterLink,
      RouterView,
      showMessage,
      gen
    }
  }
}

</script>

<template>
  <div class="offcanvas offcanvas-end offcolor" tabindex="-1" id="offcanvasResponsive"
    aria-labelledby="offcanvasResponsiveLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title text-warning" id="offcanvasResponsiveLabel">
        ollamaGen <ThemeSwitcher />
      </h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive"
        arial-label="close">
      </button>
    </div>
    <div class="offcanvas-body">
      <SideBar />
    </div>
  </div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-3 d-none col-lg-block d-none d-lg-block  .bg-dark vh-100 px-4 py-2 sidebar"
        style="overflow-y: scroll; height:min-content">
        <div class="navbar-brand text-warning mt-3" to="/">

          <h2>ollamaGen <span class="float-end"><ThemeSwitcher/></span></h2>
        </div>
       <SideBar />
      </div>
      <div class="col-lg-9 main">
        <nav class="m-3 navbar navbar-expand-lg navbar-expand-md navbar-light d-lg-none  ">
          <a class="navbar-brand text-warning mb-4 my-4" href="#">
            <h2>ollamaGen</h2>
          </a>
          <button class="navbar-toggler bg-warning" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive">
            <span class="bi bi-list"></span>
          </button>
        </nav>

        <RouterView />
      </div>
     
    </div>

  </div>
</template>

<style>


div.cont {
  /*background-color: black;*/
  height: 100vh;
}

.nav-link {
  color: var(--bs-light);
}

.nav-link:hover {
  color: var(--bs-dark);
  background-color: var(--bs-warning);
}

.nav-pills a.nav-link.active {
  color: var(--bs-dark);
  background-color: var(--bs-warning);
}

/* width */
::-webkit-scrollbar {
  width: 3px;
}

/* Track */
::-webkit-scrollbar-track {
  background: black;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--bs-warning)
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

[data-bs-theme="light"] body, [data-bs-theme="light"] div.sidebar, [data-bs-theme="light"] div.main{
    background-color: white !important;
    color: black !important;
}
[data-bs-theme="light"] div.offcolor{
  background-color: var(--bs-light);
}
[data-bs-theme="light"] div#main div.text-light, [data-bs-theme="light"]  a.nav-link {
    color: var(--bs-dark) !important;
}
[data-bs-theme="light"] hr{
    border-color: var(--bs-dark);
}
[data-bs-theme="light"] div.slider label{
    color: var(--bs-dark);
}

[data-bs-theme="light"] input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
  }
                          /***** Track Styles *****/
  /***** Chrome, Safari, Opera, and Edge Chromium *****/
 [data-bs-theme="light"] input[type="range"]::-webkit-slider-runnable-track {
    background: var(--bs-dark);
    height: 0.5rem;
  }
  
  /******** Firefox ********/
[data-bs-theme="light"] input[type="range"]::-moz-range-track {
    background: var(--bs-light);
    height: 0.5rem;
  }
  /***** Thumb Styles *****/
  /***** Chrome, Safari, Opera, and Edge Chromium *****/
 [data-bs-theme="light"] input[type="range"]::-webkit-slider-thumb {
     -webkit-appearance: none; /* Override default look */
     appearance: none;
     margin-top: -12px; /* Centers thumb on the track */
     background-color: var(--bs-yellow);
     height: 2rem;
     width: 1rem;    
  }
  /***** Thumb Styles *****/
  /***** Firefox *****/
[data-bs-theme="light"]  input[type="range"]::-moz-range-thumb {
      border: none; /*Removes extra border that FF applies*/
      border-radius: 0; /*Removes default border-radius that FF applies*/
      background-color: var(--bs-yellow);
      height: 2rem;
      width: 1rem;
  }
  /***** Focus Styles *****/
  /* Removes default focus */
[data-bs-theme="light"]  input[type="range"]:focus {
    outline: none;
  }
  
  /***** Chrome, Safari, Opera, and Edge Chromium *****/
 [data-bs-theme="light"] input[type="range"]:focus::-webkit-slider-thumb {
    border: 1px solid var(--bs-yellow);
    outline: 3px solid var(--bs-yellow);
    outline-offset: 0.125rem;
  }
  
  /******** Firefox ********/
[data-bs-theme="light"] input[type="range"]:focus::-moz-range-thumb {
    border: 1px solid var(--bs-yellow);
    outline: 3px solid var(--bs-yellow);
    outline-offset: 0.125rem;     
  }




/* Dark Theme */

html[data-bs-theme="dark"] body {
    background-color: black !important;
    color: white;
}
[data-bs-theme="dark"] div.offcolor{
  background-color: var(--bs-dark);
}
[data-bs-theme="dark"] div#user, div#system{
    color: var(--bs-dark) !important;
}

[data-bs-theme="dark"] input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
  }
                          /***** Track Styles *****/
  /***** Chrome, Safari, Opera, and Edge Chromium *****/
  [data-bs-theme="dark"] input[type="range"]::-webkit-slider-runnable-track {
    background: var(--bs-light);
    height: 0.5rem;
  }
  
  /******** Firefox ********/
[data-bs-theme="dark"] input[type="range"]::-moz-range-track {
    background: var(--bs-light);
    height: 0.5rem;
  }
  /***** Thumb Styles *****/
  /***** Chrome, Safari, Opera, and Edge Chromium *****/
 [data-bs-theme="dark"] input[type="range"]::-webkit-slider-thumb {
     -webkit-appearance: none; /* Override default look */
     appearance: none;
     margin-top: -12px; /* Centers thumb on the track */
     background-color: var(--bs-yellow);
     height: 2rem;
     width: 1rem;    
  }
  /***** Thumb Styles *****/
  /***** Firefox *****/
[data-bs-theme="dark"]  input[type="range"]::-moz-range-thumb {
      border: none; /*Removes extra border that FF applies*/
      border-radius: 0; /*Removes default border-radius that FF applies*/
      background-color: var(--bs-yellow);
      height: 2rem;
      width: 1rem;
  }
  /***** Focus Styles *****/
  /* Removes default focus */
[data-bs-theme="dark"] input[type="range"]:focus {
    outline: none;
  }
  
  /***** Chrome, Safari, Opera, and Edge Chromium *****/
[data-bs-theme="dark"] input[type="range"]:focus::-webkit-slider-thumb {
    border: 1px solid var(--bs-yellow);
    outline: 3px solid var(--bs-yellow);
    outline-offset: 0.125rem;
  }
  
  /******** Firefox ********/
[data-bs-theme="dark"] input[type="range"]:focus::-moz-range-thumb {
    border: 1px solid var(--bs-yellow);
    outline: 3px solid var(--bs-yellow);
    outline-offset: 0.125rem;     
  }

</style>
