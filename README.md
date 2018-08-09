# Algolia Movie Catalog

A movie catalog powered by [Algolia](https://www.algolia.com/) search, with the ability to search through all the movies, add a new movie, and delete a movie. It's made from the point of view of an admin interface to manage movies.  
The application is composed of multiple docker containers housing a `Ruby on Rails` API application, a `React` frontend application, a `Mongo` data store, and an `Nginx` reverse proxy server managing requests between the `Rails` & `React` applications.

## Setup instructions

- Install [Docker](https://store.docker.com/editions/community/docker-ce-desktop-mac)
- Clone this repository
- Create `frontend/.env` and `backend/.env` environment files with your Algolia API keys (refer to `frontend/.env.sample` and `backend/.env.sample`)
- Run the setup script  
  `./setup.sh`

The setup script will take care of checking for the `.env` files, pulling Docker images, running the containers, and importing the initial dataset.

In addition to the setup script, another convenience script has been provided:
- `helpers/runTests.sh`  
  Runs the `Rspec` test suite for the backend application.

## Application design

The app is structured in the form of 5 docker containers:
- **`backend` container**  
  Contains a `Ruby on Rails` based API application. It is responsible for responding to API calls, and synching changes with `Algolia`.
- **`frontend` container**  
  Contains a `React` application, which communicates with the `backend` API for updating data, and Algolia API for searching.
- **`mongo` container**  
  Contains a `MongoDB` instance, which is used for storing all the data.
- **`nginx` container**  
  Contains the `Nginx` reverse proxy server. It proxies all the API requests (`/api/*`) to the `backend` container and routes all other requests to the `frontend` container.
- **`mongo-express` container**  
  Contains the web based `MongoDB` admin interface. This lets us easily browse our `MongoDB` instance.

While it is possible to embed `React` inside `Ruby on Rails`, for this application, `frontend` and `backend` are kept entirely separate from each other.  
This helps in facilitating a clear API which can then be utilised for other clients like mobile apps. It also has the benefit of more flexibility with respect to the `React` application. The disadvantage of managing another standalone app isn't much as `Docker` takes care of a lot of complexity for us.

The `backend`, `frontend` and `Nginx` containers are described in more detail below.

## Backend

It is a `Ruby on Rails` application, generated with the `--api` and `--skip-active-record` flags.  
```
rails new backend --api --skip-active-record
```
This creates an application without the view logic of Rails, and instead focuses on serving JSON resouces to API clients. It also skips the active record integration, which will be replaced by the `Mongoid` ODM since we're using `MongoDB` as the data store.

### Testing

`RSpec` is used for testing the application, utilising Test Driven Development (`TDD`) and Behaviour Driven Development (`BDD`). `RSpec` allows us to write verbose, self descriptive tests with clear behaviour.

Two kinds of tests have been written for this application:
- Specs for the model  
  These define model characteristics, and are situated at `/backend/spec/models`.
- Specs for the API requests  
  Instead of testing the controller directly, we rely on Request specs to do an integration test of the whole stack, including the routing. It is also the [official recommendation](http://rspec.info/blog/2016/07/rspec-3-5-has-been-released/) of the Rails and RSpec teams.  
  The specs are located at `/backend/spec/requests`.

The Request specs are run against a test database as defined in `/backend/config/mongoid.yml`. There's no need to explicitly create this database as `MongoDB` creates databases on demand.

### API endpoints

The following endpoints have been implemented:

Name         | Method | URI                  | Info
-------------|--------|----------------------|---------------------
Create movie | POST   | `/api/v1/movies`     | Creates a new movie
Delete movie | DELETE | `/api/v1/movies/:id` | Deletes a movie

The responses are provided in the form of JSON with a `Content-Type` of `application/json`.

#### Create movie
`POST` `/api/v1/movies`  
Expects a `Content-Type` of `multipart/form-data`, so that we can accept an image along with the other `POST` data.

Required parameters:
- `title` : `String` Name of the movie
- `year` : `Integer` Year of release, >= 1906
- `rating` : `Integer` Rating on a scale of 1 to 5 (inclusive)
- `genre` : `String` A comma separated list of genres

Optional parameters:
- `actors` : `String` A comma separated list of actors' names
- `alternative_titles` : `String` A comma separated list of any alternative titles
- `uploaded_image` : `Image` Poster for the movie - jpg, jpeg, gif & png files are accepted

Sample response:
```
HTTP 201 Created

{
  "_id": {
    "$oid": "5b69db2b48f028000197404c"
  },
  "title": "Serenity",
  "actors": [
    "Nathan Fillion",
    "Alan Tyduk",
    "Morena Baccarin"
  ],
  "genre": [
    "Action",
    "Adventure"
  ],
  "rating": 4,
  "year": 2005,
  "uploaded_image": {
    "url": "image_url_here"
  },
  "created_at": "2018-08-07T17:47:23.856Z",
  "updated_at": "2018-08-07T17:47:23.856Z"
}
```

#### Delete movie
`DELETE` `/api/v1/movies:id`

Sample response:
```
HTTP 204 No Content
```

### Algolia index configuration
The Algolia index has been configured within the model `/backend/app/models/movie.rb`.  
Searchable attributes, attributes for faceting, attributes to highlight, unretrievable attributes, and custom ranking have all been defined in code, instead of relying on the web interface of Algolia to make these changes. This has been done to ensure interoperability between different Algolia accounts.

### Gems used
Keeping `DRY` in mind, a few Gems were used to facilitate development. The major ones include:
- **[Algolia Search - Rails](https://github.com/algolia/algoliasearch-rails)**  
  Algolia provides excellent search capabilities to be baked right into any application. We use it to power our search of movies, which is the most important interaction of this application.
- **[Mongoid](https://github.com/mongodb/mongoid)**  
  `Mongoid` provides an excellent Object Document Mapper (ODM) framework for our choice of data store - `MongoDB`.
- **[Kaminari Mongoid](https://github.com/kaminari/kaminari-mongoid)**  
  Drop in utility for pagination. The `Mongoid` adapter for `Kaminari` was used.
- **[CarrierWave for Mongoid](https://github.com/carrierwaveuploader/carrierwave-mongoid)**  
  CarrierWave allows a very simple image upload solution to be used. The `Mongoid` flavour was used for our purposes.
- **[Dotenv](https://github.com/bkeepers/dotenv)**  
  It is a good idea to set configuration through the environment variables. For development, Dotenv makes it easy to load variables from an environment file.
- **[RSpec Rails](https://github.com/rspec/rspec-rails)**  
  RSpec was the test suite of choice. To facilitate writing specs, [Database Cleaner](https://github.com/DatabaseCleaner/database_cleaner), [Factory Bot](https://github.com/thoughtbot/factory_bot_rails), and [Faker](https://github.com/stympy/faker) were also used.

## Frontend

It is a `React` application, generated using the simple and minimalistic starter [Create React App](https://github.com/facebook/create-react-app).  

To make development easier, two more functionalities were added:
- **Hot reloading**  
  [React hot loader](https://github.com/gaearon/react-hot-loader) was added with the help of [react-app-rewired](https://github.com/timarney/react-app-rewired) and [react-app-rewire-hot-loader](https://github.com/cdharris/react-app-rewire-hot-loader).
- **SCSS/SASS support**  
  To make writing CSS easier, a SCSS/SASS preprocessor was added in the form of [node-sass-chokidar](https://github.com/michaelwayman/node-sass-chokidar).

### Application design

The components in the `React` app are divided into **presentational** (`/frontend/src/presentaion`) and **container** (`/frontend/src/container`) components to maintain a clear separation of concerns. The presentational components worry about how things look, while the container components are concered about how things work.  
More can be read about this methodology in [this post](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) by Dan Abramov.

The three main data providers (API, search and state) are located in their own directory (`/frontend/src/dataProviders`).  
A few constants (`frontend/src/constants`) and utility functions (`frontend/src/utils`) have also been separated out.

### User interface

As this app is made as an admin interface, it deals with 3 primary functions:
- Searching for a movie
- Adding a new movie
- Deleting a movie

Search is front and centre as it's our primary method of discovery. Unlike other forms of search (for example, Amazon) where filters are reset when the search query changes, this app maintains the currently selected filters. To communicate this to the user, filters have been brought up to be at the same visual hierarchy level as the search bar.

The "Add Movie" button is present in the header as a separate action, while the "Delete movie" button only reveals itself when a movie is hovered upon. This minimises the chances of accidently deleting a movie.

### State management

In lieu of going with something along the lines of `Redux`, this application uses the URL query parameters for state management. Since our primary state is going to revolve only around the search query and selected filters, using the URL reduces complexity and also allows shareable links to be generated.

[React URL Query](https://github.com/pbeshai/react-url-query) was used to facilitate the serialising & deserialising of parameters. It is inspired by `Redux`, in that we get equivalent methods to `mapStateToProps` and `mapDispatchToProps`, which makes development easier.

### Packages used
The major `npm` packages used were:
- **[Algolia Search](https://github.com/algolia/algoliasearch-client-javascript)**  
  The JavaScript client of Algolia was used to power search on the frontend. This client was used instead of the [React InstantSearch](https://github.com/algolia/react-instantsearch) library to facilitate building completely custom UI components, and to implement everything from scratch.
- **[React URL Query](https://github.com/pbeshai/react-url-query)**  
  Used to manage state through URL query parameters.
- **[Axios](https://github.com/axios/axios)**  
  The popular promise based HTTP client was used for making requests to the `backend` container.
- **[Bulma](https://github.com/jgthms/bulma)**  
  The opinionated CSS framework was used for styling this application as it provides a wide variety of baked-in UI components, with easy customisability.
- **[React Helmet](https://github.com/nfl/react-helmet)**  
  Used for easy manipulation of the document `<head>` attributes.

## Storage

Since we're dealing with movies which are completely independent of each other, a `NoSQL` fit our use case perfectly. Based on our initial data set, each movie was stored as an independent `document`.  
`MongoDB` brings in a lot of performance benefits & scalability when dealing with large volumes of data, and also has good interoperability with our backend of choice - `Ruby on Rails`.

The initial dataset is present in `/mongo/seed_data/movies.json`, and is mounted to the `mongo` container by `docker-compose.yml`. It is then imported by the `./setup.sh` script using the `mongoimport` tool.

## Improvements

Before this application is ready for production, a few improvements are desireable:
- **Authentication**  
  It's necessary for most applications dealing with data to be behind a layer of authentication.  
  One possible technique would be using **Json Web Tokens (JWT)**. It allows the server to remain completely stateless - unlike other authentication methods, there's no need to store user sessions in any form on the server. Since it relies on a single key for encryption and decryption of tokens, the authentication remains fast and lightweight regardless of the number of users logged in.
- **Frontend improvements**  
  Tests should be introduced for the frontend application as well, possibly using `JestJS`. In addition, stateless components should extend `React.PureComponent`, instead of `React.Component`.
- **Frontend UI improvements**  
  The size of each movie row can be reduced to fit more movies on the page. This will improve the overall UX of the application.

---

Thank you for reading.  
Feedback is always welcome!
