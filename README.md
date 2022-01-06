# Foodies
## _Visit and Share the restaurant we love_

<img width="1437" alt="Screen Shot 2022-01-06 at 16 17 04" src="https://user-images.githubusercontent.com/43133690/148352606-96aeb45e-3505-4587-99e2-1f097fb32710.png">


![Screen Shot 2021-12-11 at 19 55 44](https://user-images.githubusercontent.com/43133690/145675618-0368b65d-c35d-4a17-8d9a-a4a428bef9e4.png)


Foodies is a web app built with Express.js and Node.js that allows you to share and operate restaurants information.


## Features

-  User can register and login as user, through email, Facebook and Google.
-  User can view, create, edit, delete restaurant list.
-  Live Search - Users can search for specific restaurant by name or category without browser refresh.
-  User can can view and create map through Google Map API only with address.

## Getting Start

### Environment Setup
1. [Node.js](https://nodejs.org/en/) v16 LTS
2. [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/) v4.2.17

### Installing

1. Open your terminal and clone the project to local.
```
git clone https://github.com/ricwidjaya/restaurant_list.git
```

2. Change directory to the project
```
cd restaurant_list
```

3. Install all packages/dependencies
```
npm install
```

4. Install nodemon package for dev mode
```
npm install -g nodemon
```

5. Run the data seeder to create initial data by using below npm script, if successful, `MongoDB Connected` will show in the terminal. (It will show twice, once for creating users, once for creating restaurants data.)
```
npm run seed

```

6. Please reference the `.env.example` document to know what environment variables you'll need for a fully functional project experience. You'll need the following API services:
- [Google Map API](https://console.cloud.google.com/)
- [Google OAuth2.0 Login](https://console.cloud.google.com/)
- [Facebook Login](https://developers.facebook.com/)

7. Run the server on localhost using below npm script, if successful, `Server Started` will show in the terminal.
```
npm run dev
```

## Contributor
> [Richard Widjaya](https://github.com/ricwidjaya)
