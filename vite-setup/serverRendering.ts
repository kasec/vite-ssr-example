import { renderToString } from '@vue/server-renderer'
import { clientRendering } from './clientRendering'

export async function serverRendering(url: string) {
  const ctx = {}
  const app = await clientRendering(url)
  const html = await renderToString(app, ctx)
  
  console.log({ctx});
  
  return html
}