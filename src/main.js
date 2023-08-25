import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//1
import Vue3DraggableResizable from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'

//2
import NgFormElement  from 'ng-form-element'
import 'ng-form-element/lib/ng-form-element.css'

//3
import NgFormElementPlus  from 'ng-form-elementplus'
import 'ng-form-elementplus/lib/style.css'

const app = createApp(App)
app.use(store).use(router).use(ElementPlus).use(Vue3DraggableResizable).use(NgFormElementPlus).mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
