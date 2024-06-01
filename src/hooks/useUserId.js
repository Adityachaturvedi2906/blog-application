import { useEffect, useState } from 'react';
import { auth } from '../utils/firebase'; // Import the auth object from your firebase.js file
import { onAuthStateChanged } from 'firebase/auth';

const useUserId = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.reloadUserInfo.localId); // Set the user ID when the authentication state changes
      } else {
        setUserId(null); // Set null if the user is not logged in
      }
    });

    return () => unsubscribe();
  }, []);

  return userId; // Return the user ID
};

export default useUserId;
