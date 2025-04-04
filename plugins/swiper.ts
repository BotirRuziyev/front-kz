import Vue from 'vue'
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper'
import 'swiper/swiper-bundle.min.css'

Swiper.use([Navigation, Pagination, Autoplay])

Vue.prototype.$swiper = Swiper
Vue.prototype.$swiperAutoplay = Autoplay
