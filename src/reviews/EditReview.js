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
    const [userReview, setUserReview] = useState('');
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
        }

        const handleDelete = (x) => {
            x.preventDefault();

            fetch(`${APIURL}reviews/delete/${id}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${props.token}`
                })
            })
            console.log("Review deleted");
        }

    return (
        <div>
            <Form className="reviewForm" onSubmit={handleSubmit}>
                <Input id="user-review" value={userReview} label="Edit Review" type="text" onChange={(e) => setUserReview(e.target.value)} />
                <Button className="homepageButton" id="submitReviewButton" type="submit" >Update Review</Button>
            </Form>
            <Form className="deleteForm" onSubmit={handleDelete}>
                <Button className="homepageButton" id="submitDeleteButton" type="submit" >Delete Review</Button>
            </Form>
        </div>
    );
}

export default EditReviews;