To build the toc:

`node buildToc.mjs`

It is possible to get a 'filelist' using a code like:

```js
const { fileListFromWebservice } = require("filelist-utils");
const filelist = fileListFromWebservice(
  "https://zakodium-oss.github.io/analysis-dataset/full.json"
);
```
