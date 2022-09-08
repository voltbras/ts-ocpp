# wsdl typings

Install `wsdl-to-ts` using Yarn or NPM:
- `yarn global add wsdl-to-ts`
- `npm i -g wsdl-to-ts`

To generate typings from the soap-schema files, run:

```bash
wsdl-to-ts ocpp_xxxservice.wsdl
sed -i '' 's/int;/number;/g' wsdl/xxxservice/xxx.ts
sed -i '' 's/dateTime;/string;/g' wsdl/xxxservice/xxx.ts
sed -i '' 's/anyURI;/string;/g' wsdl/xxxservice/xxx.ts
sed -i '' 's/string>;/string;/g' wsdl/xxxservice/xxx.ts
```
