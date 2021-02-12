<template>
	<div class="gallery">
		<div class="zoom_blur_background" ref="zoom_blur_background" @click="closeZoom" />
		<picture @click="closeZoom">
			<source :srcSet="zoomedImageWebpSrcSet" type="image/webp">
			<source :srcSet="zoomedImageJpgSrcSet" type="image/jpg">
			<img :src="zoomedImageOriginalSrc" ref="zoomed_image" class="zoomed_image" :alt="zoomedImageAlt">
		</picture>
		<span v-if="zoomedId" class="zoomed_image_source">{{ }}</span>
		<div class="gallery_control_container">
			<img class="gallery_control" alt="" src="./assets/arrow_back.svg" @click="scroll(-1)">
		</div>
		<div class="pictureContainer">
			<picture
				class="picture"
				v-for="(image, index) in images"
				:key="image.src + index"
				ref="image"
				@click="zoom(index)"
			>
				<source :srcSet="image.resizedWebpSrcSet" type="image/webp">
				<source :srcSet="image.resizedJpgSrcSet" type="image/jpg">
				<img :src="image.originalSrc" :alt="image.alt">
			</picture>
		</div>
		<div class="gallery_control_container">
			<img class="gallery_control" alt="" src="./assets/arrow_forward.svg" @click="scroll(1)">
		</div>
	</div>
</template>
<script>
import zoomMixin from "./mixins/zoom.js";

export default {
	mixins: [ zoomMixin, ],
	props: {
		imagesConfig: {
			type: Array,
		},
		zoomAnimation: {
			default: "default",
		},
	},
	data() {
		return {
			focusedId: 0,
			zoomedId: false,
			images: {},
		};
	},
	mounted() {
		let self = this;
        
		self.images = self.imagesConfig;

		setInterval(function() {
			console.log(self.$refs, self.zoomed, self.zoomedId, self.images, self.zoomedImageWebpSrc);
		}, 1000);

		for(let imageId in self.images) {
			let image = self.images[imageId];

			image.originalSrc = require("~/assets/" + image.src);
			image.JpgSrc = require("~/assets/" + image.src + "?format=jpg");
			image.WebpSrc = require("~/assets/" + image.src + "?format=webp");
			image.resizedJpgSrcSet = require("~/assets/" + image.src + "?format=jpg&resize&sizes[]=200&sizes[]=300&sizes[]=600&sizes[]=700").srcSet;
			image.resizedWebpSrcSet = require("~/assets/" + image.src + "?format=webp&resize&sizes[]=200&sizes[]=300&sizes[]=600&sizes[]=700").srcSet;

		}
	},
	computed: {
		zoomed: function() {
			return this.zoomedId != false || this.zoomedId === 0;
		},
		zoomedImageOriginalSrc: function() {
			if(this.zoomed) {
				return this.images[this.zoomedId].originalSrc;
			} else {
				return false;
			}
		},
		zoomedImageWebpSrcSet: function() {
			console.log(this.zoomed);
			if(this.zoomed) {
				return this.images[this.zoomedId].resizedWebpSrcSet;
			} else {
				return false;
			}
		},
		zoomedImageJpgSrcSet: function() {
			if(this.zoomed) {
				return this.images[this.zoomedId].resizedJpgSrcSet;
			} else {
				return false;
			}
		},
		zoomedImageAlt: function() {
			if(this.zoomed) {
				return this.images[this.zoomedId].alt;
			} else {
				return "";
			}
		},
		zoomedImage: function() {
			return this.$refs.zoomed_image;
		},
		zoomBlurBackground: function() {
			return this.$refs.zoom_blur_background;
		},
	},
	methods: {
		getPictureElementById(id) {
			return this.$refs.image[id];
		},
		scroll(direction) {
			const pictureContainer = this.$el.querySelector(".pictureContainer");
			const newCurrentId = this.focusedId + direction;

			let newCurrentPicture = this.getPictureElementById(newCurrentId);

			if (newCurrentPicture) {
				this.scrollToElement({
					container: pictureContainer,
					element: newCurrentPicture,
					duration: 500,
				});

				this.focusedId = newCurrentId;
			}
		},
		getOffset(el) {
			let _x = 0;
			let _y = 0;
			while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
				_x += el.offsetLeft;
				_y += el.offsetTop;
				el = el.offsetParent;
			}
			return { top: _y, left: _x, };
		},
		scrollToElement(options) {
			const scrollLeftStart = options.container.scrollLeft;
			const containerOffsetLeft = this.getOffset(options.container).left;
			const scrollLeftEnd = options.element.offsetLeft - containerOffsetLeft;

			let start;

			function easeInOutCubic(x) {
				return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
			}

			function step(timestamp) {
				if (start === undefined) {
					start = timestamp;
				}

				const elapsed = timestamp - start;
				const progress = Math.min(elapsed / options.duration, 1);

				const currentLeft = scrollLeftStart + ((scrollLeftEnd - scrollLeftStart) * easeInOutCubic(progress));

				options.container.scrollLeft = currentLeft;

				if (elapsed < options.duration) {
					window.requestAnimationFrame(step);
				}
			}

			window.requestAnimationFrame(step);
		},
	},
};
</script>
<style>
	.gallery {
		width: 90%;
		display: flex;
		flex-flow: row;
		flex-wrap: nowrap;
		margin: auto;
		margin-bottom: 5px;
	}
	.gallery_control_container {
		width: 10%;
		vertical-align: middle;
		display: flex;
	}
	.gallery_control {
		width: 100%;
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none;
		object-fit: contain;
	}
	.pictureContainer {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		width: 80%;
		overflow-y: scroll;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
	.pictureContainer::-webkit-scrollbar {
			width: 0;
			height: 0;
	}
	.zoom_blur_background {
		background-color: black;
		z-index: -1;
		top: 0px;
		left: 0px;
		display: block;
		position: fixed;
		width: 100%;
		height: 100%;
		opacity: 0;
		transition: opacity 0.4s;
	}
	.gallery.zoom .zoom_blur_background {
		z-index: 2000;
	}
	.gallery.zoom .zoomed_image_source {
		display: block;
		position: fixed;
		bottom: 15px;
		left: 50%;
		transform: translateX(-50%);
	}
	.zoomed_image_source {
		display: none;
		z-index: 2002;
		color: white;
	}
	.zoomed_image {
		position: fixed;
		z-index: 2002;
	}
	.zoomed_image.topLeftTransition {
		transition: left 0.5s linear, top 0.5s linear;
	}
	.zoomed_image.maxWidthHeightTransition {
		transition: max-width 0.5s linear, max-height 0.5s linear;
	}
	@media (pointer:none), (pointer:coarse) {
		.pictureContainer {
			width: 100%;
		}
		.gallery_control_container {
			display: none;
		}
	}
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
