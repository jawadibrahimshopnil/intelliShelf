import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from './../firebase.config';
import axios from "axios";

const auth = getAuth(app)
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }
    const logOutUser = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            // because current will be null if logout, so cant find email for cookie clear
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = {email: userEmail};
            setUser(currentUser);
            console.log('current user', currentUser);
            setLoading(false);

            if(currentUser){
                axios.post('https://intellishelf-server.vercel.app/jwt', loggedUser, {withCredentials: true})
                .then(res=>{
                    console.log("token", res.data);
                })
            }else{
                axios.post('https://intellishelf-server.vercel.app/logout', loggedUser, {withCredentials: true})
                .then(res=>{
                    console.log(res.data)
                })
            }
        })
        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        signInUser,
        signInWithGoogle,
        logOutUser
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;