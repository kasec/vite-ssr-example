import vuePlugin from '@vitejs/plugin-vue'

export default {
	build: {
		minify: false
	},
	plugins: [
		vuePlugin(),
	]
}