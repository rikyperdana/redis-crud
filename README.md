# Redis CRUD
This is a CRUD (Create, Read, Update, Delete) built on top of ExpressJS + RedisDB.

## Preparation
```
git clone https://github.com/rikyperdana/redis-crud
npm install
```

## Start
`node server.js`

Get to http://localhost:3100

## How to Use
- Click 'Get Collection' button and fill the collection name as target
- Use 'Refresh' button to reload the collection from source
- Use 'Add' to insert a new object into the collection
- Double click a row to display the 'Update' and 'Delete' function
- Use Export button to get the csv of the loaded collection
- Use Import button to insert all the contents of the Exported csv

You can also use the REST API programmatically through browser console, like:
```
poster('dbCall', {
  method: 'get', collName: 'yourCollection'
}, res => console.log(res))
```

## Dependencies
### Server Side
- Express JS
- dotenv
- redis
### Client Side
- Lodash
- Mithril
- Bulma CSS
- SiftJS
- Papa Parse

## Screenshots
![screenshot](https://user-images.githubusercontent.com/11875540/83006693-d0d01080-a03c-11ea-9f84-441a94d3e01c.png)

