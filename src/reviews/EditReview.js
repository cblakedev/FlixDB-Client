import React, { useState } from 'react';

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


}

export default EditReview;