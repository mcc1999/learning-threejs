export default {
  base: '/learning-threejs',
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        '01-01': '/src/pages/01-01.html',
        '01-02': '/src/pages/01-02.html',
        // ...
      },
    },
  }
}