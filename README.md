# OBS Web tally

This app is PWA app for OBS tally. You need to run this app on mobile as static html file (not really usefull) or host this code on some HTML hosting, or on your localhost HTML server.

## Setup

In index.hml change the connection credentials

```
var currentState = {
    "socketServer": "localhost:4455",
    "syncProgram": false,
};
```

## Sync Program

If you want to see Program screenshot on you phone to know what is in progam every cut you can enable this (this can be enabled in app lately)
