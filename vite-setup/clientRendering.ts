// import VueApp from './App.vue'
import { createSSRApp } from 'vue'

/*
* Vue url component 
*/
export async function clientRendering(url: string) {
  const app = await import(url);

  return createSSRApp(app)
}