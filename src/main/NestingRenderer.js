import React from 'react';
import {RendererShape, getRenderer} from './RendererShape';

const {arrayOf, object} = React.PropTypes;

export class NestingRenderer extends React.Component {

  static propTypes = {
    renderers: arrayOf(RendererShape).isRequired,
    defaultProps: object
  };

  render() {
    let {renderers, defaultProps, children} = this.props;
    for (let {id, props} of renderers) {
      let renderer = getRenderer(id);
      if (!renderer) {
        throw new Error(`Expected renderer ${id} to be registered before being used`);
      }
      children = renderer.render({...defaultProps, ...props, children});
    }
    if (children == null) {
      return null;
    }
    if (Array.isArray(children) && children.length == 1) {
      return children[0];
    }
    if (typeof children.valueOf() == 'object') {
      return children;
    }
    return <span>{children}</span>;
  }
}
