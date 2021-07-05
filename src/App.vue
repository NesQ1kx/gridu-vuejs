<template>
  <div>
    <Navigation />
    <router-view :key="$route.fullPath" />
    <NotificationsContainer />
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
import NotificationsContainer from "@/components/NotificationsContainer.vue";
import actions from "@/store/actions";

export default {
  components: {
    Navigation,
    NotificationsContainer,
  },
  mounted() {
    this.$store.dispatch(actions.FETCH_FAVOURITES);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  margin: 0;
}
</style>
