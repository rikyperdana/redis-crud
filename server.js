var dotenv = require('dotenv').config(),
express = require('express'),
bodyParser = require('body-parser'),
redis = require('redis').createClient(),
{parse, stringify} = JSON,
withThis = (obj, cb) => cb(obj)

express()
.use(bodyParser.json({limit: '50mb'}))
.use(express.json())
.use(express.static('public'))
.post('/dbCall', (req, res) => withThis(
  {
    coll: req.body.collName,
    responder: (err, data) => res.send(stringify({data})),
  },
  ({coll, responder}) => ({
    get: () => redis.lrange(
      req.body.collName, 0, -1,
      (err, data) => res.send(stringify({data: data.map(parse)}))
    ),
    add: () => redis.rpush(
      coll, stringify(req.body.doc), responder
    ),
    remove: () => redis.lrange(
      coll, 0, -1, (err, data) => data.forEach(
        i => parse(i)._id === req.body._id && redis.lrem(
          coll, 0, i, responder
        )
      )
    ),
    update: () => redis.lrange(
      coll, 0, -1, (err, data) => redis.lrem(
        coll, 0, data.find(i => parse(i)._id === req.body.doc._id),
        (err, done) => done && redis.rpush(
          coll, stringify(req.body.doc), responder
        )
      )
    ),
    insertMany: () => redis.rpush(
      coll, ...req.body.documents.map(stringify),
      responder
    ),
    deleteMany: () => redis.del(coll, responder)
  })[req.body.method]()
))
.listen(process.env.PORT || 3000)
