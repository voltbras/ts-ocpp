# json schemas

Install `json-schema-to-typescript` using Yarn or NPM:
- `yarn global add json-schema-to-typescript`
- `npm i -g json-schema-to-typescript`

To generate typings from the json-schema files, run:

```bash
cd request
json2ts -i '*.json' > index.d.ts

cd ../response
json2ts -i '*.json' > index.d.ts
```