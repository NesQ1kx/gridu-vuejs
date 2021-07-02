<template>
  <div class="fav">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xml:lang="en"
      height="20px"
      width="20px"
    >
      <title>Heart</title>
      <path
        fill="white"
        d="M10,6 
                Q10,0 15,0 
                T20,6 
                Q20,10 15,14 
                T10,20 
                Q10,18 5,14
                T0,6
                Q0,0 5,0
                T10,6
                Z"
      />
    </svg>
    <div class="count">{{ favCharacters.length }}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      favCharacters: (state) => state.favouriteCharacters,
    }),
  },
};
</script>

<style scoped>
.fav {
  display: flex;
  color: white;
}
.count {
  margin-left: 5px;
}
</style>
