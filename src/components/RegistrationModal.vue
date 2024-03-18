<template>
  <div class="modal" v-if="show">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h1>Registration</h1>
      <div class="container">
        <form @submit.prevent="submitForm">
          <div>
            <label for="username" class="uname">Username:</label>
            <input type="text" id="username" v-model="formData.username">
            <div class="error">{{ errors.username }}</div>
          </div>
          <div>
            <label for="email">Email Address:</label>
            <input type="email" id="email" v-model="formData.email">
            <div class="error">{{ errors.email }}</div>
          </div>
          <div>
            <label for="firstname" class="">First Name:</label>
            <input type="text" id="firstname" v-model="formData.firstName">
            <div class="error">{{ errors.firstName }}</div>
          </div>
          <div>
            <label for="lastname">Last Name:</label>
            <input type="text" id="lastname" v-model="formData.lastName">
            <div class="error">{{ errors.lastName }}</div>
          </div>
          <div>
            <label for="position">Position:</label>
            <select id="position" v-model="formData.position">
              <option value="">Select Position</option>
              <option value="manager">Administrator</option>
              <option value="supervisor">Educator</option>
              <option value="developer">Principal</option>
            </select>
            <div class="error">{{ errors.position }}</div>
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="formData.password">
            <div class="error">{{ errors.password }}</div>
          </div>
          <div>
            <label for="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" v-model="formData.confirmPassword">
            <div class="error">{{ errors.confirmPassword }}</div>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

export default {
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      formData: {
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        position: '',
        password: '',
        confirmPassword: ''
      },
      errors: {}
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    async submitForm() {
      this.errors = {};

      if (this.validateForm()) {
        try {
          const auth = getAuth();
          const userCredential = await createUserWithEmailAndPassword(auth, this.formData.email, this.formData.password);
          const user = userCredential.user;
          console.log('Registration successful!', user);

          // Write user data to the database
          this.writeUserData(user.uid);

          this.resetForm();
          this.closeModal();
        } catch (error) {
          console.error('Registration failed:', error.message);
          this.errors.registrationError = error.message;
        }
      }
    },
    validateForm() {
      let isValid = true;

      if (!this.formData.username.trim()) {
        this.errors.username = 'Username is required';
        isValid = false;
      }

      if (!this.formData.email.trim()) {
        this.errors.email = 'Email is required';
        isValid = false;
      }

      if (!this.formData.firstName.trim()) {
        this.errors.firstName = 'First Name is required';
        isValid = false;
      }

      if (!this.formData.lastName.trim()) {
        this.errors.lastName = 'Last Name is required';
        isValid = false;
      }

      if (!this.formData.position.trim()) {
        this.errors.position = 'Position is required';
        isValid = false;
      }

      if (!this.formData.password.trim()) {
        this.errors.password = 'Password is required';
        isValid = false;
      }

      if (this.formData.password !== this.formData.confirmPassword) {
        this.errors.confirmPassword = 'Passwords do not match';
        isValid = false;
      }

      return isValid;
    },
    resetForm() {
      this.formData.username = '';
      this.formData.email = '';
      this.formData.firstName = '';
      this.formData.lastName = '';
      this.formData.position = '';
      this.formData.password = '';
      this.formData.confirmPassword = '';
    },
    writeUserData(userId) {
      const database = getDatabase();
      const userRef = ref(database, 'users/' + userId);
      set(userRef, {
        username: this.formData.username,
        email: this.formData.email,
        firstName: this.formData.firstName,
        lastName: this.formData.lastName,
        position: this.formData.position
        // You can add more user data here as needed
      }).then(() => {
        console.log('User data written to database successfully!');
      }).catch((error) => {
        console.error('Error writing user data to database:', error);
      });
    }
  }
};
</script>


<style scoped>
/* Add your modal styles here */
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  align-content: center;
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Box shadow */
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/* Form styles */
.modal-content form {
  width: 100%;
}


.modal-content label {
  display: inline-block;
  width: 150px; /* Set a fixed width for the labels */
  text-align: right; /* Align text to the right */
  margin-bottom: 5px;
  font-weight: bold;
}
 

.modal-content input[type="text"],
.modal-content input[type="email"],
.modal-content input[type="password"],
.modal-content select {
  width: calc(100% - 800px);
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

.modal-content .error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

.modal-content button[type="submit"] {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s; /* Smooth hover effect */
}

.modal-content button[type="submit"]:hover {
  background-color: #0056b3;
}

.modal-content button[type="submit"]:active {
  background-color: #0056b3;
  transform: translateY(1px);
}
</style>
