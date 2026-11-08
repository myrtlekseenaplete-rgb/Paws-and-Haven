const rescueRoutes = require('./routes/rescueRoutes');
const fosterRoutes = require('./routes/fosterRoutes');

app.use('/rescue', rescueRoutes);
app.use('/foster', fosterRoutes);