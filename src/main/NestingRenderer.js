import React from 'react';
import {RendererShape, getRenderer} from './RendererShape';

const {arrayOf, object, func} = React.PropTypes;

export class NestingRenderer extends React.Component {

  static propTypes = {
    renderers: arrayOf(RendererShape),
    defaultProps: object,
    component: func
  };

  render() {
    let {renderers, defaultProps, children, component} = this.props;
    if (Array.isArray(renderers)) {
      for (let {id, props} of renderers) {
        let renderer = getRenderer(id);
        if (!renderer) {
          throw new Error(`Expected renderer ${id} to be registered before being used`);
        }
        children = renderer.render({...defaultProps, ...props, children});
      }
    }
    if (children == null) {
      return null;
    }
    if (Array.isArray(children) && children.length == 1) {
      children = children[0];
    }
    if (React.isValidElement(children)) {
      return children;
    }
    if (component) {
      return React.createElement(component, children);
    }
    return <span>{children}</span>;
  }
}
