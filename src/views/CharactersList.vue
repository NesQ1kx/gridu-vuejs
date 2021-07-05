<template>
  <div>
    <FiltersPanel
      @setFilter="onFilterSet($event)"
      @search="searchValue = $event"
    />
    <div class="characters-list">
      <template v-if="filteredCharacters.length">
        <CharacterCard
          v-for="char in filteredCharacters"
          :key="char.id"
          :character="char"
        />
      </template>
      <CharacterNotFound v-else />
    </div>
    <div class="pagination" v-if="filteredCharacters.length">
      <div class="pages">Page {{ page }} of {{ totalPagesCount }}</div>
      <div class="links">
        <router-link
          :class="{ disabled: page === 1 }"
          :to="{ name: 'CharactersList', query: { page: page - 1 } }"
        >
          &#60;&#60; Prev
        </router-link>
        <router-link
          :class="{ disabled: page === totalPagesCount }"
          :to="{ name: 'CharactersList', query: { page: page + 1 } }"
        >
          Next &#62;&#62;
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import FiltersPanel from "@/components/FiltersPanel.vue";
import CharacterCard from "@/components/CharacterCard.vue";
import { AVAILABLE_FILTERS } from "../constants.js";
import actions from "@/store/actions";
import CharacterNotFound from "@/components/CharacterNotFound.vue";

import { mapGetters, mapState } from "vuex";

export default {
  components: {
    FiltersPanel,
    CharacterCard,
    CharacterNotFound,
  },
  computed: {
    ...mapState({
      characters: (state) => state.characters,
    }),
    ...mapGetters(["totalPagesCount"]),
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    filteredCharacters() {
      return this.characters.filter((char) => {
        if (this.activeFilter.name === "All") {
          return char.name.toLowerCase().includes(this.searchValue);
        } else {
          return (
            char.species === this.activeFilter.name &&
            char.name.toLowerCase().includes(this.searchValue)
          );
        }
      });
    },
  },
  data() {
    return {
      activeFilter: AVAILABLE_FILTERS[0],
      searchValue: "",
    };
  },
  mounted() {
    this.$store.dispatch(actions.FETCH_CHARACTERS, this.page);
  },
  methods: {
    onFilterSet(filter) {
      this.activeFilter = filter;
    },
  },
  AVAILABLE_FILTERS,
};
</script>

<style>
.characters-list {
  padding: 20px 100px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 15px;
}

.pagination {
  padding: 20px 100px;
  display: flex;
  justify-content: flex-end;
}

.links {
  margin-left: 30px;
}

.links a {
  text-decoration: none;
  color: black;
}

.links a:first-child {
  margin-right: 5px;
}

.links a.disabled {
  color: gray;
  pointer-events: none;
}
</style>
