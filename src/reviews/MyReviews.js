import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import CreateReview from './CreateReview';
import EditReview from './EditReview';
import APIURL from '../helpers/environment'

const MyReviews = (props) => {
    const [ newReview, setNewReview ] = useState('');
    const [ updateActive, setUpdateActive ] = useState(false);
    const [ reviewToUpdate, setReviewToUpdate ] = useState({});

    // let userID = props.
    const fetchMyReviews = () => {
        fetch(`${APIURL}review/`, {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => res.json())
        .then((logData) => {
            setNewReview(logData)
        })
    }

    const editReview = (review) => {
        setReviewToUpdate(review);
    }

    const updateOn = () => {
        setUpdateActive(true);
    }

    const updateOff = () => {
        setUpdateActive(false);
    }

    useEffect(() => {
        fetchMyReviews();
    })

    return(
        <Container>
           
        </Container>
    )
}

export default MyReviews;