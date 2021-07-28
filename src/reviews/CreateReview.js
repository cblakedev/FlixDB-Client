import React, {
    useState
} from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap'
import SearchBar from "./MainHome";

const CreateReview = (props) => {
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ imageURL, setImageURL ] = useState('');
    const [ userReview, setUserReview ] = useState('');

    setTitle(props.selected.title);
    setDescription(props.selected.overview);
    setImageURL(props.selected.poster_path);

    console.log(props.selected);

    const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://cb-movie-reviews-server.herokuapp.com/review/create', {
        method: 'POST',
        body: JSON.stringify({review: {
            title: title,
            description: description,
            review: userReview,
            imageURL: imageURL
        }}),
        headers: new Headers({
            'Content-Type': "application/json",
            'Authorization': props.token
        })
    }).then((res) => res.json())
    .then((logData) => {
        console.log(logData);
        props.fetchMovies();
    })
    }

        return (
            <div>
                <Form className="reviewForm">
                    <Input id="user-review" value={userReview} label="Write a Review" type="text" onChange={(e) => setUserReview(e.target.value)} />
                    <Button className="homepageButton" id="submitReviewButton" onClick={() => handleSubmit}>Submit Review</Button>
                </Form>
            </div>
        );
    }

export default CreateReview;