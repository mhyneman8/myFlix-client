
# myFlix
## Client-Side

myFlix-client uses React to build a fontend single page for the client side of myFlix app. It provides users with information on their favorite movies, like director, and genre. Users can also add and delete movies from their favorites list.

User Authentication is with a JWT-based and basic HTTP authentications.

## Authors

- [@MalloryHyneman](https://www.github.com/mhyneman8)


## Live Page

https://myflix-mh.netlify.app/
  
## API Reference

To build the project in the terminal run: 

parcel src/index.html
or
npm start

```http
  GET /myflix788.herokuapp.com/movies
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `none` | `JSON` | Returns a list of All movies to the user |

#### Get item

```http
  GET /myflix788.herokuapp.com/movies/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |



  ## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Primary Color | ![#75b8c8](https://via.placeholder.com/10/75b8c8?text=+) #75b8c8 |
| Secondary Color | ![#260c1a](https://via.placeholder.com/10/260c1a?text=+) #260c1a |
| Tertiary Color | ![#fa824c](https://via.placeholder.com/10/fa824c?text=+) #fa824c |


## View

To view this project visit https://myflix-mh.netlify.app/

## Deployment
To deploy this project:

Clone this repository
git clone https://github.com/mhyneman8/myFlix-client.git

Go to root directory

Install dependencies
npm install


Run parcel src/index.html

Open app page, http://localhost:1234/
  
## Features

### Main View

- Returns list of all movies to user 
- Sorts and filters movies
- Able to select a movie for more details

### Single Movie View
- Returns data about a single movie to user
- Allows user to add a movie to their favorites

### Login View
- Allows users to log in with a username and password
- Move to Registration view if needed

### Registration View
- Allows new users to register

### Genre View
- Returns data about a genre
- displays example movies

### Director View
- Returns data about a Director
- Displays example movies

### Profile View
- Allows users to update their information
- Allows users to deregister
- Displays favorite movies
- Allows users to remove a movie from their favorites

  
## Tech Stack

**Client:** React, React Redux, Bootstrap, Parcel

**Server:** Node

  
## Dependencies
- Babel
- Axios
- Bootstrap
- Parcel
- Prop-Types
- React
- React-Bootstrap
- React-DOM
- React-Redux
- React-Router-DOM
- Redux
- Redux-Devtools-Extension

## DevDependencies:

parcel/transformer-sass


## API Used:

Hosted on Heroku App
[API documentation](https://mhyneman8.github.io/movie_api/)
