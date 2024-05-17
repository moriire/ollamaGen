<script setup>
import SliderControl from "./components/SliderControll.vue";
import { useVoiceSettingsStore } from './stores/counter';
import {
  RouterLink,
  RouterView
} from 'vue-router'

const params = useVoiceSettingsStore();
</script>

<template>
  <div class="offcanvas offcanvas-end bg-dark " tabindex="-1" id="offcanvasResponsive"
    aria-labelledby="offcanvasResponsiveLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title text-warning" id="offcanvasResponsiveLabel">
        ollamaGen
      </h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive"
        arial-label="close">

      </button>
    </div>
    <div class="offcanvas-body">
      <div class="nav flex-column nav-pills nav-warning me-3" id="v-pills-tab" role="tablist"
        aria-orientation="vertical">
        <RouterLink class="nav-link" to="/">Home</RouterLink>
        <hr class="text-white">
        <RouterLink class="nav-link" to="/chat">Chat</RouterLink>
        <hr class="text-white">
        <RouterLink class="nav-link" to="/models">Models</RouterLink>
        <hr class="text-white">
        <div class="row justify-content-center">
          <div class="col-12 my-2">
            <SliderControl v-model="params.modelParams.temperature" label="Temperature" :min="0" :max="1" :step=".1"
              :caliber="params.modelParams.temperature" @change="params.changeModelParams" />
          </div>

          <!--div class="col-lg-12 my-2">
            <SliderControl v-model="params.modelParams.top_p" label="Top_p" :caliber="params.modelParams.top_p" :min="0"
              :max="1.0" :step="0.05" @change="params.changeModelParams" />
          </div-->

          <div class="col-lg-12 my-2">
            <SliderControl v-model="params.modelParams.top_k" label="Top_k" :caliber="params.modelParams.top_k" :min="0"
              :max="100" :step="5" @change="params.changeModelParams" />
          </div>
          <!--div class="col-lg-12 my-2">
            <SliderControl v-model="params.modelParams.n_ctx" label="num_ctx" :caliber="params.modelParams.n_ctx"
              :min="126" :max="8192" :step="126" @change="params.changeModelParams" />
          </div-->

          <div class="col-lg-12 my-2">
            <SliderControl v-model="params.modelParams.seed" label="seed" :caliber="params.modelParams.seed" :min="0"
              :max="100" @change="params.changeModelParams" />
          </div>
          <div class="col-lg-12 my-3 text-center">
            <button class="btn btn-sm btn-outline-warning" @click="reset">reset</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-3 d-none col-lg-block d-none d-lg-block  bg-dark vh-100 px-4 py-4">
        <RouterLink class="navbar-brand text-warning mb-4" to="/">

          <h2>ollamaGen</h2>
        </RouterLink>
        <div class="nav flex-column nav-pills nav-warning me-3" id="v-pills-tab" role="tablist"
          aria-orientation="vertical">
          <RouterLink class="nav-link" to="/">Home</RouterLink>
          <hr class="text-white">
          <RouterLink class="nav-link" to="/chat" type="button">Chat</RouterLink>
          <hr class="text-white">
          <RouterLink class="nav-link" to="/models" data-bs-target="#v-pills-messages">Models</RouterLink>
          <hr class="text-white">
          <div class="row justify-content-center">
            <div class="col-12 my-2">
              <SliderControl v-model="params.modelParams.temperature" label="Temperature" :min="0" :max="1" :step=".1"
                :caliber="params.modelParams.temperature" @change="params.changeModelParams" />
            </div>

            <div class="col-lg-12 my-2">
              <SliderControl v-model="params.modelParams.top_p" label="Top_p" :caliber="params.modelParams.top_p"
                :min="0" :max="1.0" :step="0.05" @change="params.changeModelParams" />
            </div>

            <div class="col-lg-12 my-2">
              <SliderControl v-model="params.modelParams.top_k" label="Top_k" :caliber="params.modelParams.top_k"
                :min="0" :max="100" :step="5" @change="params.changeModelParams" />
            </div>
            <div class="col-lg-12 my-2">
              <SliderControl v-model="params.modelParams.n_ctx" label="num_ctx" :caliber="params.modelParams.n_ctx"
                :min="126" :max="8192" :step="126" @change="params.changeModelParams" />
            </div>

            <div class="col-lg-12 my-2">
              <SliderControl v-model="params.modelParams.seed" label="seed" :caliber="params.modelParams.seed" :min="0"
                :max="100" @change="params.changeModelParams" />
            </div>
            <!--div class="col-lg-12 my-3 text-center">
              <button class="btn btn-sm btn-outline-warning" @click="reset">reset</button>
            </div-->
          </div>
        </div>
      </div>
      <div class="col-lg-9">
        <nav class="m-3 navbar navbar-expand-lg navbar-expand-md navbar-light d-lg-none  ">
          <a class="navbar-brand text-warning mb-4" href="#">
            <h2>ollamaGen</h2>
          </a>
          <button class="navbar-toggler bg-warning" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive">
            <span class="bi bi-list"></span>
          </button>
        </nav>

        <RouterView />
      </div>
      <div class="col-lg-3 d-none d-lg-block bg-warning vh-100 px-4 py-4">
        <RouterLink class="navbar-brand text-dark mb-4" to="/">
        
          <h2>ollamaGen</h2>
        </RouterLink>
        
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
</style>
