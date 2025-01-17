const baseURL = 'https://6789c2dddd587da7ac27914c.mockapi.io/verifarma-play-api';

export const useUsersApi = () => {

  const createUser = async (email: string, password: string, name: string): Promise<any> => {
    try {
      const response = await $fetch(`${baseURL}/users`, {
        method: 'POST',
        body: {
          email,
          password,
          name,
        },
      });

      return response;
    } catch (error: any) {
      console.error('Error al crear usuario:', error.message);
      throw error;
    }
  };

  const loginUser = async (email: string, password: string): Promise<any> => {
    try {
      const response: any[] = await $fetch(`${baseURL}/users`, {
        method: 'GET',
      });
  
      const user = response.find((u: any) => u.email === email && u.password === password);
  
      if (!user) {
        throw new Error('Credenciales inválidas');
      }
  
      return user;
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error.message);
      throw error;
    }
  };  

  return {
    createUser,
    loginUser,
  };
};
