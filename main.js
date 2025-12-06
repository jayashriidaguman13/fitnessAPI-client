import { createApp } from 'vue';
import App from './src/App.vue';
import router from './router';
import { notyf } from './src/notyf.js'; 
import 'notyf/notyf.min.css';

const app = createApp(App);

app.config.globalProperties.$notyf = notyf;

app.use(router).mount('#app');