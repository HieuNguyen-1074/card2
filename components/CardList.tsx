import React from 'react';
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { app } from '@/firebase';
export default async function CardList() {
  const collectionFirebase = await collection(getFirestore(app), 'CardApp');

  const cards = await query(
    collectionFirebase,
    where('isFivorite', '==', true)
  );
  onSnapshot(cards, (snapshot) => {
    const books: any = [];
    snapshot.docs.forEach((card) => {
      books.push(card.data());
    });
  });

  const listCard = console.log('uid');
  return <div>ghhghgh </div>;
}
