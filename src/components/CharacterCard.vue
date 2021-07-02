<template>
  <div class="card" @click="goToTheCharacter">
    <img :src="character.image" alt="" />
    <div class="info">
      <h3>{{ character.name }}</h3>
      <span>{{ character.species }}</span> -
      <span>{{ character.status }}</span>
      <div
        class="button"
        v-if="isInFavourites"
        @click.stop="removeFromFavourites"
      >
        Remove from favourites
      </div>
      <div class="button" v-else @click.stop="addToFavourites">
        Add to favourites
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import actions from "@/store/actions";

export default {
  computed: {
    ...mapState({
      favouritesChars: (state) => state.favouriteCharacters,
    }),
    isInFavourites() {
      return this.favouritesChars.find(({ id }) => this.character.id === id);
    },
  },
  methods: {
    addToFavourites() {
      this.$store.dispatch(actions.ADD_TO_FAVOURITES, this.character);
    },
    removeFromFavourites() {
      this.$store.dispatch(actions.REMOVE_FROM_FAVOURITES, this.character.id);
    },
    goToTheCharacter() {
      this.$router.push({
        name: "CharacterDetails",
        params: { id: this.character.id },
      });
    },
  },
  props: {
    character: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.card {
  border: 1px solid gray;
  border-radius: 4px;
  cursor: pointer;
}

.card > img {
  width: 100%;
  height: 300px;
}

.info {
  padding: 10px;
}

.button {
  padding: 5px 10px;
  background-color: black;
  color: white;
  cursor: pointer;
  width: max-content;
  border-radius: 5px;
}
</style>
