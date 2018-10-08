import Vue from 'vue'
import App from './app.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
new Vue({
    el: '#app',
    render: h => h(App)
})
