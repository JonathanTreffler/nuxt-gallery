<template>
	<div class="container">
		<h1 class="title">
			Nuxt Gallery Demo
		</h1>
		<gallery :images-config="images" />
	</div>
</template>

<script>
import Gallery from "~/../src/src/Gallery.vue";

export default {
	components: {
		Gallery,
	},
	data() {
		return {
			images: [
				{ src: "demo_1.jpg", alt: "Forest", bottomText: "Made by: ___", },
				{ src: "demo_2.jpg", alt: "Flowers", },
				{ src: "demo_3.jpg", alt: "Modern Stairs", },
				{ src: "demo_4.jpg", alt: "Golden Gate Bridge", },
			],
		};
	},
};
</script>
<style>
.title {
  text-align: center;
  padding: 21px;
  margin: 0;
  color: white;
}
</style>
