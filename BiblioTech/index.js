const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, 'src/.env') });
const livroRoutes = require('./src/routes/livroRoutes');

const app = express();
app.use(express.json());
app.use(livroRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
