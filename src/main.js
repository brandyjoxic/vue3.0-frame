import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./utils/browser";
// import directives from "./utils/directive";
const app = createApp(App);

app
  .use(store)
  .use(router)
  // .use(directives)
  .mount("#app");

app.component("my-component", {
  props: {
    foo: String
  },
  template: `
      <input 
        type="text"
        :value="foo"
        @input="$emit('update:foo', $event.target.value)">
    `
});
