import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {getCurrentUser} from "../service/authService";

const Profile: React.FC = () => {
    const [profile, setProfile] = useState({ username: '', email: '' });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const user = getCurrentUser();
                const response = await axios.get('https://simon123.pythonanywhere.com//profile/', {
                    headers: {
                        Authorization: `Bearer ${user.access}`,
                    },
                });
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, []);

    return (
        <div>
            <h2>Profile</h2>
            <p>Username: {profile.username}</p>
            <p>Email: {profile.email}</p>
        </div>
    );
};

export default Profile;
