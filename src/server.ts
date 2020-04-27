import express from 'express';

import axios from 'axios';

import './bootstrap';

const app = express();

let viewerwersPoint = new Map();

setInterval(function () {
  axios.get('https://tmi.twitch.tv/group/user/lucas_montano/chatters')
    .then(function (response) {
      // handle success
      response.data.chatters.viewers.forEach(viewer => {
        let point = 0
        if (viewerwersPoint.has(viewer)) {
          point = viewerwersPoint.get(viewer)
        }
        point++
        viewerwersPoint.set(viewer, point)
        console.log(`${viewer} have ${point} points`);
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}, 60 * 1000);

app.get('/', (req, res) => {
  res.json('Hello Twitch! :)');
});

app.use(express.json());

app.listen(process.env.PORT);
console.log(`🚀  Server ready at ${process.env.URL}`);
