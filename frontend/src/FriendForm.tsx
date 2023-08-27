import { Friend } from './interfaces';
import React, { useState } from 'react';

export interface FriendFormProps {
    friend?: Friend;
    onSubmit: (friend: Friend) => Promise<void>;
    onDelete?: (friendId: string) => Promise<void>; // updated to take friendId as input
}

const FriendForm: React.FC<FriendFormProps> = ({ friend, onSubmit, onDelete }) => {
    const [name, setName] = useState(friend?.name || "");
    const [birthday, setBirthday] = useState(friend?.birthday.toString().slice(0, 10) || "");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'name') {
            setName(event.target.value);
        } else if (event.target.name === 'birthday') {
            setBirthday(event.target.value);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        
        const newFriend: Friend = {
            id: friend?.id || "", 
            name: name,
            birthday: new Date(birthday)
        };

        await onSubmit(newFriend);
        setIsSubmitting(false);
    };

    const handleDelete = async () => {
        if(onDelete && friend?.id) {
            setIsSubmitting(true);
            await onDelete(friend.id); // pass the friend's id to the onDelete function
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