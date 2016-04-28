import React from 'react';
import {getRenderer} from './RendererRepo';

const {shape, arrayOf, object, string} = React.PropTypes;

export class DeclarativeRenderer extends React.Component {

  static propTypes = {
    renderers: arrayOf(shape({id: string.isRequired, props: object})).isRequired,
    defaultProps: object
  };

  render() {
    const {renderers, defaultProps, children} = this.props;
    let tag = children;
    if (renderers.length) {
      for (let {id, props} of renderers) {
        let renderer = getRenderer(id);
        if (!renderer) {
          throw new Error(`Expected renderer ${id} to be registered before being used`);
        }
        tag = renderer({...defaultProps, ...props}, tag);
      }
      if (tag == null) {
        return null;
      }
      // Super quick test for tag being an actual React.Element
      if (tag && typeof tag == 'object') {
        return tag;
      }
    }
    return <div>{tag}</div>;
  }
}
