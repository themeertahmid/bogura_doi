import React, { useState, useEffect } from 'react';
import { db } from '../firebase.config';
import { collection, onSnapshot } from 'firebase/firestore';

const useGetData = (collectionName) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const collectionRef = collection(db, collectionName);

        const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
            const fetchedData = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            setData(fetchedData);
            setLoading(false);
        });

        // Cleanup function to unsubscribe from the snapshot listener
        return () => unsubscribe();
    }, [collectionName]);

    return { data, loading };
};

export default useGetData;
