import App from './components/App.vue';
import './styles/styles.scss';
import Vue from 'vue';

global.showBack = () => dizmo.showBack();
global.showFront = () => dizmo.showFront();

const onDizmoReady = () => {
  global.VUE = new Vue({
    el: '#front', render: h => h(App)
  })
}
document.addEventListener('dizmoready', onDizmoReady, {
  once: true
})
