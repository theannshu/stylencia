import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

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
    const [userProfile, setUserProfile] = useState(() => {
        const saved = localStorage.getItem('stylencia_user_profile');
        return saved ? JSON.parse(saved) : {
            name: '',
            gender: 'women', // Default
            age: '',
            height: '',
            bodyType: '', // e.g., Hourglass, Pear, Rectangle
            skinTone: '', // e.g., Fair, Medium, Dark
            hairColor: '',
            eyeColor: '',
            faceStructure: '', // e.g., Oval, Round, Square
        };
    });

    const [wardrobe, setWardrobe] = useState(() => {
        const saved = localStorage.getItem('stylencia_wardrobe');
        return saved ? JSON.parse(saved) : [];
    });

    // Auth Listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    // Persistence Effects
    useEffect(() => {
        localStorage.setItem('stylencia_user_profile', JSON.stringify(userProfile));
    }, [userProfile]);

    useEffect(() => {
        localStorage.setItem('stylencia_wardrobe', JSON.stringify(wardrobe));
    }, [wardrobe]);

    // Actions
    const updateProfile = (updates) => {
        setUserProfile(prev => ({ ...prev, ...updates }));
    };

    const addToWardrobe = (item) => {
        setWardrobe(prev => [...prev, { ...item, id: Date.now().toString() }]);
    };

    const removeFromWardrobe = (itemId) => {
        setWardrobe(prev => prev.filter(item => item.id !== itemId));
    };

    const clearWardrobe = () => {
        setWardrobe([]);
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
            {!loading && children}
        </UserContext.Provider>
    );
};
