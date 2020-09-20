export default {
	methods: {
		zoom: function(id) {
			let self = this;
			this.zoomedId = id;

			let picture = this.getPictureElementById(id);

			this.$el.classList.add("zoom");

			const pos = picture.getBoundingClientRect();
			const height = pos.height;
			const width = pos.width;

			const zoomedImage = self.$refs.zoomed_image;
			self.zoomedImageStyle.display = "";


			function setToOrgiginalPos(pos, width, height) {
				console.log("setToOrgiginalPos");
				return new Promise(function(resolve) {
					self.zoomedImageStyle.top = pos.top + "px";
					self.zoomedImageStyle.left = pos.left + "px";
					self.zoomedImageStyle.width = width + "px";
					self.zoomedImageStyle.height = height + "px";
					self.zoomedImageStyle.maxWidth = width + "px";
					self.zoomedImageStyle.maxHeight = height + "px";

					resolve();
				});
			}

			function activateBlurBackground() {
				console.log("activateBlurBackground");
				return new Promise(function(resolve) {
					self.zoomBlurStyle.display = "";
					self.zoomBlurStyle.opacity = 0.8;

					resolve();
				});
			}

			function centerImagePX() {
				console.log("centerImagePX");
				return new Promise(function(resolve) {
					const htmlBounds = document.getElementsByTagName("html")[0].getBoundingClientRect();
					const zoomedImageBounds = self.$refs.zoomed_image.getBoundingClientRect();
					console.log(zoomedImage);
					zoomedImage.classList.add("topLeftTransition");
					self.zoomedImageStyle.top = (htmlBounds.height - zoomedImageBounds.height) / 2 + "px";
					self.zoomedImageStyle.left = (htmlBounds.width - zoomedImageBounds.width) / 2 + "px";

					setTimeout(function() {
						zoomedImage.classList.remove("topLeftTransition");
						resolve();
					}, 500);
				});
			}

			function centerImagePC() {
				console.log("centerImagePC");
				return new Promise(function(resolve) {
					self.zoomedImageStyle.top = "50%";
					self.zoomedImageStyle.left = "50%";
					self.zoomedImageStyle.transform = "translate(-50%, -50%)";

					resolve();
				});
			}

			function extendPX() {
				console.log("extendPX");
				return new Promise(function(resolve) {
					self.zoomedImageStyle.width = "";
					self.zoomedImageStyle.height = "";

					const htmlBounds = document.getElementsByTagName("html")[0].getBoundingClientRect();

					zoomedImage.classList.add("maxWidthHeightTransition");
					self.zoomedImageStyle.maxWidth = htmlBounds.width + "px";
					self.zoomedImageStyle.maxHeight = htmlBounds.height + "px";

					setTimeout(function() {
						zoomedImage.classList.remove("maxWidthHeightTransition");
						resolve();
					}, 500);
				});
			}

			function extendPC() {
				console.log("extendPC");
				return new Promise(function(resolve) {
					self.zoomedImageStyle.maxWidth = "";
					self.zoomedImageStyle.maxWidth = "100%";
					self.zoomedImageStyle.maxHeight = "";
					self.zoomedImageStyle.maxHeight = "100%";

					resolve();
				});
			}

			function activateClosing(thisEl) {
				console.log("activateClosing");
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

				self.zoomedImageStyle.display = "none";
				zoomedImage.removeAttribute("style");
				this.currentWebpSrc = "";
				this.currentJpgSrc = "";

				zoomBlurBackground.classList.remove("closeable");
			}
		},
	},
};