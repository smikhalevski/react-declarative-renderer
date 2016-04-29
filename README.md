# React Declarative Renderer

## Motivation

Declarative renderer provides an ability to describe markup as a serializable configuration.

```jsx
import {registerRenderer, NestingRenderer} from 'react-declarative-renderer';

registerRenderer('link', props => <a {...props}>{props.children}</a>);
registerRenderer('underscores', props => <span>__{props.children}__</span>);

<NestingRenderer renderers={[
  {
    id: 'link',
    props: {
      href: 'http://google.com'
    }
  },
  {id: 'underscores'}
]}>
  Google.com
</NestingRenderer>
```

Snippet above produces following markup:

```html
<span>__<a href="http://google.com">Google.com</a>__</span>
```
