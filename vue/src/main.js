import { createApp } from 'vue';

import { store } from './store/store.js';
// import "./main.scss";
import './styles/main.scss';
import './styles/input.css';

import router from './router.js';
import App from './App.vue';
const app = createApp(App);

// app.config.globalProperties.$filters = {
//     projects(product) {
//         return;
//     },
// };
app.use(store);
app.use(router);

app.mount('#app');
