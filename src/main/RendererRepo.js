const REPO = {};

export function registerRenderer(id, renderer, reducer) {
  REPO[id] = {renderer, reducer};
}

export function reduceRenderer(state, action) {
  let {id} = state = {...state};
  if (id in REPO) {
    let reduce = REPO[id].reducer;
    if (reduce) {
      return reduce(state.props, action);
    }
    return state;
  }
  throw new Error(`Expected renderer ${id} to be registered before being used`);
}

export function reduceRendererList(state, action) {
  if (Array.isArray(state)) {
    state = [...state];
    for (let i = 0; i < state.length; ++i) {
      state[i] = reduceRenderer(state[i], action);
    }
  }
  return state;
}

export function getRenderer(id) {
  return REPO[id];
}
