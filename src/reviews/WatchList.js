import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'reactstrap'
import { Button } from 'reactstrap';
import Modal from 'react-modal';
import EditWatchlist from './EditWatchList';
import APIURL from '../helpers/environment';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const WatchList = (props) => {
    const [value, setValue] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('');

    useEffect(() => {
        fetchMovie()
    })

    const fetchMovie = () => {
        fetch(`${APIURL}watchlist/mine`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application.json',
                'Authorization': `Bearer ${props.token}`
            })
        })
            .then((res) => res.json())
            .then((data) => setValue(data))
    }

    const openModal = result => {
        setIsOpen(result);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    const closeModal = result => {
        setIsOpen(false);
    }

    return (
        <Container id='homeWrapper'>
            <Row className='resultsWrapper myWatchlist g-0'>
                {value?.length > 0 ? value.map((finished, index) => {
                    return (
                        <Col key={index} className='resultsCol'>
                            {finished.imageURL != null ? <img className='moviePoster' src={`https://image.tmdb.org/t/p/w154${finished.imageURL}`} alt='No poster available' /> :
                                <h2 className='altBackground'>No poster available</h2>}
                            <h5>{finished.title}</h5>
                            <p>{finished.review}</p>
                            <Button
                                onMouseEnter={() => { setSelected(finished) }}
                                onClick={() => { setSelected(finished); openModal(selected) }}>Movie Details
                            </Button>
                        </Col>
                    )
                })
                    :
                    <Col className='noResultsCol paddingFix'>
                        <h1>You have no movies in your Watchlist.</h1>
                    </Col>
                }
            </Row>
            {!!selected && (
                <Modal
                    id='watchListModal'
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Movie Details"
                >
                    <h2>Movie Details</h2>
                    <div>{selected.imageURL != null ? <img src={`https://image.tmdb.org/t/p/w154${selected.imageURL}`} alt='No poster available' /> :
                        <h2 className='altBackground'>No poster available</h2>}</div>
                    <h4>{selected.title}</h4>
                    <div className='watchlistDescription'>
                        <p>{selected.description}</p>
                    </div>
                    <EditWatchlist selected={selected} closeModal={closeModal} token={props.token} />
                    <Button className="homepageButton" onClick={closeModal}>Close</Button>
                </Modal>
            )}
        </Container>
    )
}

export default WatchList;