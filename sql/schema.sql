 feature/gladys-auth-pets
Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'vet', 'staff', 'owner') DEFAULT 'owner',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Pets Table
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

  


-- MEMBER C: Rodriguez
CREATE TABLE IF NOT EXISTS animals (
  animal_id      INT AUTO_INCREMENT PRIMARY KEY,
  name           VARCHAR(100) NOT NULL,
  species_id     INT NOT NULL,
  breed_id       INT NULL,
  branch_id      INT NOT NULL,
  age_months     INT NOT NULL CHECK (age_months >= 0),
  gender         ENUM('Male','Female') NOT NULL,
  health_status  VARCHAR(100) DEFAULT 'Healthy',
  status         ENUM('Available','Fostered','Adopted') NOT NULL DEFAULT 'Available',
  admission_date DATE NOT NULL,
  FOREIGN KEY (species_id) REFERENCES species(species_id),
  FOREIGN KEY (breed_id)   REFERENCES breeds(breed_id),
  FOREIGN KEY (branch_id)  REFERENCES shelter_branches(branch_id)
);

CREATE TABLE IF NOT EXISTS foster_applicants (
  applicant_id     INT AUTO_INCREMENT PRIMARY KEY,
  user_id          INT NOT NULL,
  housing_type     ENUM('House','Apartment','Condo','Other') NOT NULL,
  experience_level ENUM('Beginner','Intermediate','Experienced') NOT NULL,
  approval_status  ENUM('Pending','Approved','Rejected') NOT NULL DEFAULT 'Pending',
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS foster_assignments (
  assignment_id INT AUTO_INCREMENT PRIMARY KEY,
  animal_id     INT NOT NULL,
  applicant_id  INT NOT NULL,
  start_date    DATE NOT NULL,
  end_date      DATE NULL,
  status        ENUM('Active','Completed','Cancelled') NOT NULL DEFAULT 'Active',
  FOREIGN KEY (animal_id)    REFERENCES animals(animal_id),
  FOREIGN KEY (applicant_id) REFERENCES foster_applicants(applicant_id)
);










 MEMBER E (Myrtle): Medical Records & Vets

1. Veterinarians Table
CREATE TABLE IF NOT EXISTS veterinarians (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    specialization VARCHAR(100),
    contact_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

2. Vaccination Schedules Table
CREATE TABLE IF NOT EXISTS vaccination_schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    animal_id INT NOT NULL, -- Links to Member C's animals/rescues table
    vaccine_name VARCHAR(100) NOT NULL,
    dose_number INT DEFAULT 1,
    scheduled_date DATE NOT NULL,
    status ENUM('Pending', 'Completed', 'Overdue') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

3. Medical Records Table
CREATE TABLE IF NOT EXISTS medical_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    animal_id INT NOT NULL, -- Links to Member C's animals/rescues table
    vet_id INT,
    diagnosis TEXT NOT NULL,
    treatment TEXT NOT NULL,
    record_date DATE NOT NULL,
    notes TEXT,
    FOREIGN KEY (vet_id) REFERENCES veterinarians(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
main
);