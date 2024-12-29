import {
  Client,
  Account,
  ID,
  Avatars,
  Storage,
  Databases,
  Query,
} from 'react-native-appwrite';

export const config = {
  platform: 'com.sima.aora',
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || '',
  storageId: process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID || '',
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_ID || '',
  videoCollectionId: process.env.EXPO_PUBLIC_APPWRITE_VIDEO_ID || '',
};

export const client = new Client();
client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

export const avatars = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error('Account creation failed');

    const avatarUrl = avatars.getInitials(username);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.error(error);
    throw new Error(error as any);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error(error);
    throw new Error(error as any);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error('No user found');
    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );

    if (!currentUser) throw new Error('No user found');
    return currentUser.documents[0];
  } catch (error) {
    console.error(error, 'Failed to get current user');
    throw new Error(error as any);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId
    );

    if (!posts) throw new Error('No posts found');
    return posts.documents;
  } catch (error) {
    console.error(error);
    throw new Error(error as any);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc('$createdAt'), Query.limit(7)]
    );

    if (!posts) throw new Error('No posts found');
    return posts.documents;
  } catch (error) {
    console.error(error);
    throw new Error(error as any);
  }
};

export const searchPosts = async (query: string) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search('title', query)]
    );

    if (!posts.documents.length) throw new Error('No posts found');
    return posts.documents;
  } catch (error) {
    console.error('Error in searchPosts:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await account.deleteSession('current');
  } catch (error) {
    console.error(error);
    throw new Error(error as any);
  }
};
