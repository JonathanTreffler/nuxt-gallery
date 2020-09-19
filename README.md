[![npm](https://img.shields.io/npm/v/nuxt-gallery?style=flat-square)](https://www.npmjs.com/package/nuxt-gallery)
[![npm bundle size](https://img.shields.io/bundlephobia/min/nuxt-gallery?style=flat-square)](https://www.npmjs.com/package/nuxt-gallery)
[![npm](https://img.shields.io/npm/dt/nuxt-gallery?style=flat-square)](https://www.npmjs.com/package/nuxt-gallery)
![Lint Libary Workflow Status](https://img.shields.io/github/workflow/status/JonathanTreffler/nuxt-gallery/Lint%20Libary?label=Libary%20Lint&style=flat-square)
![Lint Demo Workflow Status](https://img.shields.io/github/workflow/status/JonathanTreffler/nuxt-gallery/Lint%20Demo?label=Demo%20Lint&style=flat-square)
![GitHub](https://img.shields.io/github/license/JonathanTreffler/nuxt-gallery?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/JonathanTreffler/nuxt-gallery?style=flat-square)
[![Maintenance](https://img.shields.io/maintenance/yes/2020?style=flat-square)](https://github.com/JonathanTreffler/nuxt-gallery/commits/)

# Nuxt Gallery

A gallery library for nuxt with a modern design and automatic image optimisation.

## How it works:
On compile time the images of the gallery get automatically resized and reencoded.

It encodes the images in webp, the modern image standard for the web, and jpg, so everything works on old browsers too.
It also creates multiple resolution of the image (in both webp and jpg).

When the client loads the gallery the browser decides wich image resolution best fits. <br>
Brosers decide this by factors like: Screen Resolution, Network Speed, Baterry Level, Data Saving Mode, Data Caps ...

Because of these optimisations the images will look great on PCs, Tablets and Phones regardless of the resolution.

When a image gets clicked the full resolution version gets loaded and displayed as big as possible (depends on the screen size).

If you have to include the author of the image, because of the license you can do that with the data-source parameter. <br>
It will show the author on the bottom of the screen when the user clicks on the image.

### [Demo](https://jonathan-treffler.de/nuxt-gallery/)

## Installation:
```bash
npm install nuxt-gallery
```

## Usage:
```html
<script>
  import Gallery from 'nuxt-gallery/src/Gallery.vue'
  import GalleryImage from 'nuxt-gallery/src/GalleryImage.vue'
  
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
<img src="https://raw.githubusercontent.com/JonathanTreffler/nuxt-gallery/master/img/1.png">
<img src="https://raw.githubusercontent.com/JonathanTreffler/nuxt-gallery/master/img/2.png">
