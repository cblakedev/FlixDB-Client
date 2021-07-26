import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

const ReviewDelete = (props) => {
    const [deleteReview, setDeleteReview] = useState(props.reviewToDelete.review);

    const reviewDelete = (event, review) => {
        event.preventDefault();
        fetch(`http://localhost:5000/delete/${props.reviewToDelete.id}`, {
            method: 'DELETE',
            body: JSON.stringify({log: {review: deleteReview}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => {
            props.fetchReviews();
            props.updateOff()
        })
    }

    return(
        <Modal isOpen={true}>
            <ModalHeader>Write A Review!</ModalHeader>
            <ModalBody>
                <Form onSubmit={reviewDelete}></Form>
                <Form>
                    <FormGroup>
                        <Label htmlFor="review">Delete Review:</Label>
                        <Input name="review" value={deleteReview} onChange={(e) => setDeleteReview(e.target.value)}/>
                    </FormGroup>
                    <Button type="submit">Update the Review!</Button>
                </Form>
            </ModalBody>
        </Modal>   
    )
}

export default ReviewDelete;