# SVG Sprite Module

[![npm (scoped with tag)](https://img.shields.io/npm/v/@nuxtjs/svg-sprite/latest.svg?style=flat-square)](https://npmjs.com/package/@nuxtjs/svg-sprite)
[![npm](https://img.shields.io/npm/dt/@nuxtjs/svg-sprite.svg?style=flat-square)](https://npmjs.com/package/@nuxtjs/svg-sprite)

> Optimized and Easy way to use SVG files in Nuxt.js

Sprites help increase speed, maintain a consistent development workflow, and make the creation of icons much faster. SVG sprites are typically created using icons of a similar shape or form whereas larger scale graphics are one-off applications.

**Demo**: https://codesandbox.io/s/github/nuxt-community/svg-sprite-module/

:warning: **NOTE**: SVG Sprites does not work on IE, if you wish to support IE you could use [svg4everybody](https://github.com/jonathantneal/svg4everybody). Take a look at [this issue](https://github.com/nuxt-community/svg-sprite-module/issues/42#issuecomment-516056532) to see how.  

:rainbow: **NOTE**: If you wish to load single SVG icon and you don't want to create sprites, use [Nuxt SVG Module](https://github.com/nuxt-community/svg-module). SVG module for Nuxt.js, allows you to import .svg files in multiple ways depending on the resource query you provide. 

## Installation

```bash
yarn add @nuxtjs/svg-sprite
# or
npm i @nuxtjs/svg-sprite
```

## Usage

Add `@nuxtjs/svg-sprite` to modules section of `nuxt.config.js`:

```js
{
  modules: [
    '@nuxtjs/svg-sprite',
  ],
  svgSprite: {
    // manipulate module options
  }
}
```

Place your svg files in `~/assets/sprite/svg/`, say `sample.svg` and use your image with globally registered `svg-icon` component:

```vue
<svg-icon name="sample" />
```

To create different sprites, create custom directory inside `~/assets/sprite/svg/` and put your svg files inside it and place directory tile before icon name (example: `~/assets/sprite/svg/my-sprite/my-image.svg`):

```vue
<svg-icon name="my-sprite/my-image" />
```

## Options

Module default options:


| Option | Default | Description |
| ------ | ------- | ----------- |
| input | `~/assets/sprite/svg` | Directory of original svg files |
| output | `~/assets/sprite/gen` | Directory to store generated sprites |
| defaultSprite | `icons` | Name of default sprite (default sprite consist of all svgs that place directly inside `input` directory) |
| elementClass | `icon` | global class of all `<svg-icon>` instances |
| spriteClassPrefix | `sprite-` | Prefix of sprite specific classes |

You can update them with the `svgSprite` option in `nuxt.config.js`:

```js
export default {
  modules: ['@nuxtjs/svg-sprite'],
  svgSprite: {
    input: '~/assets/svg/'
  }
}
```

## Props

| Prop | Description |
| --- | --- |
| name | icon path with format `SPRITE_NAME/ICON_NAME`, `SPRITE_NAME` can be omitted for default sprite  |
| title | Accessibility title for icon, this props will transform to `<title>` tag inside `<svg>` |
| desc | Accessibility description for icon, this props will transform to `<desc>` tag inside `<svg>` |



## Development

- Clone this repository
- Install dependencies using `yarn install` or `npm install`
- Start development server using `npm run dev`

You can also contribute directly with CodeSandBox: https://codesandbox.io/s/github/nuxt-community/svg-sprite-module/

## License

[MIT License](./LICENSE)  
Copyright (c) Nuxt Community - Ahad Birang
