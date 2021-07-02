<template>
  <div class="nav">
    <router-link :to="{ name: 'CharactersList', query: { page: 1 } }"
      >Characters</router-link
    >
    <router-link to="/favourites">Favourites</router-link>
    <FavouritesCount class="to-right" />
  </div>
</template>

<script>
import FavouritesCount from "@/components/FavouritesCount.vue";
export default {
  components: {
    FavouritesCount,
  },
};
</script>

<style scoped>
.nav {
  background-color: #1f2428;
  padding: 20px 100px;
  display: flex;
}

.to-right {
  margin-left: auto;
}

.nav a {
  color: gray;
  text-decoration: none;
}

.nav a:not(:first-child) {
  margin-left: 20px;
}

.nav a.router-link-exact-active {
  color: white;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
