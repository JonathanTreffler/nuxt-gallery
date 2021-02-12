<template>
	<picture
		class="picture"
		:data-source="source"
		:data-jpg-src="require('~/assets/' + src)"
		:data-webp-src="require('~/assets/' + src + '?webp')"
		@click="$parent.$emit('zoomPicture', getId())"
	>
		<source :sizes="sizesAttribute" :srcSet="require('~/assets/' + src + '?format=webp&resize&sizes[]=200&sizes[]=300&sizes[]=600&sizes[]=700').srcSet" type="image/webp">
		<source :sizes="sizesAttribute" :srcSet="require('~/assets/' + src + '?format=jpg&resize&sizes[]=200&sizes[]=300&sizes[]=600&sizes[]=700').srcSet" type="image/jpg">
		<img :src="require('~/assets/' + src)" :alt="alt">
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
		sizesAttribute: {
			type: String,
			default: "",
		},
	},
	methods: {
		getId: function() {
			let pictures = this.$el.parentNode.children;
			for(let id in pictures) {
				if(pictures[id] == this.$el) {
					return id;
				}
			}
		},
	},
};
</script>
<style>

</style>
