import React, { useState } from 'react';
import FriendForm, { FriendFormProps } from './FriendForm';
import { Friend } from './interfaces';
import ActionButton from './ActionButton';
import GrayButton from './GrayButton';
import { Center } from '@chakra-ui/react';

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
            {props.friend ? (
                <GrayButton
                label="Edit"
                handleClick={handleOpenModal}
                />
            ) : (
                <ActionButton
                label="Add Contact"
                handleClick={handleOpenModal}
                />
            )}
    
            {isModalVisible && (
                <div onClick={handleCloseModal}
                    style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Center onClick={e => e.stopPropagation()} 
                        style={{ backgroundColor: '#fff', padding: '1em', width: '80%', maxHeight: '80%', overflow: 'auto' }}>
                        <button onClick={handleCloseModal}>Close</button>
                        <FriendForm {...props} onSubmit={handleSubmitAndCloseModal} />
                    </Center>
                </div>
            )}
        </>
    );
};

export default FriendFormModal;