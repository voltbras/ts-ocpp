# wsdl typings

Clone `npm i wsdl-to-ts -g`, run:
- `wsdl-to-ts ocpp_xxxservice.wsdl`
- `sed -i 's/int;/number;/g' wsdl/xxxservice/xxx.ts`
- `sed -i 's/dateTime;/string;/g' wsdl/xxxservice/xxx.ts`
- `sed -i 's/anyURI;/string;/g' wsdl/xxxservice/xxx.ts`
- `sed -i 's/string>;/string;/g' wsdl/xxxservice/xxx.ts`
