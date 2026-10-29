# 📋 5.4 Ownership Matrix

| Member | GitHub username | Tables | Endpoints / screens | Join report(s) and join type | Feature role |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Gladys Pearl Nillas | pearls15 | users, user_roles, system_logs | POST /auth/login`<br>GET /auth/profile`<br>Login & Profile Views | Report 1: User Audit Logs<br>(*INNER JOIN*) | Core & Auth |
| Ayessa Jane L. Chavez | ayessaprogramming | shelter_locations, animal_categories, status_lookup | GET /master/locations`<br>POST /master/categories`<br>Branch & Lookup Views | Report 2: Branch Active Status<br>(*LEFT JOIN*) | Master Data |
| *Member C* | @github_username_c | animals, adopters, adoption_requests | GET /adoptions`<br>POST /adoptions/apply`<br>Adoption Portal View | Multi-Table Adoption Tracking<br>(*INNER JOIN*) | Transactions |
| *Member D* | @github_username_d | quarantine_logs, audit_trail, alert_notifications | GET /alerts`<br>PUT /quarantine/status`<br>Triage & Alert Dashboard | Report: Quarantine SLA Audit<br>(*LEFT JOIN*) | Unique Feature (Rules & Alerts) |
| Plete | myrtlekseenapleta-rgb | veterinarians, medical_records, vaccination_schedule | GET /medical/reports<br>POST /medical/records | Treatment Logs & Reports<br>Report 3: Vet Audit Logs (RIGHT JOIN)<br>Report 4: Medical History (FULL OUTER JOIN via UNION) | Reports & Medical Records |
