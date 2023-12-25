// routes/routes.js
import express from 'express';
import fs, { readFile } from 'fs';

const router = express.Router();
router.use(express.json()); // Parse JSON data in request body

router.get('/', (req, res) => {
  fs.readFile('../public/index.html', "utf8")
});

export default router;

