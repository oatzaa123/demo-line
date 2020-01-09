const express = require('express');
const bodyParser = require('body-parser');

const sendLine = require('./src/constant/sendLine');
const serviceLine = new sendLine();

const serviceTNS = require('./src/service/tnsService');

require('dotenv').config()

const app = express();
const port = process.env.PORT || 4000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// app.post('/webhook', async (req, res) => {
//   let reply_token = req.body.events[0].replyToken;
//   let msg = req.body.events[0].message.text;
//   let body = [];

//   if (msg == "news") {
//     const dataTodayTopPicks = await serviceTns.getTodayTopPick();
//     const contentBody = await serviceLine.messageNews(dataTodayTopPicks);

//     body.push(contentBody);
//   } else {
//     body.push(serviceLine.messageText(msg));
//   }

//   serviceLine.replyLine(reply_token, body);
//   res.sendStatus(200);
// });


app.post('/webhook', async (req, res) => {
  let reply_token = req.body.events[0].replyToken;
  let msg = req.body.events[0].message.text;
  let body = [];

  let contentBody = '';
  if (msg == "TNS:DW16") {
    contentBody = await serviceTNS.dw();
    body.push(contentBody);
  } else if (msg == "TNS:Today") {
    contentBody = await serviceTNS.todayStrategy();
    body.push(contentBody);
  } else if (msg == "TNS:Market") {
    contentBody = await serviceTNS.numberHighlight();
    body.push(contentBody);
  } else {
    body.push(serviceLine.messageText(msg));
  }

  serviceLine.replyLine(reply_token, body);
  res.sendStatus(200);
});



app.get('/', async (req, res) => {

  getTodayTopPick
  const dataTodayTopPicks = await serviceTNS.getTodayTopPick();

  res.send(dataTodayTopPicks);

  const getDailyTradeCode = await serviceTNS.getDailyTradeCode();

  res.send(getDailyTradeCode);

  DW
  const a = await serviceTNS.dw();
  res.send(a);

  todayStrategy
  const a = await serviceTNS.todayStrategy();
  res.send(a);

  Number HighLight
  const a = await serviceTNS.numberHighlight();
  res.send(a);
});



app.listen(port);
