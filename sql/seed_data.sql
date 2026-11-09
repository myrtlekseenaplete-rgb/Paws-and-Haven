INSERT INTO users (full_name, email, password, role) VALUES
('Gladys Nillas', 'gladys@example.com', 'hashedpassword123', 'owner'),
('Dr. Alex Smith', 'dralex@example.com', 'hashedpassword123', 'vet');

INSERT INTO pets (owner_id, name, species, breed, age, gender) VALUES
(1, 'Luna', 'Dog', 'Golden Retriever', 3, 'female'),
(1, 'Milo', 'Cat', 'Siamese', 2, 'male');
(1, 'Milo', 'Cat', 'Siamese', 2, 'male');




-- SEED DATA member c
INSERT INTO animals (name,species_id,breed_id,branch_id,age_months,gender,health_status,status,admission_date) VALUES
('Bantay',1,1,1,18,'Male','Healthy','Available','2026-08-02'),
('Mingming',2,3,1,8,'Female','Needs Vaccination','Fostered','2026-08-15'),
('Choco',1,2,2,30,'Male','Healthy','Adopted','2026-07-10'),
('Luna',2,4,2,12,'Female','Recovering','Available','2026-09-01'),
('Brownie',1,1,1,5,'Female','Healthy','Available','2026-09-20');

INSERT INTO foster_applicants (user_id,housing_type,experience_level,approval_status) VALUES
(2,'House','Experienced','Approved'),
(3,'Apartment','Beginner','Pending'),
(4,'Condo','Intermediate','Approved'),
(5,'Apartment','Beginner','Rejected');

INSERT INTO foster_assignments (animal_id,applicant_id,start_date,end_date,status) VALUES
(2,1,'2026-09-05',NULL,'Active'),
(3,3,'2026-07-12','2026-08-20','Completed');



INSERT INTO system_settings
(setting_key, setting_value, description, updated_by)
VALUES
('minimum_quarantine_days', '14',
 'Minimum quarantine days before adoption readiness review',
 (SELECT id FROM users WHERE email = 'gladys@example.com')),

('require_medical_clearance', '1',
 'Require veterinary medical clearance',
 (SELECT id FROM users WHERE email = 'gladys@example.com')),

('require_completed_vaccinations', '1',
 'Require completed vaccinations before adoption readiness review',
 (SELECT id FROM users WHERE email = 'gladys@example.com'));



INSERT INTO audit_logs
(user_id, action, entity_type, entity_id, status, details)
VALUES
(
 (SELECT id FROM users WHERE email = 'gladys@example.com'),
 'SETTING_UPDATED',
 'system_settings',
 1,
 'SUCCESS',
 'Updated minimum quarantine days to 14'
),

(
 (SELECT id FROM users WHERE email = 'dralex@example.com'),
 'READINESS_CHECKED',
 'animals',
 1,
 'SUCCESS',
 'Animal readiness requirements checked'
),

(
 (SELECT id FROM users WHERE email = 'gladys@example.com'),
 'SETTING_UPDATED',
 'system_settings',
 2,
 'SUCCESS',
 'Enabled medical clearance requirement'
),

(
 (SELECT id FROM users WHERE email = 'dralex@example.com'),
 'MEDICAL_REVIEWED',
 'animals',
 2,
 'SUCCESS',
 'Animal medical records reviewed'
);
