<template>
  <div class="fav-list">
    <template v-if="favouriteCharacters.length">
      <CharacterCard
        v-for="char in favouriteCharacters"
        :key="char.id"
        :character="char"
      />
    </template>
    <CharacterNotFound v-else />
  </div>
</template>

<script>
import CharacterCard from "@/components/CharacterCard.vue";
import CharacterNotFound from "@/components/CharacterNotFound.vue";

import { mapState } from "vuex";

export default {
  components: {
    CharacterCard,
    CharacterNotFound,
  },
  computed: {
    ...mapState({
      favouriteCharacters: (state) => state.favouriteCharacters,
    }),
  },
};
</script>

<style>
.fav-list {
  padding: 20px 100px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 15px;
}
</style>
