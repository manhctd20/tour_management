import {defineConfig, loadEnv, transformWithEsbuild} from 'vite';
import react from '@vitejs/plugin-react';
import browserslistToEsbuild from 'browserslist-to-esbuild';


export default ({ mode }) => {
  const env = {...process.env, ...loadEnv(mode, process.cwd())};
  // const isAdminMode = env.VITE_MODE === 'admin';
  const outDir = env.VITE_OUT_DIR;
  return defineConfig({
    // depending on your application, base can also be "/"
    base: '/',
    plugins: [
      {
        name: 'treat-js-files-as-jsx',
        async transform(code, id) {
          if (!id.match(/src\/.*\.js$/))  return null

          // Use the exposed transform from vite, instead of directly
          // transforming with esbuild
          return transformWithEsbuild(code, id, {
            loader: 'jsx',
            jsx: 'automatic',
          })
        },
      },
      react(),
    ],
    resolve: {
      alias: {
        components: "/src/components",
        containers: "/src/containers",
        images: "/src/assets/images",
        scss: "/src/scss",
        services: "/src/services",
        utils: "/src/utils",
        '~images': "/src/assets/images",
      },
    },
    optimizeDeps: {
      force: true,
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
        },
      },
    },
    // css: {
    //   preprocessorOptions: {
    //     less: {
    //       // modifyVars: { 'primary-color': '#13c2c2' },
    //       modifyVars: {
    //         'primary-color': isAdminMode ? '#8270DB' : '#F37644',
    //         'link-color': isAdminMode ? '#8270DB' : '#F37644',
    //         'menu-item-active-bg': isAdminMode ? '#8270DB' : '#F37644',
    //         // 'menu-highlight-color': isAdminMode ? '#fff' : '#fff',
    //         'menu-item-height': '58px',
    //         'menu-inline-toplevel-item-height': '58px',
    //         'border-radius-base': '4px',
    //         'font-size-base': '14px',
    //         'line-height-base': '22px',
    //       },
    //       javascriptEnabled: true,
    //     },
    //   },
    // },
    server: {
      // this ensures that the browser opens upon server start
      open: true,
      // this sets a default port to 3000
      port: 2005,
    },
    build: {
      outDir,
      // --> ["chrome79", "edge92", "firefox91", "safari13.1"]
      target: browserslistToEsbuild(['>0.2%', 'not dead', 'not op_mini all']),
    },
  })
};
