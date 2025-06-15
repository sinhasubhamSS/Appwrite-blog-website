import conf from "../conf/conf";
import {
  Client,
  ID,
  Databases,
  Storage,
  Query,
  Permission,
  Role,
} from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // ✅ Create a post
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug, // custom document ID
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.error("Appwrite Service :: createPost :: error", error);
      throw error;
    }
  }

  // ✅ Update a post
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.error("Appwrite Service :: updatePost :: error", error);
      throw error;
    }
  }

  // ✅ Delete a post
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.error("Appwrite Service :: deletePost :: error", error);
      return false;
    }
  }

  // ✅ Get a single post by ID
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.error("Appwrite Service :: getPost :: error", error);
      return null;
    }
  }

  // ✅ Get all active posts
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("Appwrite Service :: getPosts :: error", error);
      return null;
    }
  }

  // ✅ Upload a file to Appwrite bucket — with public read permission
  async uploadFile(file) {
    try {
      const uploadedFile = await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
        [Permission.read(Role.any())] // Allow public read access
      );
      return uploadedFile;
    } catch (error) {
      console.error("Appwrite Service :: uploadFile :: error", error);
      throw error;
    }
  }

  // ✅ Delete a file by ID
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("Appwrite Service :: deleteFile :: error", error);
      return false;
    }
  }

  // ✅ Get file preview URL
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
