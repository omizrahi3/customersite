import { createSelector } from "reselect";

export default function products(state = {}, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}

export const talentSelector = state => state.talent;

export const talentSelectorTEST = state => {
  return { 1 : {title: "the first title"}, 2 : {title: "the second title"} }
}

export const allTalentSelector = createSelector(talentSelector, talentHash =>
  Object.values(talentHash)
);