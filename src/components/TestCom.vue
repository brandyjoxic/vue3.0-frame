<template>
  <div class="template-m-wrap">counter ---> {{ counter }}</div>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "TemplateM",
  props: {
    test: {
      type: Object,
      default: () => {
        return {
          name: "haha"
        };
      }
    }
  },
  setup(props) {
    const counter = ref(0);
    console.log("props===>", props);

    return {
      counter
    };
  }
});
</script>
