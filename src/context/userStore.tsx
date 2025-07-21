import { create } from 'zustand';

// Constants
const USER_KEY = 'user_data';

interface UserState {
  user: any;
  setUser: (user: any) => void;
  logout: () => void;
}

// Load user data from sessionStorage
const getUserFromStorage = () => {
  const storedUser = sessionStorage.getItem(USER_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
};

const useUserStore = create<UserState>((set) => ({
  user: getUserFromStorage(), // Load from storage when the store initializes
  setUser: (user) => {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user)); // Store in sessionStorage
    set({ user });
  },
  logout: () => {
    sessionStorage.removeItem(USER_KEY); // Remove from sessionStorage
    set({ user: null });
  },
}));

export default useUserStore;
