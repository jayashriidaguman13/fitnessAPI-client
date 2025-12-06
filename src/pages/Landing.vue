<template>
  <div class="landing">
    <div class="container">
      <h2 class="brand-title">FitTrack</h2>
      <img src="/images/logo.png" alt="FitTrack Logo" class="logo" />
      <h1 class="headline">Ready to start your fitness journey?</h1>
      <p class="subheadline">
        Track your workouts, stay motivated, and celebrate your progress!
      </p>
      <div class="buttons">
        <button @click="$router.push('/register')" class="btn primary">
          Register
        </button>
        <button @click="$router.push('/login')" class="btn secondary">
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Landing'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Roboto:wght@400;500&display=swap');

.landing {
  height: 100vh;
  width: 100vw;
  background: url('/images/background.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto', sans-serif;
}

.container {
  background-color: rgba(255, 255, 255, 0.85);
  padding: 2rem 2.5rem;
  border-radius: 12px;
  text-align: center;
  max-width: 400px;
}

.brand-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 3rem;
  color: #1a3f8b;
  margin-bottom: 0.75rem;
  font-weight: 700;
}

.logo {
  width: 100px;
  margin-bottom: 1rem;
}

.headline {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.8rem;
  color: #1a3f8b;
  margin-bottom: 0.5rem;
}

.subheadline {
  font-size: 1rem;
  color: #1a3f8b;
  margin-bottom: 1.5rem;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.btn {
  padding: 10px 25px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Roboto', sans-serif;
  border: none;
}

.btn.primary {
  background-color: #1a3f8b;
  color: white;
}

.btn.primary:hover {
  background-color: #3660c3;
}

.btn.secondary {
  background-color: white;
  color: #1a3f8b;
  border: 2px solid #1a3f8b;
}

.btn.secondary:hover {
  background-color: #1a3f8b;
  color: white;
}

@media (max-width: 480px) {
  .container {
    padding: 1.5rem 1.5rem;
  }
  .brand-title {
    font-size: 1.25rem;
  }
  .headline {
    font-size: 1.5rem;
  }
  .subheadline {
    font-size: 0.9rem;
  }
}
</style>