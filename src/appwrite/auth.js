import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";
export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("66667e23003b05520238");
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        //call another method
        return this.login({ username, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }
  async login({ emai, password }) {
    try {
      return await this.account.createEmailPasswordSessionl(emai, password);
    } catch (error) {
      throw error;
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
    return null;
  }
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}
const authservice = new AuthService();
export default authservice;
