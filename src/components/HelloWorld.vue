<template>
  <div class="home">
    <img :src="imagePath" alt="Description of the image">
    
    <div class="btn">
      <button @click="openModal('register')">Register</button>
      <button @click="openModal('login')">Login</button> 
    </div>
    
    <RegistrationModal :show="showRegisterModal" @close="closeModal('register')" />
    <LoginModal :show="showLoginModal" @close="closeModal('login')" />
  </div>
</template>

<script>
import RegistrationModal from '@/components/RegistrationModal.vue';
import LoginModal from '@/components/LoginModal.vue';

export default {
  components: {
    RegistrationModal,
    LoginModal
  },
  data() {
    return {
      imagePath: require('@/assets/the.png'),
      showRegisterModal: false,
      showLoginModal: false
    };
  },
  methods: {
    openModal(modalType) {
      if (modalType === 'register') {
        this.showRegisterModal = true;
      } else if (modalType === 'login') {
        this.showLoginModal = true;
      }
    },
    closeModal(modalType) {
      if (modalType === 'register') {
        this.showRegisterModal = false;
      } else if (modalType === 'login') {
        this.showLoginModal = false;
      }
    },
    
  }
};
</script>

<style scoped>
.home {
  background-color: azure;
  height: 100vh;
}
img{
  align-content: center;
  width: 800px;
}
.btn{
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(250px,1fr));
  gap: 16px;
  width: 300px;
  align-content: center;
  position: relative;
  right: -650px;
  top: 300px;
}
button{
  width: 250px;
  height: 48px;
  font-size: 32px;
}
</style>
