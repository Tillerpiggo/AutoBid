import { Friend } from './interfaces'

interface FriendItemProps {
    friend: Friend;
    onEdit: (friend: Friend) => void;
    onDelete: (id: string) => void;
}

const FriendItem: React.FC<FriendItemProps> = ({ friend, onEdit, onDelete }) => {
    return (
        <div>
            <h2>{friend.name}</h2>
            <p>{friend.birthday.toString()}</p>
            <button onClick={() => onEdit(friend)}>Edit</button>
            <button onClick={() => onDelete(friend.id)}>Delete</button>
        </div>
    )
}

export default FriendItem;