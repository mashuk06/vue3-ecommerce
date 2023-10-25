import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    users: [],
    currentUser: null,
  }),
  actions: {
    checkPassword(password, confirmPassword) {
      return password === confirmPassword;
    },
    checkExistingUser(email) {
      return this.users.some((user) => user.email === email)
    },
    login(email, password) {
      const user = this.users.find(
        (user) => user.email === email && user.password === password
      )
      if (user) {
        this.currentUser = Object.assign({}, user)
        return true
      } else {
        return false
      }
    },
    registration(user) {
      this.users.push(user)
    },
    logout() {
      this.currentUser = null;
    },
  },
  persist: true,
});
