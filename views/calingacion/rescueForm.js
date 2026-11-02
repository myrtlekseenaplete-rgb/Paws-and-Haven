<form action="/rescue/request" method="POST" class="p-4 border rounded">
  <h3>Report Stray / Rescue</h3>

  <select name="species" required class="form-select mb-2">
    <option value="Dog">Dog</option>
    <option value="Cat">Cat</option>
  </select>

  <select name="size" required class="form-select mb-2">
    <option value="Small">Small</option>
    <option value="Medium">Medium</option>
    <option value="Large">Large</option>
  </select>

  <select name="urgency" class="form-select mb-2">
    <option value="Low">Low</option>
    <option value="Medium">Medium</option>
    <option value="High">High</option>
    <option value="Critical">Critical</option>
  </select>

  <input type="text" name="location[address]" placeholder="Location Address" required class="form-control mb-2">
  <input type="text" name="reportedBy" placeholder="Reporter Name/Contact" required class="form-control mb-3">

  <button type="submit" class="btn btn-primary w-100">Submit Report</button>
</form>