import { createSelector } from "reselect";

export default function products(state = {}, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}

export const talentsSelector = state => state.talents;

export const talentsSelectorTEST = state => {
  return { 1 : {title: "the first title"}, 2 : {title: "the second title"} }
}

export const allTalentsSelector = createSelector(talentsSelector, talentsHash =>
  Object.values(talentsHash)
);