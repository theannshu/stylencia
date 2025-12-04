import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider = ({ children }) => {
    // Initial State
    const [userProfile, setUserProfile] = useState(() => {
        const saved = localStorage.getItem('stylencia_user_profile');
        return saved ? JSON.parse(saved) : {
            name: '',
            gender: 'women', // Default
            height: '',
            bodyType: '', // e.g., Hourglass, Pear, Rectangle
            skinTone: '', // e.g., Fair, Medium, Dark
        };
    });

    const [wardrobe, setWardrobe] = useState(() => {
        const saved = localStorage.getItem('stylencia_wardrobe');
        return saved ? JSON.parse(saved) : [];
    });

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

    const value = {
        userProfile,
        wardrobe,
        updateProfile,
        addToWardrobe,
        removeFromWardrobe,
        clearWardrobe
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
