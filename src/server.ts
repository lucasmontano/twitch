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

        let point = viewerwersPoint.get(viewer) ?? 0;
        viewerwersPoint.set(viewer, ++point);
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
}, 5 * 1000);

app.get('/', (req, res) => {

  let viewers = Array.from(viewerwersPoint.entries()).map(viewer => {
    return {
      name: viewer[0],
      points: viewer[1]
    }
  });

  let top10 = viewers.sort((a, b) => a.points > b.points ? 1 : -1).slice(0, 10);

  let response = `All viewers formatted in { name, points } to make it easy to read
  \n
  ${JSON.stringify(viewers)}
  \n\n
  Sort viewers by point and get top 10
  \n
  ${JSON.stringify(top10)}
  `
  res.write(response);

});

app.use(express.json());

app.listen(process.env.PORT);
console.log(`🚀  Server ready at ${process.env.URL}`);
