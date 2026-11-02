<h2>Rescue Management Dashboard</h2>

<table class="table border">
  <thead>
    <tr>
      <th>Species</th>
      <th>Size</th>
      <th>Urgency</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <% requests.forEach(req => { %>
      <tr>
        <td><%= req.species %></td>
        <td><%= req.size %></td>
        <td><span class="badge bg-warning"><%= req.urgency %></span></td>
        <td><%= req.status %></td>
        <td>
          <% if (req.status === 'Pending') { %>
            <button onclick="triggerSmartPlacement('<%= req._id %>')" class="btn btn-sm btn-success">
              ⚡ Smart Match Foster
            </button>
          <% } else { %>
            <span class="text-muted">Assigned</span>
          <% } %>
        </td>
      </tr>
    <% }) %>
  </tbody>
</table>

<script>
async function triggerSmartPlacement(id) {
  const res = await fetch(`/rescue/match/${id}`, { method: 'POST' });
  const data = await res.json();
  alert(data.message || data.error);
  location.reload();
}
</script>