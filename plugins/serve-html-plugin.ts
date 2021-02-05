import { resolve } from 'path'
import { ViteDevServer } from 'vite'

const document = `
	<div id="app"><!--html-placeholder--></div>
	<!--js-placeholder-->
`

const script = (path: string) => `
<script type="module">
	import { clientRendering } from '/vite-setup/clientRendering.ts'

	clientRendering('${path}').then((component) => {
		console.log({ component })
		component.mount("#app")
	})
</script>
`

export default () => {
	return {
        name: 'serve-custom-html',
        apply: 'serve',
		configureServer(server: ViteDevServer) {
			server.middlewares.use(async (req, res, next) => {
				
				const url = req.originalUrl as string
				
				if(url === '/' || url.endsWith(".html")) {
					const file = url === '/' ? 'index.vue' : url.replace(/.html/, ".vue").replace(/^\/*/,"")
					const filePath = resolve(__dirname, 'src/pages', file)

					const html = await server.transformIndexHtml(url, document)
					
					const { serverRendering } = await server.ssrLoadModule('/vite-setup/serverRendering.ts')

					const htmlString = await serverRendering(filePath)

					const htmlFinal = html
					.replace(/<!--html-placeholder-->/, htmlString)
					.replace(/<!--js-placeholder-->/, script(filePath))
					
					return res.end(htmlFinal)
				}

				next()
			})
		},
	}
}