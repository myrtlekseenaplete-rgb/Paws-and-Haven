<form action="/rescue/request" method="POST" class="p-4 border rounded">
  <h3>Report a Stray / Rescue Animal</h3>
  
  <label>Species:</label>
  <select name="species" required class="form-control mb-2">
    <option value="Dog">Dog</option>
    <option value="Cat">Cat</option>
  </select>

  <label>Size:</label>
  <select name="size" required class="form-control mb-2">
    <option value="Small">Small</option>
    <option value="Medium">Medium</option>
    <option value="Large">Large</option>
  </select>

  <label>Urgency Level:</label>
  <select name="urgency" class="form-control mb-2">
    <option value="Low">Low</option>
    <option value="Medium">Medium</option>
    <option value="High">High</option>
    <option value="Critical">Critical</option>
  </select>

  <label>Location Address:</label>
  <input type="text" name="location[address]" required class="form-control mb-2" />

  <label>Reporter Contact/Name:</label>
  <input type="text" name="reportedBy" required class="form-control mb-2" />

  <button type="submit" class="btn btn-primary">Submit Report</button>
</form>