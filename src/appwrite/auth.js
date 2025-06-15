import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  // ✅ Create user account
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return await this.login({ email, password });
      }
      return null;
    } catch (error) {
      console.error("AuthService :: createAccount :: error", error);
      throw error;
    }
  }

  // ✅ Login
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("AuthService :: login :: error", error);
      throw error;
    }
  }

  // ✅ Get current user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      return null;
    }
  }

  // ✅ Logout
  async logout() {
    try {
      await this.account.deleteSessions();
      return true;
    } catch (error) {
      console.error("AuthService :: logout :: error", error);
      return false;
    }
  }
}

export default new AuthService();
