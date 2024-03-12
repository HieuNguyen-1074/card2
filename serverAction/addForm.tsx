'use server';

import { app } from '@/firebase';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { validate } from './validate.js';
export async function addEntry(state: any, data: FormData | null) {
  if (!data) {
    return;
  }
  const fileInput = data.get('fileInput') as File;
  const title = data.get('title') as string;
  const isFivorite = Boolean(data.get('favorite')) as boolean;
  const description = data.get('description') as string;
  const uid = data.get('uid') as string;
  const imageId = guidGenerator();
  const storage = ref(getStorage(app), `images/${imageId}`);

  try {
    const validateCard = validate.card.safeParse({
      title,
      description,
      fileInput,
    });
    //handle validate
    if (!validateCard.success) {
      console.log(validateCard.error.flatten().fieldErrors);
      return {
        error: validateCard.error.flatten().fieldErrors,
      };
      // return validateCard.error;
    }
    // validate success
    if (fileInput && typeof fileInput === 'object') {
      await uploadBytes(storage, fileInput);
      const url = await getDownloadURL(storage);
      const store = getFirestore(app);
      store;
      const data = await setDoc(doc(store, 'CardApp', imageId), {
        viewImage: url,
        title,
        isFivorite,
        description,
        uid,
      });

      return {
        isSuccess: true,
        data: data,
      };
    }
  } catch (error) {
    console.log(error);
  }
}

function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
}
