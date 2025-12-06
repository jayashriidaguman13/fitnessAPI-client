<template>
  <div class="workout-card">
    <h3 class="workout-name" v-if="!isEditing">{{ workout.name }}</h3>

    <div v-else>
      <input class="input" v-model="editedWorkout.name" placeholder="Workout Name" />
      <input class="input" v-model.number="editedWorkout.duration" type="number" placeholder="Duration" />
    </div>

    <p><strong>Duration:</strong> {{ workout.duration }} mins</p>
    <p><strong>Status:</strong> <span :class="statusClass">{{ workout.status }}</span></p>
    <p><strong>Date Added:</strong> {{ formattedDate }}</p>

    <div class="buttons">
      <template v-if="!isEditing">
        <button class="btn edit" @click="startEditing">Edit</button>
        <button class="btn delete" @click="confirmDelete">Delete</button>
        <button
          class="btn complete"
          :disabled="workout.status === 'completed'"
          @click="$emit('complete', workout._id)"
        >
          Mark Complete
        </button>
      </template>

      <template v-else>
        <button class="btn edit" @click="saveEdit">Save</button>
        <button class="btn delete" @click="cancelEdit">Cancel</button>
      </template>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'WorkoutCard',
  props: {
    workout: { type: Object, required: true }
  },
  data() {
    return {
      isEditing: false,
      editedWorkout: { name: '', duration: null, _id: null }
    };
  },
  computed: {
    formattedDate() {
      const date = new Date(this.workout.dateAdded);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    },
    statusClass() {
      return {
        pending: this.workout.status === 'pending',
        completed: this.workout.status === 'completed'
      };
    }
  },
  methods: {
    startEditing() {
      this.isEditing = true;
      this.editedWorkout = { ...this.workout };
    },
    cancelEdit() {
      this.isEditing = false;
    },
    saveEdit() {
      this.$emit('update-workout', this.editedWorkout);
      this.isEditing = false;
    },
    async confirmDelete() {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This workout will be deleted permanently.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e74c3c',
        cancelButtonColor: '#3498db',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      });

      if (result.isConfirmed) {
        this.$emit('delete', this.workout._id);
        Swal.fire({
          title: 'Deleted!',
          text: 'Your workout has been deleted.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    }
  }
};
</script>

<style scoped>
.workout-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 0.8rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 250px;        
  max-height: 250px;    
  box-sizing: border-box;
}

.input {
  width: 100%;
  padding: 6px 8px;
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
  box-sizing: border-box;
}

.workout-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a3f8b;
  margin-bottom: 0.5rem;
}

p {
  margin: 0.25rem 0;
  font-size: 0.95rem;
}

.pending {
  color: #f39c12;
}

.completed {
  color: #27ae60;
}

.buttons {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.btn {
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s ease;
}

.btn.edit {
  background-color: #3498db;
  color: white;
}

.btn.edit:hover {
  background-color: #2980b9;
}

.btn.delete {
  background-color: #e74c3c;
  color: white;
}

.btn.delete:hover {
  background-color: #c0392b;
}

.btn.complete {
  background-color: #27ae60;
  color: white;
}

.btn.complete:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}
</style>