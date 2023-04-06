
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/learning-threejs',
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        '01-basic_01-main': '/src/pages/01-basic_01-main.html',
           '01-basic_02-main': '/src/pages/01-basic_02-main.html',
           '01-basic_03-main': '/src/pages/01-basic_03-main.html',
           '01-basic_04-main': '/src/pages/01-basic_04-main.html',
           '01-basic_05-main': '/src/pages/01-basic_05-main.html',
           '01-basic_06-main': '/src/pages/01-basic_06-main.html',
           '01-basic_07-main': '/src/pages/01-basic_07-main.html',
           '01-basic_08-main': '/src/pages/01-basic_08-main.html',
           '01-basic_09-main': '/src/pages/01-basic_09-main.html',
           '02-Mesh_01-main': '/src/pages/02-Mesh_01-main.html',
           '02-Mesh_02-main': '/src/pages/02-Mesh_02-main.html',
           '02-Mesh_03-main': '/src/pages/02-Mesh_03-main.html',
           '02-Mesh_04-main': '/src/pages/02-Mesh_04-main.html',
           '02-Mesh_05-main': '/src/pages/02-Mesh_05-main.html',
           '02-Mesh_06-main': '/src/pages/02-Mesh_06-main.html',
           '02-Mesh_07-main': '/src/pages/02-Mesh_07-main.html',
           '02-Mesh_08-main': '/src/pages/02-Mesh_08-main.html',
           '02-Mesh_09-main': '/src/pages/02-Mesh_09-main.html',
           '02-Mesh_10-main': '/src/pages/02-Mesh_10-main.html',
           '02-Mesh_11-main': '/src/pages/02-Mesh_11-main.html',
           '02-Mesh_12-main': '/src/pages/02-Mesh_12-main.html',
           '02-Mesh_13-main': '/src/pages/02-Mesh_13-main.html',
           '02-Mesh_14-main': '/src/pages/02-Mesh_14-main.html',
           '02-Mesh_15-main': '/src/pages/02-Mesh_15-main.html',
           '03-light_01-main': '/src/pages/03-light_01-main.html',
           '03-light_02-main': '/src/pages/03-light_02-main.html',
           '03-light_03-main': '/src/pages/03-light_03-main.html',
           '03-light_04-main': '/src/pages/03-light_04-main.html',
           '04-demos_01-main': '/src/pages/04-demos_01-main.html',
 
      },
    },
  }
})
