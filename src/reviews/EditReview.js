import React, {
    useState
} from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

const EditReviews = (props) => {
    const [userReview, setUserReview] = useState('');
    let id = props.selected.id;
    console.log(props.selected);

        const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://cb-movie-reviews-server.herokuapp.com/reviews/${id}`, {
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
                console.log(logData);
            })
    }

    return (
        <div>
            <Form className="reviewForm" onSubmit={handleSubmit}>
                <Input id="user-review" value={userReview} label="Edit Review" type="text" onChange={(e) => setUserReview(e.target.value)} />
                <Button className="homepageButton" id="submitReviewButton" type="submit" >Update Review</Button>
            </Form>
        </div>
    );
}

export default EditReviews;