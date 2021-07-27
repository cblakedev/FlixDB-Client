import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

const ProfileCreate = (props) => {
    const [image, setImage] = useState('');
    const [UserBio, setUserBio] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/${props.id}`, {
            method: 'POST',
            body: JSON.stringify({user: {image: image, UserBio: UserBio}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => res.json())
            .then((UserData) => {
                console.log(UserData);
                setImage('');
                setUserBio('');
                props.fetchProfile();
            })
    }

    return(
        <Modal isOpen={true}>
            <ModalHeader>Write A Review!</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit}></Form>
                <Form>
                    <FormGroup>
                        <Label htmlFor="image"/>
                        <Input name="image" value={image} onChange={(e) => setImage(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="UserBio"/>
                        <Input type="select" name="UserBio" value={UserBio} onChange={(e) => setUserBio(e.target.value)}>   
                        </Input>
                    </FormGroup>
                    <Button type="submit">Create Your Profile</Button>
                </Form> 
            </ModalBody>
        </Modal>   

    )
}

export default ProfileCreate;