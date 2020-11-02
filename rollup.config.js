// rollup.config.js
import typescript from '@rollup/plugin-typescript';
export default {
    input: 'src/Wrapper.tsx',
    output: {
      dir: 'lib',
      format: 'cjs',
    },
    plugins: [typescript()],
  };