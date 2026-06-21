const initialState = () => ({
  profession: "",
  player: "",
  auditor: "",
  availableCash: 0
});

export default {
  namespaced: true,
  state: initialState(),
  mutations: {
    changeProfession: (state, payload) => (state.profession = payload),
    changePlayer: (state, payload) => (state.player = payload),
    changeAuditor: (state, payload) => (state.auditor = payload),
    setAvailableCash: (state, payload) => (state.availableCash = payload),
    payCash(state, amount) {
      state.availableCash = state.availableCash - amount;
    },
    receiveCash(state, amount) {
      state.availableCash = state.availableCash + amount;
    }
  }
};
