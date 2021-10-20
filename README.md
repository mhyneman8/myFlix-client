
# myFlix
## Client-Side

This site uses React to build the client-side for a RESTful API movie database.

## Authors

- [@MalloryHyneman](https://www.github.com/mhyneman8)

  
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


## Deployment

To deploy this project visit https://myflix-mh.netlify.app/

  
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


  
