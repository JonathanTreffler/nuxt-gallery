<template>
  <div class="container">
    <h1 class="title">
      Nuxt Gallery Demo
    </h1>
    <gallery>
      <galleryImage src="demo_1.jpg" alt="Forest" data-source="Made by: ___" />
      <galleryImage src="demo_2.jpg" alt="Flowers" />
      <galleryImage src="demo_3.jpg" alt="Modern Stairs" />
      <galleryImage src="demo_4.jpg" alt="Golden Gate Bridge" />
    </gallery>
  </div>
</template>

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
<style>
.title {
  text-align: center;
  padding: 21px;
  margin: 0;
  color: white;
}
</style>
