import Svgo from 'svgo'
import fs from 'fs-extra'
import cleanupIDs from 'svgo/plugins/cleanupIDs'
import removeAttrs from 'svgo/plugins/removeAttrs'
import removeDimensions from 'svgo/plugins/removeDimensions'
import removeViewBox from 'svgo/plugins/removeViewBox'
import inlineStyles from 'svgo/plugins/inlineStyles'
import inlineDefs from './plugins/inlineDefs'

// Enable removeAttrs plugin
// Remove id attribute to prevent conflict with our id
removeAttrs.active = true
removeAttrs.params.attrs = 'svg:id'

// Disable removeViewBox plugin and enable removeDimensions
// Keep viewBox and remove width & height attribute
removeViewBox.active = false
removeDimensions.active = true

// Make all styles inline
// By definition, a defs sprite is not usable as a CSS sprite
inlineStyles.active = false
inlineStyles.params.onlyMatchedOnce = false

const svgOptimizer = new Svgo({
  plugins: [
    removeDimensions,
    cleanupIDs,
    removeAttrs,
    removeViewBox,
    inlineStyles,
    { inlineDefs }
  ]
})

export async function writeSVG (path, content) {
  const result = await fs.writeFile(path, content, { flag: 'w' })
  return result
}

export async function readSVG (path) {
  const result = await fs.readFile(path)
  return result
}

export async function optimizeSVG (name, content) {
  cleanupIDs.params.prefix = `${name}-`
  const $data = await svgOptimizer.optimize(content)
  return $data.data
}

export function convertToSymbol (name, content) {
  const $data = content
    .replace('<svg', `<symbol id="i-${name}"`)
    .replace('</svg>', '</symbol>')
    .replace(/<defs>(.+)<\/defs>/, '')

  return $data
}

export function extractDefs (content) {
  const $data = content
    .match(/<defs>(.+)<\/defs>/)

  return $data ? $data[1] : ''
}

export function isSVGFile (file) {
  return file.match(/.*\.svg$/)
}

export function wrap (content, defs) {
  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
        '<defs>\n' +
        defs +
        '\n</defs>\n' +
        content +
        '\n</svg>'
}
