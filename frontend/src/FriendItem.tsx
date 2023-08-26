import { Friend } from './interfaces'

interface FriendItemProps {
    friend: Friend;
    onEdit: (friend: Friend) => void;
}

const FriendItem: React.FC<FriendItemProps> = ({ friend, onEdit }) => {
    return (
        <div>
            <h2>{friend.name}</h2>
            <p>{friend.birthday.toString()}</p>
            <button onClick={() => onEdit(friend)}>Edit</button>
        </div>
    )
}

export default FriendItem;