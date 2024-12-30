import {
  Client,
  Account,
  ID,
  Avatars,
  Storage,
  Databases,
  Query,
  ImageGravity,
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
      config.videoCollectionId,
      [Query.orderDesc('$createdAt')]
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

export const getFilePreview = async (fileId: string, type: string) => {
  let fileUrl = '';
  try {
    if (type === 'video') {
      fileUrl = (
        await storage.getFileView(fileId, config.storageId)
      ).toString();
    } else if (type === 'image') {
      fileUrl = (
        await storage.getFilePreview(
          fileId,
          config.storageId,
          2000,
          2000,
          ImageGravity.TOP,
          100
        )
      ).toString();
    } else {
      throw new Error('Invalid file type');
    }

    if (!fileUrl) throw new Error('Failed to get file preview');
    return fileUrl;
  } catch (error) {
    console.error(error);
    throw new Error(error as any);
  }
};

export const uploadFile = async (file: any, type: string) => {
  if (!file) return;

  const { minType, ...rest } = file;
  const asset = {
    name: file.filename,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    );
    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error as any);
  }
};

interface VideoForm {
  title: string;
  prompt: string;
  thumbnail: any;
  video: any;
}

export const createVideo = async (form: VideoForm): Promise<any> => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, 'image'),
      uploadFile(form.video, 'video'),
    ]);

    const newPost = await databases.createDocument(
      config.databaseId,
      config.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        prompt: form.prompt,
        thumbnail: thumbnailUrl,
        video: videoUrl,
      }
    );
    return newPost;
  } catch (error) {
    console.error(error);
    throw new Error(error as any);
  }
};
