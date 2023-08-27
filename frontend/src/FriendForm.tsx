import { Friend } from './interfaces';
import React from 'react';

interface FriendFormState {
    name: string;
    birthday: string;
}

interface FriendFormProps {
    friend?: Friend;
    onSubmit: (friend: Friend) => void;
    isSubmitting: boolean; // Add the isSubmitting prop here.
    onDelete?: () => void; // Add the onDelete prop here.
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
                    <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} disabled={this.props.isSubmitting} />
                </label>
                <label>
                    Birthday:
                    <input type="date" name="birthday" value={this.state.birthday} onChange={this.handleInputChange} disabled={this.props.isSubmitting} />
                </label>
                <button type="submit" disabled={this.props.isSubmitting}>{this.props.friend ? "Update" : "Add"}</button> {/* change the button label based on the context */}
                {this.props.friend && this.props.onDelete && <button type="button" onClick={this.props.onDelete} disabled={this.props.isSubmitting}>Delete</button>}
            </form>
        )
    }
}

export default FriendForm;