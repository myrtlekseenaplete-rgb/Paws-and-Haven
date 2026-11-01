INSERT INTO users (full_name, email, password, role) VALUES
('Gladys Nillas', 'gladys@example.com', 'hashedpassword123', 'owner'),
('Dr. Alex Smith', 'dralex@example.com', 'hashedpassword123', 'vet');

INSERT INTO pets (owner_id, name, species, breed, age, gender) VALUES
(1, 'Luna', 'Dog', 'Golden Retriever', 3, 'female'),
(1, 'Milo', 'Cat', 'Siamese', 2, 'male');

-- Roles Seed
INSERT INTO roles (name) VALUES ('admin'), ('vet'), ('staff'), ('owner');

-- Species Seed
INSERT INTO species (name) VALUES ('Dog'), ('Cat');

-- Breeds Seed
INSERT INTO breeds (species_id, name) VALUES 
(1, 'Golden Retriever'),
(1, 'German Shepherd'),
(2, 'Siamese'),
(2, 'Persian');

-- Shelter Branches Seed
INSERT INTO shelter_branches (branch_name, location) VALUES 
('Central Shelter', 'Main City'),
('North Branch', 'Uptown District');