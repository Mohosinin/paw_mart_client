import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.init";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        setUserRole(null);
        setIsAdmin(false);
        setIsSeller(false);
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    // Save or update user in database
    const saveUserToDB = async (userData) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users`, userData);
            return response.data;
        } catch (error) {
            console.error("Error saving user:", error);
        }
    }

    // Fetch user role from database
    const fetchUserRole = async (email) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/email/${email}`);
            const role = response.data?.role || 'user';
            setUserRole(role);
            setIsAdmin(role === 'admin');
            setIsSeller(role === 'seller' || role === 'admin');
            return role;
        } catch (error) {
            console.error("Error fetching user role:", error);
            setUserRole('user');
            return 'user';
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            
            if (currentUser) {
                // Save/update user in database and fetch role
                const userData = {
                    email: currentUser.email,
                    name: currentUser.displayName,
                    photo: currentUser.photoURL,
                };
                await saveUserToDB(userData);
                await fetchUserRole(currentUser.email);
            } else {
                setUserRole(null);
                setIsAdmin(false);
                setIsSeller(false);
            }
            
            setLoading(false);
        });
        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        userRole,
        isAdmin,
        isSeller,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateUserProfile,
        resetPassword,
        saveUserToDB,
        fetchUserRole
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
