import express from 'express';
import { JSDOM } from 'jsdom';
import cors from 'cors';
import bodyParser from 'body-parser';

import router from './src/routing';

// Add document for generation of SVG
// (helm-visualisation lib is based on js document object)
global.document = new JSDOM().window.document;

const isProd = process.env.NODE_ENV === 'production';

const app = express();
const port = isProd ? 8080: 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(router);

// start the Express server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
