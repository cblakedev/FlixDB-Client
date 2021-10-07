import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Container } from 'reactstrap'
import { Button, Form, FormGroup, Input } from 'reactstrap';
import Modal from 'react-modal';
import CreateReview from './CreateReview';
import env from "react-dotenv";

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

const SearchBar = (props) => {
    const [value, setValue] = useState('');
    const [search, setSearch] = useState({});
    const [pageNumber, setPageNumber] = useState(1);
    const [searchPageNumber, setSearchPageNumber] = useState(1);
    const [selected, setSelected] = useState(null);
    const isMounted = useRef(false);
    const [modalIsOpen, setIsOpen] = useState(false);

    let dataResults = search.results;

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${env.API_KEY}&language=en-US&page=${pageNumber}&include_adult=false`)
            .then((res) => res.json())
            .then((data) => setSearch(data))
    }, [pageNumber])

    useEffect(() => {
        if (isMounted.current) {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${env.API_KEY}&language=en-US&query=${value}&page=${searchPageNumber}&include_adult=false`)
                .then((res) => res.json())
                .then((data) => {
                    setSearch(data)
                })
        } else {
            isMounted.current = true;
        }

    }, [searchPageNumber])

    const fetchMovies = (e) => {
        e.preventDefault()

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${env.API_KEY}&language=en-US&query=${value}&page=${searchPageNumber}&include_adult=false`)
            .then((res) => res.json())
            .then((data) => {
                setSearch(data)
            })
    }

    const openModal = result => {
        setIsOpen(result);
    }

    const closeModal = result => {
        setIsOpen(false);
    }

    return (
        <Container id='homeWrapper'>
            <Row className='searchField g-0'>
                <Col className='searchCol'>
                    <Form onSubmit={fetchMovies}>
                        <FormGroup className='searchGroup'>
                            <Input required id="standard-search" value={value} label="Search field" type="text" onChange={(e) => setValue(e.target.value)} />
                            <Button type='submit' id='searchBtn'>Search</Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
            <Row className='resultsWrapper g-0'>
                {search.total_results ? dataResults.map((result, index) => {
                    return (
                        <Col key={index} className='resultsCol'>
                            {result.poster_path != null ? <img className='moviePoster' src={`https://image.tmdb.org/t/p/w154${result.poster_path}`} alt='No poster available' /> :
                                <div className='altBackground'><h2>No Poster Available</h2></div>}
                            <h5>{result.title}</h5>
                            <Button
                                onMouseEnter={() => { setSelected(result) }}
                                onClick={() => { setSelected(result); openModal(selected) }}>Movie Details
                            </Button>
                        </Col>
                    )
                })
                    :
                    <Col className='noResultsCol paddingFix'>
                        <h1>Search for an available movie!</h1>
                    </Col>
                }
            </Row>
            {!!selected && (

                <Modal
                    id='createReviewModal'
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Movie Details"
                >

                    <h2>Movie Details</h2>
                    {selected.poster_path != null ? <img src={`https://image.tmdb.org/t/p/w154${selected.poster_path}`} alt='No poster available' /> :
                        <div className='altBackground'><h2 >No poster available</h2></div>}
                    <h4>{selected.title}</h4>
                    <div className='modalOverview'>
                        <p>{selected.overview}</p>
                    </div>
                    <Row>
                        <Col>
                            <CreateReview selected={selected} closeModal={closeModal} token={props.token} />
                        </Col>
                    </Row>
                    <Row id='btmModalBtns'>
                        <Col className='closeModalBtn'>
                            <Button className="homepageButton" onClick={closeModal}>Close</Button>
                        </Col>
                    </Row>
                </Modal>

            )}
            {
                value !== '' ?
                    <Row className='g-0'>
                        <Col className='paginationBtns'>
                            {searchPageNumber > 1 ? <Button className='previousBtn' onClick={() => setSearchPageNumber(searchPageNumber - 1)}>Previous</Button> : undefined}
                            {searchPageNumber < search.total_pages ? <Button className='nextBtn' onClick={() => setSearchPageNumber(searchPageNumber + 1)}>Next</Button> : undefined}
                        </Col>
                    </Row>
                    :
                    <Row className=' g-0'>
                        <Col>
                            {pageNumber > 1 ? <Button className='previousBtn' onClick={() => setPageNumber(pageNumber - 1)}>Previous</Button> : undefined}
                            {pageNumber < search.total_pages ? <Button className='nextBtn' onClick={() => setPageNumber(pageNumber + 1)}>Next</Button> : undefined}
                        </Col>
                    </Row>
            }
        </Container>
    )
}

export default SearchBar
