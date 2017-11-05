## scripts
* ```"test": "jest --watch"```
* ```yarn test```
or
* ```"test": "jest"```
* ```yarn test -- --watch```

## packages
* yarn add jest react-test-renderer
* yarn add enzyme enzyme-adapter-react-16 raf enzyme-to-json
* yarn add redux-mock-store

## Setup Enzyme
* add enzyme and enzyme react 16 adapter
* add polyfill (browser feature) called request animation frame
* setup enzyme adapter
  * create file 'setupTests.js' under '<root>/src/test' folder
  * configure Enzyme.config() with 'react 16' adapter
* configure enzyme and polyfill with jest
  * create file 'jest.config.json' under '<root>' folder
  * provide 'setupFiles' with polyfill and enzyme setup file
* adjust the 'test' script in package.json to 'jest --config=jest.config.json --watch'
* add enzyme-to-json to cut out the extra details enzyme generates within __snapshots__ folder
  * update the 'jest.config.json' file to add 'snapshotSerializers: ["enzyme-to-json/serializer"]'

## Test Case Tricks
* setting up mocking for moment()
  * create folder '__mocks__' under 'test' folder
  * create 'moment.js' file for mocking
* TestSpies - to track function calls
  * create a spy function using 'const spyFn = jest.fn();'
  * pass this function as props to some React Component
  * test with 'expect(spyFn).toHaveBeenCalledWith({values...})'
* add --runInBand option to test script to run the tests in sequence written in file
