import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

const ProfileEdit = (props) => {
    const [editImage, setEditImage] = useState(props.profileToUpdate.profile);
    const [editUserbio, setEditUserbio] = useState(props.profileToUpdate.profile);

    const profileUpdate = (event, profile) => {
        event.preventDefault();
        fetch(`http://localhost:5000/${props.profileToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({log: {image: editImage, UserBio: editUserbio}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => {
            props.fetchProfile();
            props.updateOff()
        })
    }

    return(
        <Modal isOpen={true}>
            <ModalHeader>Write A Review!</ModalHeader>
            <ModalBody>
                <Form onSubmit={profileUpdate}></Form>
                <Form>
                    <FormGroup>
                        <Label htmlFor="image">Update Your Image!:</Label>
                        <Input name="image" value={editImage} onChange={(e) => setEditImage(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="UserBio">Update Your User Bio!:</Label>
                        <Input name="UserBio" value={editUserbio} onChange={(e) => setEditUserbio(e.target.value)}/>
                    </FormGroup>
                    <Button type="submit">Update Your Profile!</Button>
                </Form>
            </ModalBody>
        </Modal>   
    )
}

export default ProfileEdit;