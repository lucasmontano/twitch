import express from 'express'

import axios from 'axios'

import './bootstrap'

const app = express()

let viewerwersPoint = new Map()

setInterval(function () {
  axios.get('https://tmi.twitch.tv/group/user/lucas_montano/chatters')
    .then(function (response) {
      // handle success
      response.data.chatters.viewers.forEach(viewer => {

        let point = viewerwersPoint.get(viewer) ?? 0
        viewerwersPoint.set(viewer, ++point)
        console.log(`${viewer} have ${point} points`)
      })
    })
    .catch(function (error) {
      // handle error
      console.log(error)
    })
    .then(function () {
      // always executed
    })
}, 60 * 1000)

app.use(express.json())

app.get('/', (req, res) => {
  const factoryViewer = ([name, points]) => ({ name, points })
  let viewers = Array.from(viewerwersPoint.entries()).map(factoryViewer)
  let top10 = viewers.sort((a, b) => a.points > b.points ? 1 : -1).slice(0, 10)
  return res.json(top10)
})

app.listen(process.env.PORT)
console.log(`🚀  Server ready at ${process.env.URL}`)
