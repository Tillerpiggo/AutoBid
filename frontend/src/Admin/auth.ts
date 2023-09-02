import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const useAuth = () => {
    const [user, setUser] = useState<firebase.User | null>(null);
    const [loading, setLoading] = useState(true);  // Initialize loading state to true

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            console.log('useAuth, onAuthStateChanged', user);
            setUser(user);
            setLoading(false);  // Set loading to false once we receive the auth state
        });

        // Cleanup subscription on unmount
        return unsubscribe;
    }, []);

    const signIn = async (email: string, password: string) => {
        try {
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log('useAuth, signIn', userCredential.user);
            setUser(userCredential.user);
            return userCredential.user;
        } catch (error) {
            console.error("Error signing in with password and email", error);
            throw error;
        }
    };

    console.log('useAuth, current user', user);

    return {
        user,
        loading,  // Add loading to the returned object
        signIn,
    };
};

export default useAuth;