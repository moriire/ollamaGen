<script>
import "alertifyjs/build/css/alertify.min.css";
import { ref } from "vue";
import SliderControl from "./SliderControll.vue";
import { useVoiceSettingsStore } from '../stores/counter.js';
import { useGenerateStore } from "../stores/generate.js";

import {
  RouterLink,
} from 'vue-router'
export default {
  components: { RouterLink, SliderControl},

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
      showMessage,
      gen
    }
  }

}

</script>
<template>
<div class="nav flex-column nav-pills nav-warning me-3 mt-4" role="tablist" aria-orientation="vertical">
          <RouterLink class="nav-link" to="/">Home</RouterLink>
          <hr class="text-white">
          <RouterLink class="nav-link" to="/chat" type="button">Chat</RouterLink>
          <hr class="text-white">
          <RouterLink class="nav-link" to="/models" >Models</RouterLink>
          <hr class="text-white">
         
          <div class="col-lg-12 my-2">
            <div class="d-flex justify-content-between">
              <input type="radio" class="btn-check" v-model="gen.resMode" value="batch" id="option1" autocomplete="off">
              <label class="btn btn-outline-warning" for="option1">Batch</label>

              <input type="radio" class="btn-check" v-model="gen.resMode" value="stream" id="option2"
                autocomplete="off">
              <label class="btn btn-outline-warning" for="option2">Stream</label>
            </div>
            
            <hr class="text-white">
            <div class="nav flex-column nav-pills nav-warning">
        
              <a class="nav-link d-flex justify-content-between bg-warning text-dark" type="button" href="#" data-bs-toggle="collapse" data-bs-target="#modelParameter"
                  aria-expanded="false" aria-controls="collapseExample"  aria-current="true">
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
                    <SliderControl  label="Top_p" :min="0" :max="1.0" :step="0.05"
                      @change="params.changeModelParams" :caliber="params.top_p" />
                  </div>

                  <div class="col-lg-12 my-2">
                    <SliderControl v-model="params.modelParams.top_k" label="Top_k" :min="0" :max="100" :step="5"
                      @change="params.changeModelParams" :caliber="params.modelParams.top_k" />
                  </div>
                  <div class="col-lg-12 my-2">
                    <SliderControl v-model="params.modelParams.n_ctx" label="num_ctx" :min="126" :max="8192" :step="126"
                      @change="params.changeModelParams" :caliber="params.modelParams.n_ctx" />
                  </div>

        
                </div>
              </div>
            </div>
          </div>
          <hr class="text-white">

        </div>
</template>