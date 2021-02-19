import { db, storage } from './firebase'
import { CreateTweet } from '../entities/Tweet'

const usersFirestoreRef = db.collection('users')
const usersStorageRef = storage.ref('users')

const setTweetImage = async (uid: string, tweetID: string, fileName: string, blob: Blob) => {
  const userStorageRef = usersStorageRef.child(uid)
  const task = userStorageRef.child(`tweets/${tweetID}/${fileName}.png`).put(blob, { contentType: 'image/png' })

  return task
    .then((sanpshop) => sanpshop.ref.getDownloadURL())
    .then((url: string) => {
      return url
    })
    .catch((e) => {
      console.warn(e)
      return null
    })
}

const getTweetsRef = (uid: string) => {
  const tweersRef = usersFirestoreRef.doc(uid).collection('tweets')
  return tweersRef
}

export const createTweet = async (uid: string, data: CreateTweet) => {
  const tweetsRef = getTweetsRef(uid)
  const tweetRef = tweetsRef.doc()

  const fileURLs = []
  if (data.fileBlobs) {
    const storageTask = data.fileBlobs.map(async (blob, index) => {
      const fileURL = await setTweetImage(uid, tweetRef.id, `image${index + 1}`, blob)
      fileURLs.push(fileURL)
    })

    await Promise.all(storageTask)
  }

  await tweetRef.set({
    text: data.text,
    fileURLs,
    writer: data.writer,
  })
  return { result: true }
}