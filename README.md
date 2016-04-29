# React Declarative Renderer

## Motivation

Declarative renderer provides an ability to describe markup as a serializable configuration.

```jsx
import {registerRenderer, NestingRenderer} from 'react-declarative-renderer';

registerRenderer('link', props => <a {...props}>{props.children}</a>);
registerRenderer('braces', props => <span>&lt;{props.children}&gt;</span>);

<NestingRenderer renderers={[
  {
    id: 'link',
    props: {
      href: 'http://google.com'
    }
  },
  {
    id: 'braces'
  }
]}>
  Google.com
</NestingRenderer>
```

Snippet above produces following markup:

```html
<span>&lt;<a href="http://google.com">Google.com</a>&gt;</span>
```
