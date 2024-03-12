'use client';

import Image from 'next/image';
import React from 'react';

// image
import iconGoogle from '@/assets/icon/gg.webp';
import { userAuth } from '@/FirebaseProvider';
const LoginPage = () => {
  const { googleSignIn } = userAuth();
  return (
    <div className='flex flex-col justify-center items-center w-screen h-screen'>
      <p>Hi</p>
      <button
        onClick={() => googleSignIn()}
        className='flex justify-center items-center gap-3 border rounded-lg p-4 mt-3'>
        <p>Login with Google </p>
        <Image
          src={iconGoogle}
          alt='gg icon'
          className='h-[30px] w-[30px] object-contain'
        />
      </button>
    </div>
  );
};

export default LoginPage;
