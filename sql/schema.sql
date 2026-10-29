-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'vet', 'staff', 'owner') DEFAULT 'owner',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pets Table
CREATE TABLE IF NOT EXISTS pets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  owner_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  species VARCHAR(30) NOT NULL,
  breed VARCHAR(50),
  age INT,
  gender ENUM('male', 'female') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Roles Table
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Species Table
CREATE TABLE IF NOT EXISTS species (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Breeds Table
CREATE TABLE IF NOT EXISTS breeds (
    id INT AUTO_INCREMENT PRIMARY KEY,
    species_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    FOREIGN KEY (species_id) REFERENCES species(id) ON DELETE CASCADE
);

-- Shelter Branches Table
CREATE TABLE IF NOT EXISTS shelter_branches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    branch_name VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL
);