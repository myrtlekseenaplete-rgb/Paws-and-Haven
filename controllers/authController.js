const User = require('./models/User');

exports.getLogin = (req, res) => {
  res.render('nillas/login', { error: null });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (!user || user.password !== password) {
      return res.render('nillas/login', { error: 'Invalid email or password.' });
    }
    if (req.session) req.session.user = user;
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).send('Server Error during login.');
  }
};