import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useUsersApi } from '../apis/authApi.ts';

export const useUsersStore = defineStore('users', () => {
  const { createUser, loginUser } = useUsersApi();

  const currentUser = ref(null);
  const isAuthenticated = ref(false);
  const isLoading = ref(false);
  const errorMessage = ref('');

  const isRegisterMode = ref(false);
  const name = ref('');
  const email = ref('');
  const password = ref('');

  const registerUser = async (name, email, password) => {
    isLoading.value = true;
    errorMessage.value = '';

    try {
      const newUser = await createUser(email, password, name);
      currentUser.value = newUser;
      isAuthenticated.value = true;
    } catch (error) {
      errorMessage.value = error.message;
      console.error('Error al registrar usuario:', error);
    } finally {
      isLoading.value = false;
    }
  };

  const login = async (email, password) => {
    isLoading.value = true;
    errorMessage.value = '';

    try {
      const user = await loginUser(email, password);

      currentUser.value = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      isAuthenticated.value = true;
    } catch (error) {
      errorMessage.value = error.message;
      console.error('Error al iniciar sesión:', error);
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    currentUser.value = null;
    isAuthenticated.value = false;
  };

  return {
    currentUser,
    isAuthenticated,
    isLoading,
    errorMessage,
    isRegisterMode,
    name,
    email,
    password,
    registerUser,
    login,
    logout,
  };
});
