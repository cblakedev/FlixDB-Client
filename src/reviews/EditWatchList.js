import React from 'react';
import {
    Button,
    Form
} from 'reactstrap';

const EditWatchList = (props) => {
    let id = props.selected.id;
    console.log(props.selected);

        const handleDelete = (x) => {
            x.preventDefault();
            fetch(`https://cb-movie-reviews-server.herokuapp.com/watchlist/${id}`, {
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
            <Form className="deleteForm" onSubmit={handleDelete}>
                <Button className="homepageButton" id="submitDeleteButton" type="submit" >Delete from List</Button>
            </Form>
        </div>
    );
}

export default EditWatchList;