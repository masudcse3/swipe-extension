import path from 'path'

import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
// import babel from "@rollup/plugin-babel";

import { chromeExtension, simpleReloader } from 'rollup-plugin-chrome-extension'
import { emptyDir } from 'rollup-plugin-empty-dir'
// import dts from "rollup-plugin-dts";

// To handle css files
import postcss from "rollup-plugin-postcss";

import { terser } from "rollup-plugin-terser";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import image from '@rollup/plugin-image';
import zip from 'rollup-plugin-zip'
import replace from '@rollup/plugin-replace'
import json from "@rollup/plugin-json";
// import autoprefixer from 'autoprefixer';
import { babel } from '@rollup/plugin-babel';

const isProduction = process.env.NODE_ENV === 'production'
export default 
  {
  input: 'src/manifest.json',
  output: {
    dir: 'dist',
    format: 'esm',
    chunkFileNames: path.join('chunks','[name]-[hash].js'),
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': isProduction ? JSON.stringify( 'production' ) : JSON.stringify( 'development' ),
      preventAssignment: true
    }),
    chromeExtension(),
    // Adds a Chrome extension reloader during watch mode
    simpleReloader(),
    json(),
    resolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-react'],
    }),
    typescript(),
    postcss({
      plugins: [],
      minimize: true,
    }),
      
    terser(),
    image(),
    peerDepsExternal(),
    // Empties the output dir before a new build
    emptyDir(),
    // Outputs a zip file in ./releases
    isProduction && zip({ dir: 'releases' }),
 ]
  
  
  }
