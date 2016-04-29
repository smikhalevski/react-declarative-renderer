import React from 'react';

const {shape, object, string} = React.PropTypes;

export const RendererShape = shape({id: string.isRequired, props: object});

const RENDERERS = {};

export function registerRenderer(id, render, reduceProps) {
  RENDERERS[id] = Object.freeze({id, render, reduceProps});
}

export function reduceRenderer(state, action) {
  if (state.id in RENDERERS) {
    let reduce = RENDERERS[state.id].reduceProps;
    if (reduce) {
      state = {...state, props: reduce(state.props, action)};
    }
    if (process.env.NODE_ENV == 'production') {
      return state;
    }
    return Object.freeze(state);
  }
  throw new Error(`Expected renderer ${state.id} to be registered before being used`);
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
  return RENDERERS[id];
}
