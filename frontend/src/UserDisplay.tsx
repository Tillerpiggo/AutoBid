import React, { useState, useEffect } from 'react';
import { User } from './interfaces';
import { useParams } from 'react-router-dom';

interface UserDisplayProps {
    user: User;
}

interface RouteParams {
    email: string;
}

const UserDisplay: React.FC<UserDisplayProps> = ({ user }) => {
    const { email } = useParams();
    
    return (
        <div>
            <h1>{email}</h1>
        </div>
    )
};

export default UserDisplay;