const API_URL = "https://kcal-tracker-fqfx.onrender.com/api";

async function createUser() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);
  const age = parseInt(document.getElementById('age').value);

  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, weight, height, age })
  });

  const data = await response.json();
  document.getElementById('userResult').textContent = JSON.stringify(data, null, 2);
}

async function getSummary() {
  const userId = document.getElementById('userIdSummary').value;
  const date = document.getElementById('dateSummary').value;

  const response = await fetch(`${API_URL}/activity-logs/summary-with-balance/${userId}/${date}`);
  const data = await response.json();
  document.getElementById('summaryResult').textContent = JSON.stringify(data, null, 2);
}
