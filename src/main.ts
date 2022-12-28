import { createApp } from 'vue'

import App from './App.vue'

import './index.css'

const app = createApp(App)

const clickBlurExclude: string[] = ['INPUT','SELECT','TEXTAREA']
let escHandler: any = null
let handleClickBlur: Function | null = null
let handleOutsideClick: any = null

app.directive('click-blur', {
  beforeMount(el, binding, vnode) {
    handleClickBlur = (e: { currentTarget: HTMLElement }) => {
      if (clickBlurExclude.indexOf(e.currentTarget.nodeName) === -1) {
        e.currentTarget.blur()
      }
    }
    el.addEventListener('click', handleClickBlur, false)
    el.addEventListener('touchend', handleClickBlur, false)
  },
  beforeUnmount(el) {
    el.removeEventListener('click', handleClickBlur)
    el.removeEventListener('touchend', handleClickBlur)
  }
})

app.mount('#app')