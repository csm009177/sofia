// import express
import express from 'express';
import rootRoute from './routes/rootRoute.js';

const app = express();
const port = 3217;

app.use(express.static('public'));
app.use(rootRoute); // 라우터 추가

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});