export default {
	zoom(id, self) {
		self.zoomedId = id;

		self.$nextTick(function() {
			let picture = self.getPictureElementById(id);

			self.$el.classList.add("zoom");

			const pos = picture.getBoundingClientRect();
			const height = pos.height;
			const width = pos.width;

			self.zoomedImage.style.display = "";
            
			setToOrgiginalPos(pos, width, height)
				.then(activateBlurBackground(self.$el))
				.then(centerImagePX)
				.then(centerImagePC)
				.then(extendPX)
				.then(extendPC)
				.then(activateClosing(self.$el));
		});

		function setToOrgiginalPos(pos, width, height) {
			console.log("setToOrgiginalPos");
			return new Promise(function(resolve) {
				self.zoomedImage.style.top = pos.top + "px";
				self.zoomedImage.style.left = pos.left + "px";
				self.zoomedImage.style.width = width + "px";
				self.zoomedImage.style.height = height + "px";
				self.zoomedImage.style.maxWidth = width + "px";
				self.zoomedImage.style.maxHeight = height + "px";

				resolve();
			});
		}

		function activateBlurBackground() {
			console.log("activateBlurBackground");
			return new Promise(function(resolve) {
				self.zoomBlurBackground.style.display = "";
				self.zoomBlurBackground.style.opacity = 0.8;

				resolve();
			});
		}

		function centerImagePX() {
			console.log("centerImagePX");
			return new Promise(function(resolve) {
				const htmlBounds = document.getElementsByTagName("html")[0].getBoundingClientRect();
				const zoomedImageBounds = self.$refs.zoomed_image.getBoundingClientRect();
				console.log(self.zoomedImage);
				self.zoomedImage.classList.add("topLeftTransition");
				self.zoomedImage.style.top = (htmlBounds.height - zoomedImageBounds.height) / 2 + "px";
				self.zoomedImage.style.left = (htmlBounds.width - zoomedImageBounds.width) / 2 + "px";

				setTimeout(function() {
					self.zoomedImage.classList.remove("topLeftTransition");
					resolve();
				}, 500);
			});
		}

		function centerImagePC() {
			console.log("centerImagePC");
			return new Promise(function(resolve) {
				self.zoomedImage.style.top = "50%";
				self.zoomedImage.style.left = "50%";
				self.zoomedImage.style.transform = "translate(-50%, -50%)";

				resolve();
			});
		}

		function extendPX() {
			console.log("extendPX");
			return new Promise(function(resolve) {
				self.zoomedImage.style.width = "";
				self.zoomedImage.style.height = "";

				const htmlBounds = document.getElementsByTagName("html")[0].getBoundingClientRect();

				self.zoomedImage.classList.add("maxWidthHeightTransition");
				self.zoomedImage.style.maxWidth = htmlBounds.width + "px";
				self.zoomedImage.style.maxHeight = htmlBounds.height + "px";

				setTimeout(function() {
					self.zoomedImage.classList.remove("maxWidthHeightTransition");
					resolve();
				}, 500);
			});
		}

		function extendPC() {
			console.log("extendPC");
			return new Promise(function(resolve) {
				self.zoomedImage.style.maxWidth = "";
				self.zoomedImage.style.maxWidth = "100%";
				self.zoomedImage.style.maxHeight = "";
				self.zoomedImage.style.maxHeight = "100%";

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
	},
	closeZoom(self) {
		console.log("close");
		const zoomBlurBackground = self.$el.querySelector(".zoom_blur_background");
        
		if (zoomBlurBackground.classList.contains("closeable")) {
			zoomBlurBackground.style.opacity = 0;

			setTimeout(function() {
				self.$el.classList.remove("zoom");
				zoomBlurBackground.style.display = "none";
			}, 400);
            
			console.log(self.zoomedImage.style);

			self.zoomedImage.removeAttribute("style");
			self.zoomedImage.style.display = "none";

			zoomBlurBackground.classList.remove("closeable");
            
			self.zoomedId = false;
		}
	},
};