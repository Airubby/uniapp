<template>
	<view :class="'ai-icon-' + type" :style="{ color: color, 'font-size': size + 'px' }" class="ai-icon" @click="_onClick" />
</template>

<script>
	export default {
		name: 'AiIcons',
		props: {
			type: {
				type: String,
				default: ''
			},
			color: {
				type: String,
				default: '#333333'
			},
			size: {
				type: [Number, String],
				default: 16
			}
		},
		methods: {
			_onClick() {
				this.$emit('click')
			}
		}
	}
</script>

<style>
	@font-face {
		font-family: 'aiicons';
		src: url(data:application/font-woff2;charset=utf-8;base64,d09GMgABAAAAAAKwAA0AAAAABzwAAAJaAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0ZGVE0cGh4GYACCXhEICoNEgy8LEgABNgIkAxwEIAWDDwdZGywGyJ6DcUPfLBERJWiDXKn7GzcwR6jkRPRrnz3v7d8AsQRyCA7QAqqUBwSPCoU6FZWLQyGvouOSWoO/n/cWCfxzFmmZDTiC0QyLNlqdlNYX+sTl+JfAnA2UiH5YY9pYwOHcGKadR2l/3ho6pmmAuSacesO2Qa8qsz+XbeaC0IMQ+P6KDPj9T/6T1w6GYyKKiEGiQUGtL/NAj/KyfMV9MD5/LI+cdCWjWa5DBkrt6/qsqwgFQTjPFtTTThdwgFAwXWMVhhqsKGL2QOn+dx10sE/S/Sf1UMVQAFFJSyqQggJ9M6EBXh/pOqPAYDAaQ3AVA4AGEEREVWqt7fTp3E/gtMPOUtE16N32vd+QIRf3fz6M8vbe14vBhT3PZ+R6K0ZwYUZbNtcj5OLuCanvsxdGzovt0Ojnd/2t+ydOROdK+6kANR77jD+dpnoa0ckgVHppCbFwXSPNZ1TnsyrDpxsNPi01rA21aT+NpT/+oT5fvvdbAt+P3h8gCOufP/1mlP2vTNko2c1Q++oFDFZAKLO4xkal+JXQNoDsBaCgkWvWcSMYbI0KCgAARnovIFojBRSDLBBQtVYKaLR2IKBnmFMIaLVuChhqqi+qNEPEcDqxGGmCWA23EGiQDWLPRPvF1nCn1xtqhQcOmpjoWVnCwZN8ZwO7DIwczHVs4e+2PrCz9kzuPgNbOxNeyFpqkSVUekOY9MZTEWzp5+6xjhtY3qHu2BvoZx9ywdp+IpawOhbV09kVNUA00ls9IY4AhT5uMClKqpomvbTt8fllPTZJD8uJEZiJDFiMRsTkNgMAAA==) format('woff2');
		font-weight: normal;
		font-style: normal;
	}
	.ai-icon {
		font-family: aiicons;
		font-weight: normal;
		font-style: normal;
		line-height: 1;
		display: inline-block;
		text-decoration: none;
		-webkit-font-smoothing: antialiased;
	}
	.ai-icon-empty:before {
		content: "\e902";
	}
	.ai-icon-arrowRight:before {
		content: "\e900";
	}
	.ai-icon-check:before {
		content: "\e901";
	}
</style>