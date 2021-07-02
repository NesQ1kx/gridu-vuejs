<template>
  <div class="character" v-if="character">
    <div class="info">
      <h3>{{ character.name }}</h3>
      <span>{{ character.species }}</span> -
      <span>{{ character.status }}</span>
      <div>Last known location: {{ character.location.name }}</div>
      <div v-if="firstEpisode">First seen in: {{ firstEpisode.name }}</div>
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
    <img :src="character.image" height="200" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import actions from "@/store/actions";
import mutations from "@/store/mutations";
import apiService from "@/services/apiService";

export default {
  computed: {
    ...mapState({
      character: (state) => state.character,
      favouritesChars: (state) => state.favouriteCharacters,
    }),
    isInFavourites() {
      return this.favouritesChars.find(({ id }) => this.character.id === id);
    },
  },
  data() {
    return {
      firstEpisode: null,
    };
  },
  async created() {
    await this.$store.dispatch(actions.FETCH_CHARACTER, this.$route.params.id);
    try {
      const response = await apiService.get("/episode/1");
      this.firstEpisode = response.data;
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    addToFavourites() {
      this.$store.dispatch(actions.ADD_TO_FAVOURITES, this.character);
    },
    removeFromFavourites() {
      this.$store.dispatch(actions.REMOVE_FROM_FAVOURITES, this.character.id);
    },
  },
  beforeUnmount() {
    this.$store.commit(mutations.SET_CHARACTER, null);
  },
};
</script>

<style scoped>
.character {
  display: flex;
  justify-content: space-between;
  margin: 20px 100px;
  border: 1px solid gray;
  border-radius: 5px;
}

.info {
  margin: 10px;
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
