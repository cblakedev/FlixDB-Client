import React, { useState } from 'react';
import {Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalHeader} from 'reactstrap';

const EditReview = (props) => {
    const [editReview, setEditReview] = useState(props.review.review);

    const reviewUpdate = (event, review) => {
        event.preventDefault();
        fetch(`https://cb-movie-reviews-server.herokuapp.com/review/${props.review.id}`, {
            method: 'PUT',
            body: JSON.stringify({review: {review: editReview}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => {
            props.fetchReviews();
            props.updateOff();
        })
    }

    return(
        <Modal isOpen={true}>
            <ModalHeader>Update Review</ModalHeader>
            <ModalBody>
                <Form onSubmit={reviewUpdate}>
                    <FormGroup>
                        <Label htmlFor='review'>Edit Review:</Label>
                        <Input name='review' value={editReview} onChange={(e) => setEditReview(e.target.value)}/>
                    </FormGroup>
                    <Button type="submit">Update Review</Button>
                </Form>
            </ModalBody>
        </Modal>
    )

}

export default EditReview;