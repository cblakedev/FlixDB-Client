import React, {useState, useEffect, useRef} from 'react';
import {Row, Col, Container} from 'reactstrap'
import {Button, Form, FormGroup, Input} from 'reactstrap';

const AllReviews = (props) => {
    const [reviewsData, setReviewsData] = useState('')

    useEffect(() => {
        fetchReviews()
    }, [])

    const fetchReviews = async () => {
        await fetch(`https://cb-movie-reviews-server.herokuapp.com/reviews/`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }




    return (
        <Container>

        </Container>
    )
}

export default AllReviews