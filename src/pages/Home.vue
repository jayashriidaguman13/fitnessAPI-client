<template>
  <div class="home-page">
    <header class="header">
      <h1>My Workouts</h1>
      <button class="btn logout" @click="logout">Logout</button>
    </header>

    <div class="actions">
      <button class="btn add" @click="showAddModal = true" id="addWorkout">Add Workout</button>
    </div>

    <div v-if="showAddModal" class="modal-overlay" @click.self="showAddModal = false">
      <div class="modal">
        <h2>Add Workout</h2>
        <form @submit.prevent="addWorkout">
          <input type="text" v-model="newWorkout.name" placeholder="Workout Name" required />
          <input type="number" v-model="newWorkout.duration" placeholder="Duration (minutes)" required />
          <button type="submit" class="btn submit">Add</button>
          <button type="button" class="btn cancel" @click="showAddModal = false">Cancel</button>
        </form>
      </div>
    </div>

    <!-- Workouts Grid -->
    <div class="workouts-grid">
      <WorkoutCard
        v-for="workout in workouts"
        :key="workout._id"
        :workout="workout"
        @update-workout="updateWorkout"
        @delete="deleteWorkout"
        @complete="completeWorkout"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import WorkoutCard from '../components/WorkoutCard.vue';

export default {
  name: 'Home',
  components: { WorkoutCard },
  data() {
    return {
      apiURL: import.meta.env.VITE_API_URL,
      workouts: [],
      showAddModal: false,
      newWorkout: { name: '', duration: null }
    };
  },
  mounted() {
    this.fetchWorkouts();
  },
  methods: {
    async fetchWorkouts() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${this.apiURL}/workouts/getMyWorkouts`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.workouts = res.data.workouts;
      } catch (err) {
        this.$notyf.error('Failed to fetch workouts.');
        console.error(err);
      }
    },

    logout() {
      localStorage.removeItem('token');
      this.$router.push('/');
    },

    async addWorkout() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.post(`${this.apiURL}/workouts/addWorkout`, this.newWorkout, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.workouts.push(res.data);
        this.$notyf.success('Workout added successfully!');
        this.newWorkout = { name: '', duration: null };
        this.showAddModal = false;
      } catch (err) {
        this.$notyf.error('Failed to add workout.');
        console.error(err);
      }
    },

    async updateWorkout(updatedWorkout) {
      const workoutData = { ...updatedWorkout };
      console.log('Updating workout:', updatedWorkout);
	  try {
	    const token = localStorage.getItem('token');
	    await axios.put(
	      `${this.apiURL}/workouts/updateWorkout/${updatedWorkout._id}`,
	      {
	        name: updatedWorkout.name,
	        duration: updatedWorkout.duration,
	        status: updatedWorkout.status
	      },
	      {
	        headers: { Authorization: `Bearer ${token}` }
	      }
	    );
	    this.$notyf.success('Workout updated!');
	    this.fetchWorkouts();
	  } catch (err) {
	    this.$notyf.error('Failed to update workout.');
	    console.error(err);
	  }
	},

    deleteWorkout(id) {
      this.performDelete(id);
    },

    async performDelete(id) {
	  try {
	    const token = localStorage.getItem('token');
	    await axios.delete(`${this.apiURL}/workouts/deleteWorkout/${id}`, {
	      headers: { Authorization: `Bearer ${token}` }
	    });
	    this.workouts = this.workouts.filter(w => w._id !== id);
	    this.$notyf.success('Workout deleted!');
	  } catch (err) {
	    this.$notyf.error('Failed to delete workout.');
	    console.error(err);
	  }
	},

    async completeWorkout(id) {
	  try {
	    const token = localStorage.getItem('token');
	    await axios.patch(`${this.apiURL}/workouts/completeWorkoutStatus/${id}`, null, {
	      headers: { Authorization: `Bearer ${token}` }
	    });
	    this.$notyf.success('Workout marked as completed!');
	    this.fetchWorkouts();
	  } catch (err) {
	    this.$notyf.error('Failed to complete workout.');
	    console.error(err);
	  }
	}
  }
};
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  width: 100vw;
  background: url('/images/background.jpg') no-repeat center center;
  background-size: cover;
  padding: 1rem 2rem;
  font-family: 'Roboto', sans-serif;
  box-sizing: border-box;
}

/* Header */
.header {
  display: flex;
  justify-content: center; 
  align-items: center; 
  position: relative; 
  margin-bottom: 0;
  padding-bottom: 0;
}

.header h1 {
  color: #1a3f8b; 
  font-size: 3rem;
  text-align: center;
  margin-bottom: 0.5rem;
}

.header .btn.logout {
  position: absolute;
  right: 0;
  top: 0.5rem;
}

/* Buttons */
.btn {
  border: none;
  border-radius: 6px;
  padding: 8px 14px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.btn.add {
  background-color: #1a3f8b;
  color: white;
}

.btn.logout {
	background-color: white;
	color: #1a3f8b;
	border: 1px solid #1a3f8b;
}

.actions {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

/* Workouts grid */
.workouts-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 1rem;
  justify-items: center;
  align-items: start;
  margin: 2rem;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}

.modal {
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
}

.modal h2 {
  margin-bottom: 1rem;
  color: #1a3f8b;
  font-family: 'Montserrat', sans-serif;
}

.modal form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.modal form input {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.modal form .btn.submit {
  background-color: #1a3f8b;
  color: white;
}

.modal form .btn.submit:hover {
  background-color: #3660c3;
}

.modal form .btn.cancel {
  background-color: #e74c3c;
  color: white;
}

.modal form .btn.cancel:hover {
  background-color: #c0392b;
}

@media (max-width: 1024px) {
  .workouts-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 per row on tablets */
  }
}

@media (max-width: 768px) {
  .home-page {
    padding: 1rem;
  }
}

@media (max-width: 600px) {
  .workouts-grid {
    grid-template-columns: 1fr; /* 1 per row on mobile */
  }
}
</style>