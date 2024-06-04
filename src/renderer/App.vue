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
  <div class="offcanvas offcanvas-end bg-light" tabindex="-1" id="offcanvasResponsive"
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
      <div class="col-lg-3 d-none col-lg-block d-none d-lg-block  bg-dark vh-100 px-4 py-4 sidebar"
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
body,
div.cont {
  background-color: black;
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
  width: 5px;
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

.form-switch .form-check-input:checked {
  background-position: right center;
  background-color: var(--bs-dark);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
}
</style>
