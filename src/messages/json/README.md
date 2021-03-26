# json schemas

to generate typings from the json-schema files:

```bash
cd request
json2ts -i '*.json' > index.d.ts

cd ../response
json2ts -i '*.json' > index.d.ts
```