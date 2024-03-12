'use client';

import { userAuth } from '@/FirebaseProvider';
import { addEntry } from '@/serverAction/addForm';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
//icon
import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';

export default function CardForm({
  actionType,
  isOpen,
  close,
}: {
  actionType: string;
  isOpen: boolean;
  close: () => void;
}) {
  //state
  const [state, formAction] = useFormState(addEntry, null);
  const [image, setImage] = useState<null | string>(null);
  const [favorite, setFavorite] = useState<boolean>(false);
  const { user } = userAuth();
  //effects
  useEffect(() => {
    if (state?.isSuccess) {
      close();
    }
  }, [state]);
  //handle events
  //upload
  const onFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files) {
        const imageReader = URL.createObjectURL(e.target.files[0]);
        setImage(imageReader);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // // handle  event that click out of form
  // const handleOutOfForm = (e: MouseEvent<HTMLDivElement>) => {
  //   console.log(e);
  // };
  // submit form
  const submitForm = async (data: FormData) => {
    try {
      data.append('favorite', 'true');
      data.append('uid', user?.uid);
      await formAction(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={
        (isOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none') +
        '  transition-all fixed w-screen h-screen bg-[rgba(0,0,0,.5)] z-50 top-0 left-0 flex justify-center items-center'
      }>
      <form
        action={submitForm}
        className='flex justify-center items-center flex-col gap-3 bg-white p-10 rounded-lg w-[400px]'>
        <p
          className='cursor-pointer'
          onClick={close}>
          Close
        </p>
        <div className='w-full'>
          <div className='flex  justify-around items-center gap-3 w-full'>
            <input
              type='text'
              className='border p-2 outline-none w-full flex-1'
              placeholder='Title'
              name='title'
            />
            <div
              className='cursor-pointer'
              onClick={() => setFavorite(!favorite)}>
              {favorite ? (
                <FaHeart
                  size={35}
                  color='red'
                />
              ) : (
                <FaRegHeart size='34' />
              )}
            </div>
          </div>
          {state?.error?.title && (
            <p className='text-red-600'>{state?.error?.title[0]}</p>
          )}
        </div>
        <textarea
          className='border outline-none resize-none w-full p-2 box-border'
          name='description'></textarea>
        {state?.error?.description && (
          <p className='text-red-600'>{state?.error?.description[0]}</p>
        )}
        <div className='flex flex-col justify-center items-center w-full'>
          <label
            htmlFor='fileInput'
            className='border w-full py-3 text-center cursor-pointer'>
            Upload file image
          </label>
          <input
            id='fileInput'
            name='fileInput'
            type='file'
            onChange={onFileUpload}
            style={{ display: 'none' }}
          />
          {image ? (
            <Image
              src={image}
              alt='image'
              className='mt-3'
              width={100}
              height={100}
            />
          ) : (
            ''
          )}
          {state?.error?.fileInput && (
            <p className='text-red-600'>{state?.error?.fileInput[0]}</p>
          )}
        </div>
        <button
          type='submit'
          className='border p-3 '>
          {actionType === 'add' ? 'Add' : 'Update'}
        </button>
      </form>
    </div>
  );
}
