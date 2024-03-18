<template>
    <div class="modal" v-if="show">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h1>Login</h1>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username">
            <div class="error">{{ errors.username }}</div>
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password">
            <div class="error">{{ errors.password }}</div>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  
  export default {
    props: {
      show: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        username: '',
        password: '',
        errors: {}
      };
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      async submitForm() {
        this.errors = {};
        
        // Perform form validation
        if (this.validateForm()) {
          // If form validation passes, proceed with login
          this.loginUser();
        }
      },
      async loginUser() {
        try {
          const auth = getAuth();
          const userCredential = await signInWithEmailAndPassword(auth, this.username, this.password);
          const user = userCredential.user;
          console.log('Login successful!', user);
          this.closeModal(); // Close the modal after successful login
          // Optionally, you can emit an event to notify the parent component
          this.$emit('login-success', user);
        } catch (error) {
          console.error('Login failed:', error.message);
          // Handle login error (e.g., display error message to user)
          this.errors.loginError = error.message;
        }
      },
      validateForm() {
        let isValid = true;
  
        if (!this.username.trim()) {
          this.errors.username = 'Username is required';
          isValid = false;
        }
  
        if (!this.password.trim()) {
          this.errors.password = 'Password is required';
          isValid = false;
        }
  
        return isValid;
      }
    }
  };
  </script>
  
  
  <style scoped>
  /* Modal styles */
  .login-modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }
  
  .modal-content {
    background-color: #fefefe;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
  }
  
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="password"] {
    width: 250px;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .modal-content .error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
  
  button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  button:active {
    background-color: #0056b3;
    transform: translateY(1px);
  }
  </style>
  