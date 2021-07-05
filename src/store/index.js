import { createStore } from "vuex";
import actions from "./actions";
import apiService from "@/services/apiService";
import mutations from "./mutations";

let lastId = 0;

export default createStore({
  state: {
    characters: [],
    character: null,
    favouriteCharacters: [],
    totalPagesCount: 0,
    notifications: [],
  },
  mutations: {
    [mutations.SET_CHARACTERS](state, payload) {
      state.characters = payload;
    },
    [mutations.SET_FAVOURITES](state, payload) {
      state.favouriteCharacters = payload;
    },
    [mutations.SET_PAGES_COUNT](state, payload) {
      state.totalPagesCount = payload;
    },
    [mutations.SET_CHARACTER](state, payload) {
      state.character = payload;
    },
    [mutations.SET_NOTIFICATIONS](state, payload) {
      state.notifications = payload;
    }
  },
  actions: {
    async [actions.FETCH_CHARACTER]({ commit, dispatch, state }, payload) {
      const character = state.characters.find(({ id }) => id === payload);
      if (character) {
        commit(mutations.SET_CHARACTER, character);
      } else {
        try {
          const response = await apiService.get(`/character/${payload}`);
          commit(mutations.SET_CHARACTER, response.data);
        } catch (e) {
          dispatch(actions.ADD_NOTIFICATION, {
            type: 'error',
            message: 'Error while fetching character',
          });
        }
      }
    },
    async [actions.FETCH_CHARACTERS]({ commit, dispatch }, payload) {
      try {
        const response = await apiService.get(`/character/?page=${payload}`);
        commit(mutations.SET_CHARACTERS, response.data.results);
        commit(mutations.SET_PAGES_COUNT, response.data.info.pages);
      } catch (e) {
        dispatch(actions.ADD_NOTIFICATION, {
          type: 'error',
          message: 'Error while fetching characters',
        });
      }
    },
    [actions.FETCH_FAVOURITES]({ commit }) {
      const chars = localStorage.getItem("favourites");
      commit(mutations.SET_FAVOURITES, chars ? JSON.parse(chars) : []);
    },
    [actions.ADD_TO_FAVOURITES]({ state, commit }, payload) {
      const newChars = [...state.favouriteCharacters, payload];
      localStorage.setItem("favourites", JSON.stringify(newChars));
      commit(mutations.SET_FAVOURITES, newChars);
    },
    [actions.REMOVE_FROM_FAVOURITES]({ state, commit }, payload) {
      const newChars = state.favouriteCharacters.filter(
        ({ id }) => id !== payload);
      localStorage.setItem("favourites", JSON.stringify(newChars));
      commit(mutations.SET_FAVOURITES, newChars);
    },
    [actions.ADD_NOTIFICATION]({ commit, state }, payload) {
      const notification = { ...payload, id: lastId++ };
      const notifications = [...state.notifications, notification];
      commit(mutations.SET_NOTIFICATIONS, notifications);
    },
    [actions.REMOVE_NOTIFICATION]({ commit, state }, payload) {
      const notifications = state.notifications.filter(({ id }) => payload !== id);
      commit(mutations.SET_NOTIFICATIONS, notifications);
    },
  },
  getters: {
    totalPagesCount: (state) => {
      return state.totalPagesCount;
    },
  },
  modules: {},
});
