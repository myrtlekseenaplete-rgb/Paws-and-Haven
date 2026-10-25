const db = require('../config/db'); // Adjust path to your db connection file

const UserPet = {
  // User Authentication
  createUser: async (fullName, email, hashedPassword, role = 'owner') => {
    const [result] = await db.execute(
      'INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)',
      [fullName, email, hashedPassword, role]
    );
    return result.insertId;
  },

  findUserByEmail: async (email) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  // Pet Profiles
  getAllPetsByOwner: async (ownerId) => {
    const [rows] = await db.execute('SELECT * FROM pets WHERE owner_id = ?', [ownerId]);
    return rows;
  },

  createPet: async (ownerId, name, species, breed, age, gender) => {
    const [result] = await db.execute(
      'INSERT INTO pets (owner_id, name, species, breed, age, gender) VALUES (?, ?, ?, ?, ?, ?)',
      [ownerId, name, species, breed, age, gender]
    );
    return result.insertId;
  }
};

module.exports = UserPet;