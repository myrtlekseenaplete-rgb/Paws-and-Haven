const User = require('../models/User');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.getAll();

        res.render('nillas/user-management', {
            users,
            error: null
        });
    } catch (error) {
        console.error('Could not load users:', error.message);
        res.status(500).send('Could not load users.');
    }
};

exports.createUser = async (req, res) => {
    try {
        await User.create(req.body);
        res.redirect('/users');
    } catch (error) {
        console.error('Could not create user:', error.message);
        res.status(500).send('Could not create user. Check if the email already exists.');
    }
};

exports.updateUser = async (req, res) => {
    try {
        await User.update(req.params.id, req.body);
        res.redirect('/users');
    } catch (error) {
        console.error('Could not update user:', error.message);
        res.status(500).send('Could not update user.');
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.delete(req.params.id);
        res.redirect('/users');
    } catch (error) {
        console.error('Could not delete user:', error.message);
        res.status(500).send('Could not delete user.');
    }
};