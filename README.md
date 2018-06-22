<p align="center"><a href="https://appyapp.io" target="_blank" rel="noopener noreferrer"><img width="262" height="295" src="https://user-images.githubusercontent.com/12631935/39099920-eaab3d3e-4636-11e8-9955-b53be05e1c13.png" alt="appy logo"></a></p>

**appy** is a full featured boilerplate web app designed as an end to end solution for mvp development. The front end is built on [Vue.js](https://vuejs.org) and utilizes the [AdminLTE](https://almsaeedstudio.com) UI template. The backend implements a hapi server (via [rest-hapi](https://github.com/JKHeadley/rest-hapi)) with a MongoDB datastore. 

![appy-dashboard](https://user-images.githubusercontent.com/12631935/39155220-f691c77e-4705-11e8-9b83-2129a07c6d35.png)

Just want an API server? Try [appy-backend](https://github.com/JKHeadley/appy-backend)

**Live Demo**: https://appyapp.io/#live_demo

## Requirements

Just [Docker](https://docs.docker.com/install)

**OR**

You need [Node.js](https://nodejs.org/en/) installed (>=8.10.0) and you'll need [MongoDB](https://docs.mongodb.com/manual/installation/) installed and running.


## Getting Started

Download from GitHub:

```bash
$ git clone https://github.com/JKHeadley/appy.git
$ cd appy
```

## Using Docker

> **NOTE**: Docker commands might take some time on the first build. After the first build they should be relatively quick.

First seed the db with data (only required once):

```bash
$ docker-compose build && docker-compose run --rm api npm run seed
```

Once seeding is done, run the app:

```bash
$ docker-compose up --build
```

Point your browser to http://localhost:3000/ to view the app, http://localhost:8080/ to view the swagger docs, or click on one of the test accounts below to login:

> **NOTE**: Password for all seed users is `root`.

**<a href="http://localhost:3000/login?email=test@user.com&password=root" target="_blank">User</a>**

**<a href="http://localhost:3000/login?email=test@admin.com&password=root" target="_blank">Admin</a>**

**<a href="http://localhost:3000/login?email=test@superadmin.com&password=root" target="_blank">Super Admin</a>**


...that's it, have fun!

## Without Docker

Install dependencies:

#### Backend

``` bash
$ cd backend
$ npm install
```

#### Frontend

``` bash
$ cd frontend
$ npm install
```

### Backend Configuration
Rename `.env-sample` to `.env`. Update values as needed. **Never commit .env to your repo**

Also, update values in `config.js` as needed.

### First time setup
**WARNING**: This will clear all data in the MongoDB database defined in ``restHapiConfig.mongo.URI`` (default ``mongodb://localhost/appy``).

To seed your database with some data, run:

```
$ npm run seed
```

> **NOTE**: The password for all seed users is ``root``.

### Running appy

#### Backend

``` bash
$ npm run start
```

Point your browser to http://localhost:8080/ to view the Swagger docs.

#### Frontend

``` bash
$ npm run start
```

Point your browser to http://localhost:3000/ to view the app, or click on one of the test accounts below to login:

**<a href="http://localhost:3000/login?email=test@user.com&password=root" target="_blank">User</a>**

**<a href="http://localhost:3000/login?email=test@admin.com&password=root" target="_blank">Admin</a>**

**<a href="http://localhost:3000/login?email=test@superadmin.com&password=root" target="_blank">Super Admin</a>**



License
-------
appy is an open source project by [Justin Headley](http://justinheadley.com) that is licensed under [MIT](http://opensource.org/licenses/MIT).

**This project is undergoing a major update. Complete README and docs coming soon.**

