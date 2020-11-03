ping-observer
=============
Simple PING monitoring based on [url-monitor](https://www.npmjs.com/package/url-monitor)

## Installation
```
npm install ping-observer
```

## How to
```javascript
let pingObserver = require('ping-observer');

let host = new pingObserver({
	host:'google.com', 
	interval: 5000,
	timeout: 10
});

host.on('available', (data) => {
	console.log(data);
})

host.on('unavailable', (data) => {
	console.log(data);
	host.stop();
})

host.start();
```

### Options
```javascript
{
	host:'google.com', // Required
	interval: 5000, // Time interval in ms, default to 5000
	timeout: 3000  // Timeout in seconds, default to 3000
}
```

### Events
- `available` - Host is up.
- `unavailable` - Host not working.

### Responses on events
```javascript
{ alive: true, host: 'google.com', time: 26 }
{ alive: false, host: 'google.com', time: 'Unknown' }
```

## Updates
- `v1.0.0 :` Initial release

## Licence
The MIT License (MIT) 
Copyright (c) 2020 Andre Timm
