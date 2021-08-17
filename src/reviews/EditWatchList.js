import React from 'react';
import {
    Button,
    Form
} from 'reactstrap';
import APIURL from '../helpers/environment';

const EditWatchList = (props) => {
    let id = props.selected.id;

        const handleDelete = (x) => {
            x.preventDefault();
            fetch(`${APIURL}watchlist/${id}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${props.token}`
                })
            })
            console.log("Movie removed from watchlist");
            props.closeModal();
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