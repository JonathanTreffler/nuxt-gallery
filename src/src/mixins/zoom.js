export default {
	methods: {
		getAnimationClass() {
			if(typeof this.zoomAnimation === "string") {
				return import("../zoom-animations/" + this.zoomAnimation);
			} else {
				return this.zoomAnimation;
			}
		},
		zoom(id) {
			let self = this;
			this.getAnimationClass().then(function(animation) {
				animation.default.zoom(id, self);
			});
		},
		closeZoom() {
			let self = this;
			this.getAnimationClass().then(function(animation) {
				animation.default.closeZoom(self);
			});
		},
	},
};