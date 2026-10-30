# 📋 5.4 Ownership Matrix

| Member | GitHub username | Tables | Endpoints / screens | Join report(s) and join type | Feature role |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Gladys Pearl Nillas | pearls15 | users, user_roles, system_logs, master_data | POST /auth/login`<br>GET /auth/profile`<br>Login & Profile Views | Report 1: User Audit Logs<br>(*INNER JOIN*) | Core, Auth & Master Data |
| Ayessa Jane L. Chavez | ayessaprogramming | adoption_applications, adoptions, shelter_locations | POST /adoptions/apply<br>GET /adoptions/applications<br>PUT /adoptions/status<br>GET /adoptions/dashboard | Report 2: Branch Active Status<br>(LEFT JOIN) | Transactions (Adoptions) |
| Kyle B. Rodriguez | KyleRodriguez123 | animals, foster_applicants, foster_assignment | GET /animals`<br>POST /animals<br>GET/fosters/applicants<br>POST/fosters/assignments<br>Animal Records & Foster Management Views | Report 2: Foster Placement Status Dashboard<br>(*LEFT JOIN*) | Transactions |
| Renz Andrey A. Nawanao | Dud770 | quarantine_logs, audit_trail, alert_notifications | GET /alerts`<br>PUT /quarantine/status`<br>Triage & Alert Dashboard | Report: Quarantine SLA Audit<br>(*LEFT JOIN*) | Unique Feature (Rules & Alerts) |
| Plete | myrtlekseenapleta-rgb | veterinarians, medical_records, vaccination_schedule | GET /medical/reports<br>POST /medical/records | Treatment Logs & Reports<br>Report 3: Vet Audit Logs (RIGHT JOIN)<br>Report 4: Medical History (FULL OUTER JOIN via UNION) | Reports & Medical Records |
