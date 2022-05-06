# 

## Setup

1. Install the appropriate dependencies

From this root folder, run:

> npm install

This script will install dependencies for both `app/backend` and `app/frontend`.


4. Create a Reddit app [here](https://ssl.reddit.com/prefs/apps/)


5. Create a file /backend/reddit_creds.json of the form

```
{
  "username": "[username]",
  "password": "[password]",
  "appId":    "[appId]",
  "appSecret": "[appSecret]"
}
```

[Note: We have included default reddit credentials user for your own ease. Thus if you are grading this project steps 4 and 5 are not necessary]
## Run

1. Run the application
> npm start

This command will spawn the `app/backend` server and initialize the frontend in `app/frontend`

2. Open the application in an url or using an Endpoint tester (postman)

> http://localhost:3000

## Testing

To run the test suites go to `/frontend/` and run `npm run test`

Similarly, go to `/backend` and run `npm run test` to run the test suite for the backend.