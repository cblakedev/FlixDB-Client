import React, {
    useState
} from 'react';
import {
    Button,
    Form,
    Input
} from 'reactstrap';
import APIURL from '../helpers/environment';

const EditReviews = (props) => {
    const [userReview, setUserReview] = useState(props.review);
    let id = props.selected.id;

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${APIURL}reviews/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                review: {
                    review: userReview
                }
            }),
            headers: new Headers({
                'Content-Type': "application/json",
                'Authorization': `Bearer ${props.token}`
            })
        }).then((res) => res.json())
            .then((logData) => {
            })

        props.closeModal();
    }

    const handleDelete = (e) => {
        e.preventDefault();

        fetch(`${APIURL}reviews/delete/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            })
        })
        console.log("Review deleted");
        props.closeModal();
    }

    return (
        <div>
            <Form className="reviewForm" onSubmit={handleSubmit}>
                <Input required id="user-review" value={userReview} label="Edit Review" type="textarea" onChange={(e) => setUserReview(e.target.value)} />
                <Button id="submitReviewButton" type="submit" >Update Review</Button>
                <Button id="submitDeleteButton" onClick={(e) => handleDelete(e)}>Delete Review</Button>
            </Form>

        </div>
    );
}

export default EditReviews;