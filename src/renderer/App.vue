<script>
import "alertifyjs/build/css/alertify.min.css";
import { ref } from "vue";
import SliderControl from "./components/SliderControll.vue";
import ThemeSwitcher from './components/ThemeSwitcher.vue';
import { useVoiceSettingsStore } from './stores/counter.js';
import { useGenerateStore } from "./stores/generate.js";
import alertify from "alertifyjs";


import {
  RouterLink,
  RouterView
} from 'vue-router'
export default {
  components: { RouterLink, RouterView, SliderControl, ThemeSwitcher},

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
  <div class="offcanvas offcanvas-end bg-dark" tabindex="-1" id="offcanvasResponsive"
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
      <div class="nav flex-column nav-pills nav-warning me-3" role="tablist" aria-orientation="vertical">
        <RouterLink class="nav-link" to="/">Home</RouterLink>
        <hr class="text-white">
        <RouterLink class="nav-link" to="/chat">Chat</RouterLink>
        <hr class="text-white">
        <RouterLink class="nav-link" to="/models">Models</RouterLink>
        <hr class="text-white">

        <div class="row justify-content-center">
          <div class="col-12 my-2">
            <SliderControl v-model="params.modelParams.temperature" label="Temperature" :min="0" :max="1" :step=".1"
              @change="params.changeModelParams" />
          </div>

          <!--div class="col-lg-12 my-2">
            <SliderControl v-model="params.modelParams.top_p" label="Top_p" :caliber="params.modelParams.top_p" :min="0"
              :max="1.0" :step="0.05" @change="params.changeModelParams" />
          </div-->

          <div class="col-lg-12 my-2">
            <SliderControl v-model="params.modelParams.top_k" label="Top_k" :min="0" :max="100" :step="5"
              @change="params.changeModelParams" />
          </div>

          <div class="col-lg-12 my-2">
            <SliderControl v-model="params.modelParams.seed" label="seed" :min="0" :max="100"
              @change="params.changeModelParams" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-3 d-none col-lg-block d-none d-lg-block  bg-dark vh-100 px-4 py-4 sidebar"
        style="overflow-y: scroll; height:min-content">
        <div class="navbar-brand text-warning mt-3 text-decoration-none" to="/">

          <h2>ollamaGen <span class="float-end"><ThemeSwitcher/></span></h2>
        </div>
        <div class="nav flex-column nav-pills nav-warning me-3 mt-4" role="tablist" aria-orientation="vertical">
          <RouterLink class="nav-link" to="/">Home</RouterLink>
          <hr class="text-white">
          <RouterLink class="nav-link" to="/chat" type="button">Chat</RouterLink>
          <hr class="text-white">
          <RouterLink class="nav-link" to="/models" >Models</RouterLink>
          <hr class="text-white">
          <div class="col-lg-12 my-2">
            <!--div class="d-flex justify-content-between">
              <input type="radio" class="btn-check" v-model="gen.resMode" value="batch" id="option1" autocomplete="off">
              <label class="btn btn-outline-warning" for="option1">Batch</label>

              <input type="radio" class="btn-check" v-model="gen.resMode" value="stream" id="option2"
                autocomplete="off">
              <label class="btn btn-outline-warning" for="option2">Stream</label>
            </div>
            <hr class="text-white"-->
            <div class="nav flex-column nav-pills nav-warning">

              <a class="nav-link d-flex justify-content-between bg-warning" type="button" href="#" data-bs-toggle="collapse" data-bs-target="#modelParameter"
                  aria-expanded="false" aria-controls="collapseExample">
                {{ params.selectedModel }}
                <span class="me-0" ><i class="bi bi-caret-down"></i></span>
              </a>

              <div class="collapse show" id="modelParameter">
                <div class="row justify-content-center ms-3">
                  <div class="col-12 my-2">
                    <SliderControl v-model="params.modelParams.temperature" label="Temperature" :min="0" :max="1"
                      :step=".1" @change="params.changeModelParams" :caliber="params.modelParams.temperature" />
                  </div>

                  <div class="col-lg-12 my-2">
                    <SliderControl v-model="params.modelParams.top_p" label="Top_p" :min="0" :max="1.0" :step="0.05"
                      @change="params.changeModelParams" :caliber="params.modelParams.top_p" />
                  </div>

                  <div class="col-lg-12 my-2">
                    <SliderControl v-model="params.modelParams.top_k" label="Top_k" :min="0" :max="100" :step="5"
                      @change="params.changeModelParams" :caliber="params.modelParams.top_k" />
                  </div>
                  <div class="col-lg-12 my-2">
                    <SliderControl v-model="params.modelParams.n_ctx" label="num_ctx" :min="126" :max="8192" :step="126"
                      @change="params.changeModelParams" :caliber="params.modelParams.n_ctx" />
                  </div>

                  <!--div class="col-lg-12 my-2">
              <SliderControl v-model="params.modelParams.seed" label="seed" :min="0" :max="100"
                @change="params.changeModelParams" />
            </div-->
                  <!--div class="col-lg-12 my-3 text-center">
              <button class="btn btn-sm btn-outline-warning" @click="reset">reset</button>
            </div-->
                </div>
              </div>
            </div>
          </div>
          <hr class="text-white">

        </div>
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
</style>
