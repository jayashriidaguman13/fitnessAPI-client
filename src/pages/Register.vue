<template>
  <div class="register-page">
    <div class="container">
      <h2 class="brand-title">FitTrack</h2>
      <img src="/images/logo.png" alt="FitTrack Logo" class="logo" />
      <h1 class="headline">Create your account</h1>

      <form @submit.prevent="handleRegister" class="form">
        <input
          type="text"
          v-model="form.name"
          placeholder="Full Name"
          required
        />
        <input
          type="email"
          v-model="form.email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          v-model="form.password"
          placeholder="Password"
          required
        />
        <button type="submit" class="btn primary">Register</button>
      </form>

      <p class="redirect">
        Already have an account?
        <span @click="$router.push('/login')">Login here</span>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: ''
      },
      apiURL: import.meta.env.VITE_API_URL + '/users/register'
    };
  },
  methods: {
    async handleRegister() {
      try {
        const res = await axios.post(this.apiURL, this.form);
        this.$notyf.success(res.data.message || 'Registered successfully!');
        this.$router.push('/login');
      } catch (err) {
        this.$notyf.error(
          err.response?.data?.message || 'Registration failed. Please try again.'
        );
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Roboto:wght@400;500&display=swap');

.register-page {
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
  width: 90%;
  max-width: 450px;
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
  font-size: 1.5rem;
  color: #1a3f8b;
  margin-bottom: 1rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form input {
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
}

.btn.primary {
  padding: 10px 25px;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  background-color: #1a3f8b;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn.primary:hover {
  background-color: #3660c3;
}

.redirect {
  margin-top: 1rem;
  font-size: 0.9rem;
}

.redirect span {
  color: #1a3f8b;
  cursor: pointer;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 480px) {
  .container {
    padding: 1.5rem 1.5rem;
  }

  .brand-title {
    font-size: 1.25rem;
  }

  .headline {
    font-size: 1.4rem;
  }

  .form input {
    font-size: 0.95rem;
    padding: 9px 12px;
  }

  .btn.primary {
    font-size: 0.95rem;
    padding: 9px 12px;
  }
}
</style>