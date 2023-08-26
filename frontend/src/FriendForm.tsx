import { Friend } from './interfaces';
import React from 'react';

interface FriendFormState {
    name: string;
    birthday: string;
}

interface FriendFormProps {
    friend?: Friend; // make this prop optional
    onSubmit: (friend: Friend) => void;
}

class FriendForm extends React.Component<FriendFormProps, FriendFormState> {
    constructor(props: FriendFormProps) {
        super(props);
        this.state = {
            name: this.props.friend?.name || "", // use the friend prop if available, otherwise default to ""
            birthday: this.props.friend?.birthday.toString().slice(0, 10) || "" // use the friend prop if available, otherwise default to ""
        };

        console.log("friend: ", this.props.friend || "no friend...");

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ [event.target.name]: event.target.value } as Pick<FriendFormState, keyof FriendFormState>);
    }

    handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        
        const newFriend: Friend = {
            id: this.props.friend?.id || "", // use the friend prop if available, otherwise default to an empty string or generate a unique ID
            name: this.state.name,
            birthday: new Date(this.state.birthday)
        };

        this.props.onSubmit(newFriend);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                </label>
                <label>
                    Birthday:
                    <input type="date" name="birthday" value={this.state.birthday} onChange={this.handleInputChange} />
                </label>
                <button type="submit">{this.props.friend ? "Update" : "Add"}</button> {/* change the button label based on the context */}
            </form>
        )
    }
}

export default FriendForm;