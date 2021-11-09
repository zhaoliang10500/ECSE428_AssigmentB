# ECSE428_AssigmentB

## Instructions

How to install and launch the application:

1. Install Node.js, which should come with NPM
2. Run `npm i` to install the dependencies
3. Run `npm test` to run the unit tests. `npm test-coverage` for a more comprehensive report.
4. Run `npm start` to run the backend locally.
5. Send a POST request to `localhost:8080/ramp` with JSON body with keys `length`, `width`, and `height` through something like Postman or Insomnia. Example JSON request payload:

```
{
	"length": 200,
	"width": 156,
	"weight": 10
}
```

## More Info

Language: Javascript

Backend Framework: Express.js

Testing Framework: Jest

`index.js`: run backend

`ramp.js`: function for the API

`ramp.test.js`: unit tests

[Project report Google Doc (if it's still there)](https://docs.google.com/document/d/12CcCg_y3yn3GH-4OErn_LiZtnGwXMYy0ABhMl-Mm4Zk)

## Take Note

- Only accepts abbreviations for units (e.g. mm not milimeter)
- if request payload has an unrecognized JSON key, that key will be ignored (but no error from that)
- payload values have to be the right type (e.g. for length, 200 is fine but not "200")
- request params, aka query strings in the URL, will be ignored (but no error from that)
- for devs: use the same conversion decimal places for code and test
