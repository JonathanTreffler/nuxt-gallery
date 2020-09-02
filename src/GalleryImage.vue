<template>
	<picture
		class="picture"
		:data-source="source"
		:data-jpg-src="require('~/assets/pictures/' + src)"
		:data-webp-src="require('~/assets/pictures/' + src + '?webp')"
		@click="$parent.$emit('zoomPicture', getId())"
	>
		<source :srcSet="require('~/assets/pictures/' + src + '?format=webp&resize&sizes[]=200&sizes[]=300&sizes[]=600&sizes[]=700').srcSet" type="image/webp">
		<source :srcSet="require('~/assets/pictures/' + src + '?format=jpg&resize&sizes[]=200&sizes[]=300&sizes[]=600&sizes[]=700').srcSet" type="image/jpg">
		<img :src="require('~/assets/pictures/' + src)" :alt="alt">
	</picture>
</template>
<script>
export default {
	props: {
		src: {
			type: String,
			default: "",
		},
		alt: {
			type: String,
			default: "",
		},
		source: {
			type: String,
			default: "",
		},
	},
	methods: {
		getId: function() {
			console.log(this.$el);
			let pictures = this.$el.parentNode.children;
			for(let id in pictures) {
				console.log(id);
				console.log(pictures[id]);
				if(pictures[id] == this.$el) {
					return id;
				}
			}
		},
	},
};
</script>
<style>
	.picture, .picture img {
		height: 400px;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
	}
	#zoomed_image {
		position: fixed;
		z-index: 2001;
	}
	.picture:not(:last-child) {
		margin-right: 7px;
	}
</style>
