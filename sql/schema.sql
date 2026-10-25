-- ===========================================
-- MEMBER E (Myrtle): Medical Records & Vets
-- ===========================================

-- 1. Veterinarians Table
CREATE TABLE IF NOT EXISTS veterinarians (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    specialization VARCHAR(100),
    contact_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Vaccination Schedules Table
CREATE TABLE IF NOT EXISTS vaccination_schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    animal_id INT NOT NULL, -- Links to Member C's animals/rescues table
    vaccine_name VARCHAR(100) NOT NULL,
    dose_number INT DEFAULT 1,
    scheduled_date DATE NOT NULL,
    status ENUM('Pending', 'Completed', 'Overdue') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Medical Records Table
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
);