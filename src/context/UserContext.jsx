import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import FashionThrobber from '../components/FashionThrobber';

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initial State
    const [userProfile, setUserProfile] = useState({
        name: '',
        gender: 'women',
        age: '',
        height: '',
        bodyType: '',
        skinTone: '',
        hairColor: '',
        eyeColor: '',
        faceStructure: '',
    });
    const [wardrobe, setWardrobe] = useState([]);

    // Auth & Data Listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                if (!user.emailVerified) {
                    await signOut(auth);
                    setCurrentUser(null);
                    setLoading(false);
                    return;
                }

                setCurrentUser(user);

                // Real-time Firestore Listener
                import('firebase/firestore').then(({ doc, onSnapshot }) => {
                    import('../firebase').then(({ db }) => {
                        const unsubData = onSnapshot(doc(db, "users", user.uid), (doc) => {
                            if (doc.exists()) {
                                const data = doc.data();
                                setUserProfile(data.profile || {});
                                setWardrobe(data.wardrobe || []);
                            }
                        });
                        // Cleanup data listener on unmount or user change (not strictly handled here for simplicity, but good practice)
                    });
                });
            } else {
                setCurrentUser(null);
                setUserProfile({ name: '', gender: 'women' }); // Reset defaults
                setWardrobe([]);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    // Actions (Write to Firestore)
    const updateProfile = async (updates) => {
        if (!currentUser) return;
        const newProfile = { ...userProfile, ...updates };
        // Optimistic update
        setUserProfile(newProfile);

        try {
            const { doc, setDoc } = await import('firebase/firestore');
            const { db } = await import('../firebase');
            await setDoc(doc(db, "users", currentUser.uid), {
                profile: newProfile
            }, { merge: true });
        } catch (e) {
            console.error("Error updating profile:", e);
        }
    };

    const addToWardrobe = async (item) => {
        if (!currentUser) return;
        const newItem = { ...item, id: Date.now().toString() };
        const newWardrobe = [...wardrobe, newItem];

        setWardrobe(newWardrobe); // Optimistic

        try {
            const { doc, updateDoc } = await import('firebase/firestore');
            const { db } = await import('../firebase');
            await updateDoc(doc(db, "users", currentUser.uid), {
                wardrobe: newWardrobe
            });
        } catch (e) {
            console.error("Error adding item:", e);
        }
    };

    const removeFromWardrobe = async (itemId) => {
        if (!currentUser) return;
        const newWardrobe = wardrobe.filter(item => item.id !== itemId);

        setWardrobe(newWardrobe); // Optimistic

        try {
            const { doc, updateDoc } = await import('firebase/firestore');
            const { db } = await import('../firebase');
            await updateDoc(doc(db, "users", currentUser.uid), {
                wardrobe: newWardrobe
            });
        } catch (e) {
            console.error("Error removing item:", e);
        }
    };

    const clearWardrobe = async () => {
        if (!currentUser) return;
        setWardrobe([]);
        try {
            const { doc, updateDoc } = await import('firebase/firestore');
            const { db } = await import('../firebase');
            await updateDoc(doc(db, "users", currentUser.uid), {
                wardrobe: []
            });
        } catch (e) {
            console.error("Error clearing wardrobe:", e);
        }
    };

    const logout = () => {
        return signOut(auth);
    };

    const value = {
        currentUser,
        userProfile,
        wardrobe,
        updateProfile,
        addToWardrobe,
        removeFromWardrobe,
        clearWardrobe,
        logout
    };

    return (
        <UserContext.Provider value={value}>
            {loading ? <FashionThrobber /> : children}
        </UserContext.Provider>
    );
};
