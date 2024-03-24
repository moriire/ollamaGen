<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import moment from 'moment';
import { useVoiceSettingsStore } from '@/stores/counter';
export default {
  setup(){
    const params = useVoiceSettingsStore();
    const disable = ref(false);
    const chosen_model = ref("");
    const progress = ref("");
    const models = ref([]);
    const formatdate = (x) => {
      return moment(x, moment.ISO_8601).fromNow()
    }
    const getModels = async () =>{
      disable.value = true;
      try{
        const res = await axios.get('http://127.0.0.1:11434/api/tags');
        models.value = res.data.models
        console.log(res.data)
      } catch(errors){
        console.log(errors)
      }
      finally{
        disable.value = false
      }
    }
    const pullModel = async () =>{
      disable.value = true;
      
      try{
        const res = await axios.post('http://127.0.0.1:11434/api/pull',
        {
           name: chosen_model.value,
            insecure: true,
            stream: !true,
        })
        progress.value = res.data.status
        if(progress.value == "success"){
          return getModels()
        }
      } catch(errors){
        console.log(errors)
      }
      finally{
        disable.value = false
      }
    }
onMounted(()=>{
  getModels()
})
const copyOutput = () => {
  let res = document.getElementById("cop")
  res.select();
  navigator.clipboard.writeText(res.value);

  // Alert the copied text
  alert("Copied to clipboard");
}
const copyQ = () => {
  let res = document.getElementById("prompt-msg")
  res.select();
  navigator.clipboard.writeText(res.value);

  // Alert the copied text
  alert("Copied to clipboard");
}
    return {
      formatdate, getModels, models, disable, copyOutput, copyQ, pullModel, chosen_model, progress,
      params
      }
  }    
}
</script>
<template>
   <div class="row justify-content-center .align-items-center">
  <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12 mx-3 my-2">
    <h2 class="text-warning">
      Pull Model {{  params.selectedModel }}
    </h2>
    <div class="form-group mb-3 input-group-text">
      <span class="spinner-border spinner-border-sm" aria-hidden="true" v-show="disable">
        </span>
      <input type="text" class="form-control" v-model="chosen_model">
     
        <button class="btn btn-warning" @click="pullModel">
        Pull
      </button>
    </div>
    <div class="form-group d-flex justify-content-between mb-3">
      <h3 class="text-success">
        {{ progress }}
      </h3>
    </div>
  </div>
<div class="col-lg-10 col-md-10 col-sm-10 col-xs-12 mx-3 my-2">
  <h2 class="text-warning">
    Installed
  </h2>
  <div class="list-group">
  <a href="#" class="list-group-item list-group-item-action .active mb-3" aria-current="true"
  v-for="model in models" :key="model.digest"
  >
    <div class="d-flex w-100 justify-content-between">
      <input class="form-check-inputq" type="radio" v-model="params.selectedModel" name="choose" :value="model.name" @change ="params.selectModel">
      <h5 class="mb-1" >{{ model.name }}</h5>
      <small>{{ formatdate(model.modified_at) }}</small>
    </div>
    <div class="d-flex w-100 justify-content-between p-2">
      <p class="mb-1">{{ model.details.parameter_size }}</p>
    <!--small>{{ model }}</small-->
      <span class=".badge .bg-warning text-warning rounded-pill">{{ (model.size/(1024*1024*1024)).toFixed(2) }} GB</span>
    </div>
    
  </a>
</div>
</div>
</div>
</template>
<style scoped>
textarea{
  outline-color: yellow;
}
</style>