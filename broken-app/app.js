const express = require('express');
const axios = require('axios');
const app = express();
const ExpressError = require('./ExpressError')

app.use(express.json())

const devData = []
app.get('/', function(req, res, next) {
  try {
    return res.json(devData)
  } catch (err) {
    next(err)
  }
})

app.post('/', async function(req, res, next) {
  try {
    const developers = req.body.developers
    if (!developers || !Array.isArray(developers)) {
      throw new ExpressError("Invalid request body", 400)
    }
    const results = await Promise.all(developers.map(async d => {
      const response = await axios.get(`https://api.github.com/users/${d}`)
      return { name: response.data.name, bio: response.data.bio }
    }))
    devData.push(...results)
    return res.json(results)
  } catch (err) {
    next(err)
  }
})

// ============================================================
// 404 Handler
app.use(function(req, res, next) {
  throw new ExpressError("404 Page Not Found", 404)
})

// General Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  return res.json({
    error: err.message
  })
})

module.exports = app
