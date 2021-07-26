import React from 'react';
import {Table, Button} from 'reactstrap';

const ReviewTable = (props) => {
    const deleteReview = (review) => {
        fetch(`https://cb-movie-reviews-server.herokuapp.com/reviews/${review.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then(() => props.fetchReviews())
    }

    const reviewMapper = () => {
        return props.reviews.map((review, index) => {
            return(
                <tr key={index}>
                    <th scope='row'>{review.id}</th>
                    <td>{review.title}</td>
                    <td>{review.description}</td>
                    <td>{review.review}</td>
                    <td>{review.imageURL}</td>
                    <td>
                        <Button color='warning' onClick={() => {props.editReview(review); props.updateOn()}}>Update</Button>
                        <Button color='danger' onClick={() => {deleteReview(review)}}>Delete</Button>
                    </td>
                </tr>
            )
        })
    }

    return(
        <div>
            <h3>Reviews</h3>
            <hr/>
            <Table striped>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Review</th>
                        <th>Image</th>
                        <th>User ID</th>
                    </tr>
                </thead>
                <tbody>
                    {reviewMapper()}
                </tbody>
            </Table>
        </div>
    )
}


export default ReviewTable;