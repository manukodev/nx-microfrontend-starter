/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/host',
  server: {
    port: 4205,
    host: 'localhost',
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [react(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md']), federation({
    name: 'host',
    remotes: {
      remote: {
        // external: `Promise.resolve('http://127.0.0.1:4201/Module')`,
        // external: `fetch('http://127.0.0.1:4201/Module').then(response=>response.json()).then(data=>data.url)`,
        externalType: 'promise',
        external: `Promise.resolve('http://127.0.0.1:3100/remoteEntry.js')`,
        from: 'webpack',
        format: 'var',
      }
    },
    shared: ['react', 'react-dom']
  })],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    outDir: '../../dist/apps/host',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/host',
      provider: 'v8',
    },
  },
});
