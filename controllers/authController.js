
const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.showLogin = (req, res) => {
    res.render('nillas/login', { error: null });
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [rows] = await db.execute(
            'SELECT id, full_name, email, password, role FROM users WHERE email = ?',
            [email]
        );

        if (rows.length === 0) {
            return res.status(401).render('nillas/login', {
                error: 'Invalid email or password.'
            });
        }

        const user = rows[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).render('nillas/login', {
                error: 'Invalid email or password.'
            });
        }

        req.session.user = {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            role: user.role
        };

        res.redirect('/auth/profile');

    } catch (error) {
        console.error(error);
        res.status(500).send('Login failed. Please try again.');
    }
};


exports.profile = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }

    res.render('nillas/profile', {
        user: req.session.user
    });
};

exports.logout = (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error('Logout error:', error);
            return res.status(500).send('Could not log out.');
        }

        res.redirect('/auth/login');
    });
};