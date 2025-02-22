import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HelloWorld: React.FC = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('https://simon123.pythonanywhere.com//hello/')
            .then(response => {
                setMessage(response.data.message);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
}

export default HelloWorld;
