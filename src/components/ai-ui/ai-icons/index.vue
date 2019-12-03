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
		src: url(data:application/font-woff2;charset=utf-8;base64,d09GMgABAAAAAAP4AA0AAAAACVAAAAOiAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0ZGVE0cGh4GYACCXhEICocwhk4LFgABNgIkAyAEIAWDGwdtG+8HyB6F6caelcVmiIM4P0U8fNnM3u9u0YwkMx4wRkCYG6LRIXFMoN0qx0cQXWbw6cfcm3kTkx9n5qgmlncdzaQR645UOKr/f2xNbYFlHQApXafuCgiukhSTaiprKwxss/2p1g0ono1gJefthDGbcvcM5u3S1ti9EDB+2tIF1lV7zFAeO9DHbCQh9ISChJzfjdu1SA+kr3Ab2CT+sktwKLpiKsQDUf4o+fNNnzswIxoIPNWlAtm+MEbDKfZgH6bYF5WuJAlL/yibDCSc32TTz3NayEIFIGSiTWQgEhLtLxMU4KVCbGoKqMBMTCMOAeJTQKmZIERulpSinHN74ULavHzzvnCbaVOnBt53frjTjqwWu5MmJiA3RidPTnLrm04cj7maE376KbD2RiegyQD5huJAjCqfkTNOCrY24ZaVl5/89VE9GsXAzN/0wTwnKm80lpqfquGNE5FHk3W9U7V7XqTmhXrKTS9F5NGLVXXjvbOj/Xpv1b/x7plOuPvuKk6tCglsCMihk276MUY/VHHjd5rv67NRwYsxeqkO9fgLmuerGJbmhToGN70UOQsy9hgL3XedXQtfR6pTCu3P97AoTo6P02hvPv/178hfz55t0wHHJFUp1dGRlUtWq6oIIJAso6rmHWTQDhxV9TXD05Ohpq+ORiZwQQjiID3PKO8f/7P16ufDs9+HH3YY6SLofzbn6PW5DGyJeVesKbggTpJJ796iJsiJd7+jUEniL33x/2wvQfdl3pHTeOv3DNU5tONpW5YEle7x/dXW3R0/c5gwKaO4NSEjxiLWVVbLaiu2XG1BxfjiM8dAPzBC+FwqPnE38X+zNZxtHD1HOH2A8U6HJMkWIvw+Jpw2FEwf4sU8GOTw4pIlWN8kYbhMDb2wSbCrhlrWMUV+3icLlyw9W7Tv/926WFBRtPLnuUHXjA2LYFJR0im/NLQLIE4EIKGIax0oqmUrUDkPXeyqvYehVwUIHVMFSDq2FCDrOBAFFB2noICW2moU0NZxtwCV+X6QRekJQ0J0ws9FZ/yO6II/UtQy2zmitqGrr1rZ1cPOdezYwqULt3DupWvkLW6B46xs3DszcwMf7M2Dun3m1Z5k5catY7ZRayfb25FL+Wpk+x3bBXB4qvaO1sVWLnqRnbmzsiw/zzOto9pYS9jAxt28P3Sc2eK5xeWvLq4BifbwikhSZDlKtKIdnei2Lz57vjoirPuLYy8wuKyUz7sjfif8zvhd7LsCAAA=) format('woff2');
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
	.ai-icon-remove:before {
		content: "\e904";
	}
	.ai-icon-camera:before {
		content: "\e903";
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