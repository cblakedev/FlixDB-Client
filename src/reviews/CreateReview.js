import React, {
    useState
} from 'react';
import {
    Button,
    Form,
    Input
} from 'reactstrap';
import APIURL from '../helpers/environment';
import AddWatchList from './AddToWatchList';

const CreateReview = (props) => {
    const [userReview, setUserReview] = useState('');

    let title = props.selected.title.toLowerCase();
    let description = props.selected.overview;
    let imageURL = props.selected.poster_path;


    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${APIURL}reviews/create`, {
            method: 'POST',
            body: JSON.stringify({
                review: {
                    title: title,
                    description: description,
                    review: userReview,
                    imageURL: imageURL
                }
            }),
            headers: new Headers({
                'Content-Type': "application/json",
                'Authorization': `Bearer ${props.token}`
            })
        }).then((res) => res.json())
        props.closeModal()
    }

    return (
        <div>
            <Form className="reviewForm" onSubmit={handleSubmit}>
                <Input required type='textarea' id="user-review" value={userReview} label="Write a Review" onChange={(e) => setUserReview(e.target.value)} />
                <Button className="homepageButton" id="submitReviewButton" type="submit" >Submit Review</Button>
                <AddWatchList selected={props.selected} closeModal={props.closeModal} token={props.token} />
            </Form>
        </div>
    )
}

export default CreateReview;