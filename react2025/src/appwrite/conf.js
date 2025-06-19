import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";   

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async getPlayer(slug) {
  try {
    const res = await this.databases.listDocuments(
      config.appwriteDatabaseId,
      config.appwritePlayerCollectionId,
      [Query.equal("slug", slug)]
    );
    return res.documents[0] || null;
  } catch (error) {
    console.error("Error fetching player:", error);
    return null;
  }
}

  getFilePreview(fileId) {
    return this.bucket.getFileView(config.appwriteBucketId, fileId).toString();
}

}

const service = new Service();
export default service;