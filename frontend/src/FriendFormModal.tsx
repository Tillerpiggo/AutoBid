import React, { useState } from 'react';
import FriendForm, { FriendFormProps } from './FriendForm';
import { Friend } from './interfaces';

const FriendFormModal: React.FC<FriendFormProps> = (props) => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOpenModal = () => setIsModalVisible(true);
    const handleCloseModal = () => setIsModalVisible(false);

    const handleSubmitAndCloseModal = async (friend: Friend) => {
        await props.onSubmit(friend);
        handleCloseModal();
    };

    return (
        <>
            <button onClick={handleOpenModal}> {props.friend ? "Edit Friend" : "Add Friend"} </button>

            {isModalVisible && (
                <div onClick={handleCloseModal}
                    style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div onClick={e => e.stopPropagation()} 
                        style={{ backgroundColor: '#fff', margin: '10% auto', padding: '1em', width: '80%' }}>
                        <button onClick={handleCloseModal}>Close</button>
                        <FriendForm {...props} onSubmit={handleSubmitAndCloseModal} />
                    </div>
                </div>
            )}
        </>
    );
};

export default FriendFormModal;