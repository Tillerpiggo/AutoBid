import { Friend } from './interfaces';
import React, { useState } from 'react';

export interface FriendFormProps {
    friend?: Friend;
    onSubmit: (friend: Friend) => Promise<void>;
    onDelete?: (friendId: string) => Promise<void>;
}

const FriendForm: React.FC<FriendFormProps> = ({ friend, onSubmit, onDelete }) => {
    console.log(`Initial friend birthday from props in UTC: ${friend?.birthday}`);

    const initialBirthday = friend?.birthday ? new Date(friend.birthday).toISOString().slice(0, 10) : "";
    console.log(`Initial birthday for state (local): ${initialBirthday}`);
    const [name, setName] = useState(friend?.name || "");
    const [birthday, setBirthday] = useState(initialBirthday);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'name') {
            setName(event.target.value);
        } else if (event.target.name === 'birthday') {
            console.log(`New birthday input (local): ${event.target.value}`);
            setBirthday(event.target.value);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);

        const utcBirthday = new Date(birthday);
        console.log(`Converted birthday to Date object (UTC): ${utcBirthday}`);
        
        const newFriend: Friend = {
            id: friend?.id || "", 
            name: name,
            birthday: utcBirthday
        };

        console.log(`Submitting new friend object with birthday (UTC): ${newFriend.birthday}`);
        await onSubmit(newFriend);
        setIsSubmitting(false);
    };

    const handleDelete = async () => {
        if(onDelete && friend?.id) {
            setIsSubmitting(true);
            await onDelete(friend.id);
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={name} onChange={handleInputChange} disabled={isSubmitting} />
            </label>
            <label>
                Birthday:
                <input type="date" name="birthday" value={birthday} onChange={handleInputChange} disabled={isSubmitting} />
            </label>
            <button type="submit" disabled={isSubmitting}>{friend ? "Update" : "Add"}</button>
            {friend && onDelete && <button type="button" onClick={handleDelete} disabled={isSubmitting}>Delete</button>}
        </form>
    )
}

export default FriendForm;