<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import actions from "@/store/actions";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  mounted() {
    this.$store.dispatch(actions.FETCH_DATA);
  },
};
</script>
