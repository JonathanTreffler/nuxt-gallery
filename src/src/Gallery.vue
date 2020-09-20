<template>
	<div class="gallery">
		<div class="zoom_blur_background" @click="closeZoom" />
		<picture @click="closeZoom" v-if="zoomedId">
			<source :srcSet="require('~/assets/' + images[zoomedId].src + '?format=webp').srcSet" type="image/webp">
			<img class="zoomed_image" :srcSet="require('~/assets/' + images[zoomedId].src + '?format=jpg').srcSet" type="image/jpg" :alt="images[zoomedId].alt">
		</picture>
		<span class="zoomed_image_source" />
		<div class="gallery_control_container">
			<img class="gallery_control" alt="" src="./assets/arrow_back.svg" @click="scroll(-1)">
		</div>
		<div class="pictureContainer">
			<picture
				class="picture"
				v-for="(image, index) in images"
				:key="image.src + index"
				ref="image"
			>
				<source :srcSet="require('~/assets/' + image.src + '?format=webp&resize&sizes[]=200&sizes[]=300&sizes[]=600&sizes[]=700').srcSet" type="image/webp">
				<source :srcSet="require('~/assets/' + image.src + '?format=jpg&resize&sizes[]=200&sizes[]=300&sizes[]=600&sizes[]=700').srcSet" type="image/jpg">
				<img :src="require('~/assets/' + image.src)" :alt="image.alt">
			</picture>
		</div>
		<div class="gallery_control_container">
			<img class="gallery_control" alt="" src="./assets/arrow_forward.svg" @click="scroll(1)">
		</div>
	</div>
</template>
<script>
export default {
	props: {
		images: Array,
	},
	data() {
		return {
			focusedId: 0,
			zoomedId: false,
		};
	},
	mounted() {
		this.$on("zoomPicture", function(id) {
			let picture = this.getPictureElementById(id);

			this.$el.classList.add("zoom");

			const pos = picture.getBoundingClientRect();
			const height = pos.height;
			const width = pos.width;

			const zoomedImage = this.$el.querySelector(".zoomed_image");
			zoomedImage.style.display = "";


			function setToOrgiginalPos(pos, width, height) {
				return new Promise(function(resolve) {
					zoomedImage.style.top = pos.top + "px";
					zoomedImage.style.left = pos.left + "px";
					zoomedImage.style.width = width + "px";
					zoomedImage.style.height = height + "px";
					zoomedImage.style.maxWidth = width + "px";
					zoomedImage.style.maxHeight = height + "px";

					resolve();
				});
			}

			function activateBlurBackground(thisEl) {
				return new Promise(function(resolve) {
					const zoomBlurBackground = thisEl.querySelector(".zoom_blur_background");
					zoomBlurBackground.style.display = "";
					zoomBlurBackground.style.opacity = 0.8;

					resolve();
				});
			}

			function centerImagePX() {
				return new Promise(function(resolve) {
					const htmlBounds = document.getElementsByTagName("html")[0].getBoundingClientRect();
					const zoomedImageBounds = zoomedImage.getBoundingClientRect();

					zoomedImage.classList.add("topLeftTransition");
					zoomedImage.style.top = (htmlBounds.height - zoomedImageBounds.height) / 2 + "px";
					zoomedImage.style.left = (htmlBounds.width - zoomedImageBounds.width) / 2 + "px";

					setTimeout(function() {
						zoomedImage.classList.remove("topLeftTransition");
						resolve();
					}, 500);
				});
			}

			function centerImagePC() {
				return new Promise(function(resolve) {
					zoomedImage.style.top = "50%";
					zoomedImage.style.left = "50%";
					zoomedImage.style.transform = "translate(-50%, -50%)";

					resolve();
				});
			}

			function extendPX() {
				return new Promise(function(resolve) {
					zoomedImage.style.width = "";
					zoomedImage.style.height = "";

					const htmlBounds = document.getElementsByTagName("html")[0].getBoundingClientRect();

					zoomedImage.classList.add("maxWidthHeightTransition");
					zoomedImage.style.maxWidth = htmlBounds.width + "px";
					zoomedImage.style.maxHeight = htmlBounds.height + "px";

					setTimeout(function() {
						zoomedImage.classList.remove("maxWidthHeightTransition");
						resolve();
					}, 500);
				});
			}

			function extendPC() {
				return new Promise(function(resolve) {
					zoomedImage.style.maxWidth = "";
					zoomedImage.style.maxWidth = "100%";
					zoomedImage.style.maxHeight = "";
					zoomedImage.style.maxHeight = "100%";

					resolve();
				});
			}

			function activateClosing(thisEl) {
				const zoomBlurBackground = thisEl.querySelector(".zoom_blur_background");
				return new Promise(function(resolve) {
					zoomBlurBackground.classList.add("closeable");
					resolve();
				});
			}

			setToOrgiginalPos(pos, width, height)
				.then(activateBlurBackground(this.$el))
				.then(centerImagePX)
				.then(centerImagePC)
				.then(extendPX)
				.then(extendPC)
				.then(activateClosing(this.$el));
		});
		let self = this;
		setInterval(function() {
			console.log(self.$refs);
		}, 1000);
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
		closeZoom() {
			const zoomBlurBackground = this.$el.querySelector(".zoom_blur_background");

			if (zoomBlurBackground.classList.contains("closeable")) {
				const zoomedImage = this.$el.querySelector(".zoomed_image");

				const self = this;
				zoomBlurBackground.style.opacity = 0;

				setTimeout(function() {
					self.$el.classList.remove("zoom");
					zoomBlurBackground.style.display = "none";
				}, 400);

				zoomedImage.style.display = "none";
				zoomedImage.removeAttribute("style");
				this.currentWebpSrc = "";
				this.currentJpgSrc = "";

				zoomBlurBackground.classList.remove("closeable");
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
