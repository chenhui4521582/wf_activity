<template>
	<div class="wrapper" ref="wrapper">
		<slot></slot>
	</div>
</template>
<script type="text/javascript">
	import BScroll from 'better-scroll'
	export default {
		props: {
	      probeType: {
	        type: Number,
	        default: 1
	      },
	      click: {
	        type: Boolean,
	        default: true
	      },
	      listenScroll: {
	        type: Boolean,
	        default: false
	      },
	      data: {
	        default: null
	      },
	      pullup: {
	        type: Boolean,
	        default: false
	      },
	      beforeScroll: {
	        type: Boolean,
	        default: false
	      },
	      refreshDelay: {
	        type: Number,
	        default: 20
	      },
	      scrollX: {
	      	type: Boolean,
	      	default: false
	      },
	      scrollY: {
	      	type: Boolean,
	      	default: true
	      },
        scrollbar: {
          type: Boolean,
          default: false
        }
	    },
		mounted() {
			var that = this;
			setTimeout(() => {
				that._initScroll();
			}, 20)
		},
		methods: {
			_initScroll() {
				// 避免出现报错
        let me = this
				if(!this.$refs.wrapper) {
					return
				}
				this.scroll = new BScroll(this.$refs.wrapper, {
					scrollY: this.scrollY,
	          		scrollX: this.scrollX,
					probeType: this.probeType,
					click: this.click,
          scrollbar: this.scrollbar
				})
				if (this.listenScroll) {
					this.scroll.on('scroll', (pos) => {
						me.$emit('scroll', pos)
					})
				}
				if (this.beforeScroll) {
					this.scroll.on('beforeScrollStart', () => {
						this.$emit('beforeScroll')
					})
				}
        this.scroll.on('touchend', (pos) => {
          this.$emit('scrolltouchend', pos,this.scroll.maxScrollY)
        })
			},
			enable() {
				this.scroll && this.scroll.enable()
			},
			disable() {
				this.scroll && this.scroll.disable();
			},
			refresh() {
			  console.log('222')
				this.scroll && this.scroll.refresh();
			},
			scrollTo() {
		        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
		    },
		    scrollToElement() {
		        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
		    }
		},
		watch: {
			data() {
			  console.log('data')
				setTimeout(() => {
		          this.refresh()
		        }, this.refreshDelay)
			}
		}
	}
</script>
<style type="text/css" >
	.wrapper {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		overflow: hidden;
	}
</style>
