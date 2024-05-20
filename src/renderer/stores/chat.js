import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import moment from 'moment'
import { useVoiceSettingsStore } from './counter.js'
import { useRouter } from 'vue-router'

export const useChatStore = defineStore('chat', () => {
  let controller
  const router = useRouter()
  const glob = useVoiceSettingsStore()
  const disable = ref(false)
  const total_duration = ref(0)
  const prompt = ref("")
  const msg = ref("")
  const response = ref('')
  const conversations = ref([
    {
      role: 'system',
      content: 'I am your AI chat assistant. I can help as much as I can.'
    }
  ])
  const formatTime = (x) => {
    return moment(x).seconds()
  }
  const getChat = async () => {
    disable.value = true
    msg.value = prompt.value
    conversations.value.push({ role: 'user', content: msg.value })
    prompt.value =""
    controller = new AbortController()
    const signal = controller.signal

    //const message = { role: 'user', content: msg.value };
    try {
      const res = await axios.post(
        `http://localhost:11434/api/chat`,
        {
          model: glob.selectedModel,
          messages: conversations.value,
          stream: false,
          options: {
            temperature: glob.modelParams.temperature,
            top_k: glob.modelParams.top_k,
            n_ctx: glob.modelParams.n_ctx,
            seed: glob.modelParams.seed
          }
        },
        { signal }
      )
      console.log(res.data)
      //total_duration.value = res.data.context.length / formatTime(res.data.eval_duration);
      //response.value = res.data.message.content
      response.value = res.data.message.content
      conversations.value.push({ role: 'system', content: response.value })

      //conversations.value.findLast(x => x).resp = response.value
      //console.log(conversations.value.findLast(x => x))// = response.value
    } catch (errors) {
      console.log(errors)
      if (errors.response.status === 401) {
        router.push('/auth/logim')
      }
    } finally {
      disable.value = false
    }
  }

  const stopGen = () => {
    if (controller) {
      controller.abort()
      alert('Chat Aborted!!!')
    }
  }
  const clearOutput = async () => {
    response.value = ''
    alert('cleared!!!')
  }

  const copyOutput = () => {
    let res = document.getElementById('cop')
    res.select()
    navigator.clipboard.writeText(res.value)

    // Alert the copied text
    alert('Copied to clipboard')
  }
  const copyQ = () => {
    let res = document.getElementById('prompt-msg')
    res.select()
    navigator.clipboard.writeText(res.value)

    // Alert the copied text
    alert('Copied to clipboard')
  }

  return {
    conversations,
    getChat,
    msg,
    prompt,
    response,
    disable,
    clearOutput,
    copyOutput,
    stopGen,
    copyQ,
    total_duration
  }
})
