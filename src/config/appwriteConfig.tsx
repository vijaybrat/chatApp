import { Client, Account, Databases } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65e0465f50fc06dd2262");

export const account = new Account(client);
export const databases = new Databases(client);

export const DATABASE_ID = "65e18ea7dd731a17d606";
export const COMMUNITY_COLLECTION_ID = "65e18eb9da8debdf51a8";
// export const CHAT_COLLECTION_ID = "__Chat Collection Id__";