Bug Reproduction

2 Errors

1. When i run `yarn dev` i get the following error

```
Error when evaluating SSR module /project/src/pages/index.vue:
TypeError: Cannot read property 'accept' of undefined
    at eval (/project/src/pages/index.vue:90:30)
    at ssrLoadModule (/project/node_modules/vite/dist/node/chunks/dep-18e0b415.js:67577:166)
    at async Module.clientRendering (/project/vite-setup/clientRendering.ts:8:14)
    at async serverRendering (/project/vite-setup/serverRendering.ts:6:14)
    at async /project/vite.config.js:59:30
```
It render the page in the browser, but the error its there.
Also i want to set components styles rendered in server and not in client.

2. When i run `yarn build` i get the following error 

```
Error during build: Identifier '_createVNode' has already been declared
```
It when second page start with `serverRendering` function

> if you comment 66-68 and 71 line it wil works `plugins/build-pages-plugin.js`.
