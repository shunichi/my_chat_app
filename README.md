# README

## Getting Started

### Setup Google oauth2

1. Visit https://console.developers.google.com
2. Create project with Google+API enabled
3. Create oauth2 client id
4. Fill .env with your client id and secret
 
```
$ cp .env.sample .env
```

```
GOOGLE_CLIENT_ID=YOUR_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_SECRET
```

## Deploy to Heroku

```
$ heroku apps:create my-chat-app-xxxxx
$ heroku addons:create heroku-redis
$ heroku config:set HEROKU_URL=my-chat-app-xxxxx.herokuapp.com
$ heroku config:set GOOGLE_CLIENT_ID=YOUR_CLIENT_KEY
$ heroku config:set GOOGLE_CLIENT_SECRET=YOUR_SECRET
```
