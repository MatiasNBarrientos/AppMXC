import AsyncStorage from '@react-native-async-storage/async-storage';


const StorageKeys = {
  USER_DATA: 'userData',
  IS_LOGGED_IN: 'isLoggedIn',
};


interface UserData {
  nombre: string;
  username: string;
  email: string;
  password: string;
}


export const UserStorage = {
  
  saveUserData: async (userData: UserData): Promise<void> => {
    try {
      await AsyncStorage.setItem(StorageKeys.USER_DATA, JSON.stringify(userData));
    } catch (error) {
      console.error('Error al guardar datos del usuario:', error);
      throw error;
    }
  },

  
  getUserData: async (): Promise<UserData | null> => {
    try {
      const data = await AsyncStorage.getItem(StorageKeys.USER_DATA);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      throw error;
    }
  },

  
  updateUserData: async (newData: Partial<UserData>): Promise<void> => {
    try {
      const currentData = await UserStorage.getUserData();
      if (currentData) {
        const updatedData = { ...currentData, ...newData };
        await UserStorage.saveUserData(updatedData);
      }
    } catch (error) {
      console.error('Error al actualizar datos del usuario:', error);
      throw error;
    }
  },

  
  removeUserData: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(StorageKeys.USER_DATA);
    } catch (error) {
      console.error('Error al eliminar datos del usuario:', error);
      throw error;
    }
  },

  
  setLoggedIn: async (isLoggedIn: boolean): Promise<void> => {
    try {
      await AsyncStorage.setItem(StorageKeys.IS_LOGGED_IN, JSON.stringify(isLoggedIn));
    } catch (error) {
      console.error('Error al guardar estado de sesión:', error);
      throw error;
    }
  },

  isLoggedIn: async (): Promise<boolean> => {
    try {
      const value = await AsyncStorage.getItem(StorageKeys.IS_LOGGED_IN);
      return value === 'true';
    } catch (error) {
      console.error('Error al obtener estado de sesión:', error);
      return false;
    }
  },

  
  changePassword: async (oldPassword: string, newPassword: string): Promise<boolean> => {
    try {
      const userData = await UserStorage.getUserData();
      if (!userData) {
        throw new Error('No se encontraron datos del usuario');
      }

      
      if (userData.password !== oldPassword) {
        return false;
      }

      
      await UserStorage.updateUserData({
        ...userData,
        password: newPassword
      });

      return true;
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      throw error;
    }
  },
};