import App from "./App.vue";

export function mount(container) {
  const app = createApp(App);
  app.mount(container);
}
