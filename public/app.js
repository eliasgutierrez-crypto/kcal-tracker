const API_URL = "https://kcal-tracker-fqfx.onrender.com/api";

// --- Usuarios ---
async function createUser() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);
  const age = parseInt(document.getElementById('age').value);

  try {
    const res = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, weight, height, age })
    });
    const data = await res.json();
    document.getElementById('userResult').textContent = JSON.stringify(data, null, 2);
  } catch(err) {
    console.error(err);
    alert("Error al crear usuario");
  }
}

// --- Alimentos ---
async function createFood() {
  const name = document.getElementById('foodName').value;
  const calories = parseFloat(document.getElementById('foodCalories').value);
  const protein = parseFloat(document.getElementById('foodProtein').value);
  const carbs = parseFloat(document.getElementById('foodCarbs').value);
  const fat = parseFloat(document.getElementById('foodFat').value);
  const fiber = parseFloat(document.getElementById('foodFiber').value);

  try {
    const res = await fetch(`${API_URL}/foods`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        calories_per_100g: calories,
        protein_per_100g: protein,
        carbs_per_100g: carbs,
        fat_per_100g: fat,
        fiber_per_100g: fiber
      })
    });
    const data = await res.json();
    document.getElementById('foodResult').textContent = JSON.stringify(data, null, 2);
  } catch(err) {
    console.error(err);
    alert("Error al crear alimento");
  }
}

async function logFood() {
  const userId = parseInt(document.getElementById('userIdFood').value);
  const foodId = parseInt(document.getElementById('foodId').value);
  const quantity = parseFloat(document.getElementById('foodQuantity').value);

  try {
    const res = await fetch(`${API_URL}/food-logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, food_id: foodId, quantity_grams: quantity })
    });
    const data = await res.json();
    document.getElementById('foodLogResult').textContent = JSON.stringify(data, null, 2);
  } catch(err) {
    console.error(err);
    alert("Error al registrar consumo");
  }
}

// --- Actividades ---
async function createActivity() {
  const name = document.getElementById('activityName').value;
  const calories_per_minute = parseFloat(document.getElementById('activityCalories').value);

  try {
    const res = await fetch(`${API_URL}/activities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, met_value: calories_per_minute })
    });
    const data = await res.json();
    document.getElementById('activityResult').textContent = JSON.stringify(data, null, 2);
  } catch(err) {
    console.error(err);
    alert("Error al crear actividad");
  }
}

async function logActivity() {
  const userId = parseInt(document.getElementById('userIdActivity').value);
  const activityId = parseInt(document.getElementById('activityId').value);
  const duration = parseFloat(document.getElementById('activityDuration').value);

  try {
    const res = await fetch(`${API_URL}/activity-logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, activity_id: activityId, duration_minutes: duration })
    });
    const data = await res.json();
    document.getElementById('activityLogResult').textContent = JSON.stringify(data, null, 2);
  } catch(err) {
    console.error(err);
    alert("Error al registrar actividad");
  }
}

// --- Resumen Diario ---
async function getSummary() {
  const userId = parseInt(document.getElementById('userIdSummary').value);
  const date = document.getElementById('dateSummary').value;

  try {
    const res = await fetch(`${API_URL}/users/${userId}/summary?date=${date}`);
    const data = await res.json();
    document.getElementById('summaryResult').textContent = JSON.stringify(data, null, 2);
  } catch(err) {
    console.error(err);
    alert("Error al obtener resumen");
  }
}
