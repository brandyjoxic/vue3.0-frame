<template>
  <div class="template-m-wrap">
    <test-com :title="lastName"></test-com>
  </div>
</template>
<script>
import TestCom from "@components/TestCom";
export default {
  name: "TemplateM",
  components: {
    TestCom
  },
  provide() {
    return { parent: this };
  },
  data() {
    return {
      firstName: "dsdsdd",
      lastName: "Ken"
    };
  },
  methods: {
    submit(options) {
      console.log(options);
    }
  }
};
</script>
