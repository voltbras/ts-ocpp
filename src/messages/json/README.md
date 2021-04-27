# json schemas

<https://github.com/bcherny/json-schema-to-typescript>

to generate typings from the json-schema files:

```bash
cd request
json2ts -i '*.json' > index.d.ts

cd ../response
json2ts -i '*.json' > index.d.ts

cd ..
# convert all strings that should have been a Date
sed -i 's/\(startTime?\?:\s\)string/\1Date | string/g' request/*.d.ts
sed -i 's/\(stopTime?\?:\s\)string/\1Date | string/g' request/*.d.ts
sed -i 's/\(timestamp?\?:\s\)string/\1Date | string/g' request/*.d.ts
sed -i 's/\(validFrom?\?:\s\)string/\1Date | string/g' request/*.d.ts
sed -i 's/\(validTo?\?:\s\)string/\1Date | string/g' request/*.d.ts
sed -i 's/\(startSchedule?\?:\s\)string/\1Date | string/g' request/*.d.ts
sed -i 's/\(expiryDate?\?:\s\)string/\1Date | string/g' request/*.d.ts
sed -i 's/\(retrieveDate?\?:\s\)string/\1Date | string/g' request/*.d.ts
sed -i 's/\(currentTime?\?:\s\)string/\1Date | string/g' request/*.d.ts
sed -i 's/\(scheduleStart?\?:\s\)string/\1Date | string/g' request/*.d.ts

sed -i 's/\(startTime?\?:\s\)string/\1Date/g' response/*.d.ts
sed -i 's/\(stopTime?\?:\s\)string/\1Date/g' response/*.d.ts
sed -i 's/\(timestamp?\?:\s\)string/\1Date/g' response/*.d.ts
sed -i 's/\(validFrom?\?:\s\)string/\1Date/g' response/*.d.ts
sed -i 's/\(validTo?\?:\s\)string/\1Date/g' response/*.d.ts
sed -i 's/\(startSchedule?\?:\s\)string/\1Date/g' response/*.d.ts
sed -i 's/\(expiryDate?\?:\s\)string/\1Date/g' response/*.d.ts
sed -i 's/\(retrieveDate?\?:\s\)string/\1Date/g' response/*.d.ts
sed -i 's/\(currentTime?\?:\s\)string/\1Date/g' response/*.d.ts
sed -i 's/\(scheduleStart?\?:\s\)string/\1Date/g' response/*.d.ts
```
