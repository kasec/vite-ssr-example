import { parse, resolve } from 'path'
import fs from 'fs-extra'
import matched from 'matched'
import vite from 'vite'

const document = `
	<div id="app"><!--html-placeholder--></div>
	<!--js-placeholder-->
`
const script = (path) => `
<script type="module">
	import { createSSRApp } from 'vue'
	import App from "${path}"

	createSSRApp(App).mount('#app')
</script>
`

export default () => {
	return {
        name: "build-pages-plugin",
		apply: 'build',
		options(opts) {
			let inputOptions = {}
			const pattern = ["src/pages/**/*.vue"]

			const staticPaths = matched.sync(['**/**.html', "!dist/**/**.html"], { realpath: true })

			staticPaths.forEach(staticFile => {
				fs.rmSync(staticFile)
			})

			const files = matched.sync(pattern, { realpath: true })

			files.forEach(filePath => {
				const pathObject = parse(filePath)

				const dirname = pathObject.dir.replace(/.*(\/*)src\/pages(\/*)/, "") // get the parent dir if it is not a pages and if it does not exist I have to create

				if(dirname && !! fs.existsSync(dirname) === false) fs.ensureDirSync(dirname);

				const newFile = dirname ?  dirname + '/' + pathObject.name + '.html' : pathObject.name + '.html'  

				inputOptions = { ...inputOptions, [pathObject.name]: newFile }

				const writeStream = fs.createWriteStream(newFile)
				writeStream.write(document.replace(/<!--js-placeholder-->/, script(filePath.replace(/.*\/src/, "/src"))))
				writeStream.end()
			});

			const newOptions = {
				...opts,
				input: inputOptions
			}

			return newOptions
		},
		async transformIndexHtml(html, { path }) {

			const fileName = path.replace(/.html$/, '.vue').replace(/^\//, "")

			const filePath = resolve(__dirname, "src/pages", fileName)


			//if you comment 66-68 and 71 line it wil works.
			
			const server = await vite.createServer()
			const { serverRendering } = await server.ssrLoadModule('vite-setup/serverRendering.ts')
			const htmlString = await serverRendering(filePath)

			const htmlFinal = html
				.replace(/<!--html-placeholder-->/, htmlString)
			
			return htmlFinal
		},
		closeBundle() {
			const staticPaths = matched.sync(['**/**.html', "!dist/**/**.html"], { realpath: true })

			staticPaths.forEach(staticFile => {
				fs.rmSync(staticFile)
			})
			
			return 
		}
	}
}