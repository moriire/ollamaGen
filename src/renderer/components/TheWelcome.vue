<script>
import { useGenerateStore } from "@/stores/generate";
import { ref } from 'vue';
export default {
  setup() {
    const gen =  useGenerateStore();
    return {
      gen
    }
  }
}
</script>

<template>
<div class="row justify-content-center .align-items-center" id="main">
  <div class="col-lg-10 col-md-10 m-3 text-light .border .border-top border-bottom-0 p-3 fs-3 overflow-y"
      id="gensys" v-show="gen.response" >

      {{ gen.response }}
     
</div>
  </div>
  <div class="row justify-content-center .align-items-center mt-2">
    <div
      class="col-lg-10 col-md-10 col-sm-10 col-xs-12 mx-3 position-sticky .start-50 .bottom-0 sticky-bottom .translate-middle-x">
      <div class="row justify-content-between">
        <div class="col-8">
          <button class="btn btn-outline-warning" v-show="gen.disable" @click="gen.stopGen">
            <i class="bi bi-stop-fill"></i>
          </button>
          <button class="btn btn-outline-warning" @click="gen.tts()" v-show="gen.response">
            <i class="bi bi-mic-fill"></i>
          </button>

          <button data-bs-toggle-tooltip="Copy AI response" class="btn btn-outline-warning" v-show="gen.response"
            @click="gen.copyOutput">
            <i class="bi bi-clipboard"></i></button>
          <button title="Copy response to clipboard" data-bs-toggle="tooltip" data-bs-placement="top"
            class="btn btn-outline-warning" @click="gen.copyOutput" v-show="response">Copy</button>
          <button class="btn btn-outline-warning" @click="gen.clearOutput" v-show="gen.response">Clear</button>
        </div>
        <div class="col-4">
          <h2 class="text-light text-end" v-show="gen.response">
            {{ gen.total_duration.toFixed(2) }} T/s
          </h2>
        </div>
      </div>
      <div class="input-group my-2">
        <!--button class="input-group-text bg-warning text-dark" id="basic" @click="tts()">
          <i class="bi bi-mic-fill"></i>
      </button-->
        <button class="input-group-text bg-warning text-dark" id="basic" v-show="disable">
          <span class="spinner-border spinner-border-sm" aria-hidden="true">
          </span>
        </button>
        <input class="form-control" aria-describedby="basic" placeholder="I am your AI Doctor. How are you feeling?"
          v-model="gen.prompt" @keyup.enter="gen.getChat()">
        <button class="input-group-text bg-warning text-dark" id="basic" @click="getChat()">
          <i class="bi bi-play-fill"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
textarea {
  outline-color: yellow;
}

#gensys {
  min-width: min-content;
  max-width: max-content;
  min-height: min-content;
  overflow-y: scroll;
}

div#main {
  height: 75vh;
  white-space: pre-line;
}
</style>
