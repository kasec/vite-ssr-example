import vuePlugin from '@vitejs/plugin-vue'
import serveHtml from './plugins/serve-html-plugin'
import buildPagesPlugin from './plugins/build-pages-plugin.js'


export default {
	build: {
		minify: false
	},
	plugins: [
		vuePlugin(),
		serveHtml(),
		buildPagesPlugin()
	]
}