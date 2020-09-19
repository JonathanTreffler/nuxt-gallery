[![npm](https://img.shields.io/npm/v/modern-vue-gallery?style=flat-square)](https://www.npmjs.com/package/modern-vue-gallery)
[![npm bundle size](https://img.shields.io/bundlephobia/min/modern-vue-gallery?style=flat-square)](https://www.npmjs.com/package/modern-vue-gallery)
[![npm](https://img.shields.io/npm/dt/modern-vue-gallery?style=flat-square)](https://www.npmjs.com/package/modern-vue-gallery)
![Lint Libary Workflow Status](https://img.shields.io/github/workflow/status/JonathanTreffler/modern-vue-gallery/Lint%20Libary?label=Libary%20Lint&style=flat-square)
![Lint Demo Workflow Status](https://img.shields.io/github/workflow/status/JonathanTreffler/modern-vue-gallery/Lint%20Demo?label=Demo%20Lint&style=flat-square)
![GitHub](https://img.shields.io/github/license/JonathanTreffler/modern-vue-gallery?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/JonathanTreffler/modern-vue-gallery?style=flat-square)
[![Maintenance](https://img.shields.io/maintenance/yes/2020?style=flat-square)](https://github.com/JonathanTreffler/modern-vue-gallery/commits/)

# Vue Gallery

A gallery libary for vuejs with a modern design and automatic image optimisation

### [Demo](https://jonathan-treffler.de/modern-vue-gallery/)

## Installation:
```bash
npm install modern-vue-gallery
```

## Usage:
- import Quill
```html
<script>
  import Gallery from 'modern-vue-gallery/src/Gallery.vue'
  import GalleryImage from 'modern-vue-gallery/src/GalleryImage.vue'
  
  export default {
    components: {
      Gallery,
      GalleryImage
    }
  }
</script>
<template>
  <gallery>
    <galleryImage src="demo_1.jpg" alt="Forest" data-source="Made by: ___" />
    <galleryImage src="demo_2.jpg" alt="Flowers" />
  </gallery>
</template>
```

## Screenshots:
<img src="https://raw.githubusercontent.com/JonathanTreffler/modern-vue-gallery/master/img/1.png">
<img src="https://raw.githubusercontent.com/JonathanTreffler/modern-vue-gallery/master/img/2.png">
