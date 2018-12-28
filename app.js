const AssistantV1 = require('watson-developer-cloud/assistant/v1');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(express.static('./public'));
app.use(cors());

const port = 3000;

const assistant = new AssistantV1({
  username: '<USERNAME>',
  password: '<PASSWORD>',
  url: 'https://gateway.watsonplatform.net/assistant/api',
  version: '2018-09-20',
});

app.post('/conversation/', (req, res) => {
  const { text, context = {} } = req.body;

  const params = {
    input: { text },
    workspace_id: '<WORKSPACE_ID>',
    context,
  };

  assistant.message(params, (err, response) => {
    if (err) {
      console.error(err);
      res.status(500).json(err);
    } else {
      res.json(response);
    }
  });
});

app.listen(port, () => console.log(`Running on port ${port}`));
