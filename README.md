# Foodies
## _Visit the restaurant we love_

![Screen Shot 2021-12-10 at 17 49 22](https://user-images.githubusercontent.com/43133690/145553978-0aec9300-5088-44b0-83e1-0b4390ea23c2.png)


Foodies is a web app built with Express.js and Node.js that allows you to share and operate restaurants information.


## Features

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

3. Install all dependencies
```
npm install
```

4. Install nodemon package
```
npm install -g nodemon
```

5. Run the data seeder to create initial data by using below npm script, if successful, `MongoDB Connected` will show in the terminal.
```
npm run seed

```

6. Run the server on localhost using below npm script, if successful, `Server Started` will show in the terminal.
```
npm run dev
```

## Contributor
> [Richard Widjaya](https://github.com/ricwidjaya)
