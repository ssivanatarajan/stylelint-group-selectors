# stylelint-group-selectors
Identify the selectors, which can be grouped, as they have same set of properties and values.


```css
  .a{ display: inline-block;width: 100px;}
  .b{display:inline-block;width:100px;}

```
Above selectors can be grouped like this
```css
.a,.b{display:inline-block;width: 100px;}
```
## Installation

```
npm install stylelint-group-selectors --save-dev
```

## Usage

```js
// .stylelintrc
{
  "plugins": [
    "stylelint-group-selectors"
  ],
  "rules": {
    "plugin/stylelint-group-selectors": true,
  }
}
```
## Options

### `true`

The following patterns are considered violations:
```css
.b{display:inline-block;color:#111;}
.a{display:inline-block;color:#111;}
```
```css
.a,.b{display: inline-block;color:#111; }
```

