INSERT INTO users (full_name, email, password, role) VALUES
('Gladys Nillas', 'gladys@example.com', 'hashedpassword123', 'owner'),
('Dr. Alex Smith', 'dralex@example.com', 'hashedpassword123', 'vet');

INSERT INTO pets (owner_id, name, species, breed, age, gender) VALUES
(1, 'Luna', 'Dog', 'Golden Retriever', 3, 'female'),
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

