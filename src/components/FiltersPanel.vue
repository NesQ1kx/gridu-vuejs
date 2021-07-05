<template>
  <div class="filters-panel">
    <div class="filters">
      <div
        v-for="item in availableFilters"
        :key="item.id"
        class="filter-item"
        :class="{ active: item.id === activeFilter.id }"
        @click="setActiveFilter(item.id)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="search">
      <input
        type="text"
        class="search-input"
        placeholder="Search by name..."
        v-model="searchValue"
      />
      <div class="do-search" @click="doSearch">Search</div>
    </div>
  </div>
</template>

<script>
import { AVAILABLE_FILTERS } from "../constants";

export default {
  data() {
    return {
      availableFilters: AVAILABLE_FILTERS,
      activeFilter: null,
      searchValue: "",
    };
  },
  created() {
    this.activeFilter = AVAILABLE_FILTERS[0];
    this.$emit("setFilter", this.activeFilter);
  },
  methods: {
    setActiveFilter(value) {
      this.activeFilter =
        AVAILABLE_FILTERS.find(({ id }) => id === value) ||
        AVAILABLE_FILTERS[0];
      this.$emit("setFilter", this.activeFilter);
    },
    doSearch() {
      this.$emit("search", this.searchValue);
    },
  },
  AVAILABLE_FILTERS,
};
</script>

<style scoped>
.filters-panel {
  background-color: #f2f2f2;
  padding: 20px 100px;
  display: flex;
  align-items: center;
}

.filters {
  display: flex;
  border: 1px solid black;
  border-radius: 5px;
  margin-right: 50px;
}

.filters .filter-item:not(:last-child) {
  border-right: 1px solid black;
}

.filter-item {
  padding: 5px 10px;
  cursor: pointer;
}

.filter-item.active {
  color: white;
  background-color: black;
}

.search {
  display: flex;
  border: 1px solid black;
  border-radius: 5px;
}

.search-input {
  border: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.search-input:focus {
  outline: 0;
}

.do-search {
  padding: 5px 10px;
  border-left: 1px solid black;
  cursor: pointer;
}

.do-search:hover {
  background-color: black;
  color: white;
}
</style>
