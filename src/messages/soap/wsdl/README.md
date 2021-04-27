# wsdl typings

Clone `npm i wsdl-to-ts -g`, run:
- `wsdl-to-ts ocpp_xxxservice.wsdl`
- `sed -i 's/int;/number;/g' wsdl/xxxservice/xxx.ts`
- `sed -i 's/dateTime;/string;/g' wsdl/xxxservice/xxx.ts`
- `sed -i 's/anyURI;/string;/g' wsdl/xxxservice/xxx.ts`
- `sed -i 's/string>;/string;/g' wsdl/xxxservice/xxx.ts`

```bash
# convert all strings that should have been a Date
sed -i 's/\(startTime?\?:\s\)string/\1Date/g' **/*.ts
sed -i 's/\(stopTime?\?:\s\)string/\1Date/g' **/*.ts
sed -i 's/\(timestamp?\?:\s\)string/\1Date/g' **/*.ts
sed -i 's/\(validFrom?\?:\s\)string/\1Date/g' **/*.ts
sed -i 's/\(validTo?\?:\s\)string/\1Date/g' **/*.ts
sed -i 's/\(startSchedule?\?:\s\)string/\1Date/g' **/*.ts
sed -i 's/\(expiryDate?\?:\s\)string/\1Date/g' **/*.ts
sed -i 's/\(retrieveDate?\?:\s\)string/\1Date/g' **/*.ts
sed -i 's/\(currentTime?\?:\s\)string/\1Date/g' **/*.ts
sed -i 's/\(scheduleStart?\?:\s\)string/\1Date/g' **/*.ts
```