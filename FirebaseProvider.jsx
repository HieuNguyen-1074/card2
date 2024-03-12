'use client';
import { createContext, useContext, useEffect, useState } from 'react';
//firebase
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  getAuth,
} from 'firebase/auth';
import { auth } from './firebase';
//router
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import routerPath from './routerPath';

import { ToastContainer, toast } from 'react-toastify';

// create firebase context
const firebaseContext = createContext();
// Main component

export const FirebaseContextProvider = ({ children }) => {
  //state
  const [user, setUser] = useState(null);

  let autheFlag = false;

  const pathVal = usePathname();
  const router = useRouter();

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((userdata) => {
      toast('Login successed. ', {
        type: 'success',
      });
      setUser(user);
      // cookies().set('uid', userdata.user.uid);
      router.push(`${routerPath.HOME.path}/?uid=${userdata.user.uid}`);
    });
  };
  const logOut = () => {
    signOut(auth).then((data) => {
      router.push(routerPath.LOGIN.path);
      toast('logout', {
        type: 'warning',
      });
      setUser(null);
    });
  };

  // useEffect
  useEffect(() => {
    const unsubscribeFunc = async function () {
      const unsubscribe = await auth.onAuthStateChanged((data) => {
        let currentPathIsPublic = true;
        if (autheFlag) {
          return;
        }
        autheFlag = true;
        for (const key in routerPath) {
          if (Object.hasOwnProperty.call(routerPath, key)) {
            const pathObject = routerPath[key];

            if (pathObject?.path === pathVal) {
              currentPathIsPublic = pathObject?.isPublic;
            }
          }
        }

        if (!currentPathIsPublic && !data?.uid) {
          router.push(routerPath.LOGIN.path);

          toast('you have to login first.', {
            type: 'warning',
          });
        } else if (data?.uid && pathVal === routerPath.LOGIN.path) {
          router.push(`${routerPath.HOME.path}/?uid=${userdata.user.uid}`);

          toast('Login successed. ', {
            type: 'success',
          });
        }

        setUser(data);
      });

      return unsubscribe;
    };
    unsubscribeFunc && unsubscribeFunc();
  }, []);

  return (
    <firebaseContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </firebaseContext.Provider>
  );
};
export const userAuth = () => {
  return useContext(firebaseContext);
};
