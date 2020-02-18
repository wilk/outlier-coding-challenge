# Outlier coding challenge
Follow these instructions to run this coding challenge.

## Clone the repo
First, clone the repo:

```
$ git clone git@github.com:wilk/outlier-coding-challenge.git
```

## Setup the environment file
Copy the `.env.sample` into a `.env` file and fill it with your data.

## Setup and run the database
Use `docker-compose` to setup and run the database:

```
$ docker-compose up postgres
```

Wait the following log:

```
> database system is ready to accept connections
```

## Import the data
In another tab, run the following command to import the CSVs:

```
$ docker-compose run etl
```

## Building the container
If you need to build the container alone, use the following command:

```
$ docker build -t etl:1.0.0 .
```

## Deployment on Heroku
Setup `heroku` first:

```
$ heroku container:login 
$ heroku create
```

Then add the postgres addon on the heroku dashboard and configure the environment variables.
Now, publish the docker image on the heroku hub and release the container:

```
$ heroku container:push web
$ heroku container:release web
```

The database is now filled with all the CSVs.
