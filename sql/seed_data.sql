-- USERS
INSERT IGNORE INTO users (full_name, email, password, role) VALUES
('Gladys Nillas', 'gladys@example.com', '$2b$10$v7sgXEVevAigz9WQ.g7uf.xmGlBF0CV6L2AHk45pxxAp/OAFnrbOW', 'owner'),
('Dr. Alex Smith', 'dralex@example.com', '$2b$10$v7sgXEVevAigz9WQ.g7uf.xmGlBF0CV6L2AHk45pxxAp/OAFnrbOW', 'vet');


-- SPECIES
INSERT IGNORE INTO species (species_name) VALUES
('Dog'),
('Cat');



-- BREEDS
INSERT INTO breeds (species_id, breed_name)
SELECT s.species_id, 'Golden Retriever'
FROM species s
WHERE s.species_name = 'Dog'
AND NOT EXISTS (
    SELECT 1 FROM breeds b
    WHERE b.species_id = s.species_id
    AND b.breed_name = 'Golden Retriever'
);

INSERT INTO breeds (species_id, breed_name)
SELECT s.species_id, 'Labrador Retriever'
FROM species s
WHERE s.species_name = 'Dog'
AND NOT EXISTS (
    SELECT 1 FROM breeds b
    WHERE b.species_id = s.species_id
    AND b.breed_name = 'Labrador Retriever'
);

INSERT INTO breeds (species_id, breed_name)
SELECT s.species_id, 'Siamese'
FROM species s
WHERE s.species_name = 'Cat'
AND NOT EXISTS (
    SELECT 1 FROM breeds b
    WHERE b.species_id = s.species_id
    AND b.breed_name = 'Siamese'
);

INSERT INTO breeds (species_id, breed_name)
SELECT s.species_id, 'Persian'
FROM species s
WHERE s.species_name = 'Cat'
AND NOT EXISTS (
    SELECT 1 FROM breeds b
    WHERE b.species_id = s.species_id
    AND b.breed_name = 'Persian'
);

-- SHELTER BRANCHES
INSERT INTO shelter_branches (branch_name)
SELECT 'Main Shelter'
WHERE NOT EXISTS (
    SELECT 1 FROM shelter_branches
    WHERE branch_name = 'Main Shelter'
);

INSERT INTO shelter_branches (branch_name)
SELECT 'North Shelter'
WHERE NOT EXISTS (
    SELECT 1 FROM shelter_branches
    WHERE branch_name = 'North Shelter'
);

-- PETS
INSERT INTO pets (owner_id, name, species, breed, age, gender)
SELECT u.id, 'Luna', 'Dog', 'Golden Retriever', 3, 'female'
FROM users u
WHERE u.email = 'gladys@example.com'
AND NOT EXISTS (
    SELECT 1 FROM pets p
    WHERE p.owner_id = u.id AND p.name = 'Luna'
);

INSERT INTO pets (owner_id, name, species, breed, age, gender)
SELECT u.id, 'Milo', 'Cat', 'Siamese', 2, 'male'
FROM users u
WHERE u.email = 'gladys@example.com'
AND NOT EXISTS (
    SELECT 1 FROM pets p
    WHERE p.owner_id = u.id AND p.name = 'Milo'
);

-- ANIMALS - MEMBER C
INSERT INTO animals
(name, species_id, breed_id, branch_id, age_months,
 gender, health_status, status, admission_date)
SELECT 'Bantay', 1, 1, 1, 18,
       'Male', 'Healthy', 'Available', '2026-08-02'
WHERE NOT EXISTS (
    SELECT 1 FROM animals WHERE name = 'Bantay'
);

INSERT INTO animals
(name, species_id, breed_id, branch_id, age_months,
 gender, health_status, status, admission_date)
SELECT 'Mingming', 2, 3, 1, 8,
       'Female', 'Needs Vaccination', 'Fostered', '2026-08-15'
WHERE NOT EXISTS (
    SELECT 1 FROM animals WHERE name = 'Mingming'
);

INSERT INTO animals
(name, species_id, breed_id, branch_id, age_months,
 gender, health_status, status, admission_date)
SELECT 'Choco', 1, 2, 2, 30,
       'Male', 'Healthy', 'Adopted', '2026-07-10'
WHERE NOT EXISTS (
    SELECT 1 FROM animals WHERE name = 'Choco'
);

INSERT INTO animals
(name, species_id, breed_id, branch_id, age_months,
 gender, health_status, status, admission_date)
SELECT 'Luna', 2, 4, 2, 12,
       'Female', 'Recovering', 'Available', '2026-09-01'
WHERE NOT EXISTS (
    SELECT 1 FROM animals WHERE name = 'Luna'
);

INSERT INTO animals
(name, species_id, breed_id, branch_id, age_months,
 gender, health_status, status, admission_date)
SELECT 'Brownie', 1, 1, 1, 5,
       'Female', 'Healthy', 'Available', '2026-09-20'
WHERE NOT EXISTS (
    SELECT 1 FROM animals WHERE name = 'Brownie'
);

-- FOSTER APPLICANTS - MEMBER C
INSERT INTO foster_applicants
(user_id, housing_type, experience_level, approval_status)
SELECT u.id, 'House', 'Experienced', 'Approved'
FROM users u
WHERE u.email = 'gladys@example.com'
AND NOT EXISTS (
    SELECT 1 FROM foster_applicants f
    WHERE f.user_id = u.id
);

-- FOSTER ASSIGNMENTS - MEMBER C
INSERT INTO foster_assignments
(animal_id, applicant_id, start_date, end_date, status)
SELECT a.animal_id, f.applicant_id,
       '2026-09-05', NULL, 'Active'
FROM animals a
CROSS JOIN foster_applicants f
JOIN users u ON u.id = f.user_id
WHERE a.name = 'Mingming'
AND u.email = 'gladys@example.com'
AND NOT EXISTS (
    SELECT 1 FROM foster_assignments fa
    WHERE fa.animal_id = a.animal_id
    AND fa.applicant_id = f.applicant_id
);
