const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Paws and Haven Server is Running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})