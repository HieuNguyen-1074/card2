'use client';

import { userAuth } from '@/FirebaseProvider';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

//component
import CardForm from '@/components/CardForm';

export default function Home() {
  // state
  const { user, logOut } = userAuth();
  const [isOpenFormCard, setIsOpenFormCard] = useState<boolean>(false);

  const router = useRouter();
  //handle event
  const closeFormCard = function () {
    setIsOpenFormCard(false);
  };

  const openFormCard = function () {
    setIsOpenFormCard(true);
  };

  return (
    <>
      <div>
        <h1>Hi! {user?.displayName}</h1>
        <button onClick={() => logOut()}>log out</button>
        <button onClick={openFormCard}>
          <svg
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            className='bi bi-plus'
            viewBox='0 0 16 16'>
            <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z' />{' '}
          </svg>
        </button>
      </div>

      <CardForm
        isOpen={isOpenFormCard}
        actionType='add'
        close={closeFormCard}
      />
    </>
  );
}
