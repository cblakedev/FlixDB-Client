import React from 'react';
import {
    Button,
    Form
} from 'reactstrap';

const AddWatchList = (props) => {

    console.log(props.selected);

    let title = props.selected.title;
    let description = props.selected.overview;
    let imageURL = props.selected.poster_path;

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://cb-movie-reviews-server.herokuapp.com/watchlist/create', {
            method: 'POST',
            body: JSON.stringify({
                watchlist: {
                    title: title,
                    description: description,
                    imageURL: imageURL
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
                <Button className="homepageButton" id="submitReviewButton" type="submit" >Add to Watchlist</Button>
            </Form>
        </div>
    );
}

export default AddWatchList;