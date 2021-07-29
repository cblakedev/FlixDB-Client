import React, {useState, useEffect, useRef} from 'react';
import {Row, Col, Container} from 'reactstrap'
import {Button, Form, FormGroup, Input} from 'reactstrap';
import Modal from 'react-modal';
import EditReview from './EditReview';
    
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
    
    const MyReviews = (props) => {
        const [value, setValue] = useState('');
        const [search, setSearch] = useState({});
        const [pageNumber, setPageNumber] = useState(1);
        const [searchPageNumber, setSearchPageNumber] = useState(1);
        const isMounted = useRef(false);
        const [modalIsOpen, setIsOpen] = useState(false);
        const [selected, setSelected] = useState('');
        
        let dataResults = search.results;
        
        // console.log(id);
        // console.log(props.token);
    
        useEffect(() => {
            fetch(`https://cb-movie-reviews-server.herokuapp.com/reviews/myreviews`)
                .then((res) => res.json())
                .then((data) => setSearch(data))
        })

        const openModal = result =>{
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
            <Row className='searchField g-0'>
                <Col className='searchCol'>
                    <Form>
                        <FormGroup className='searchGroup'>
                            <Input id="standard-search" value={value} label="Search field" type="text" onChange={(e) => setValue(e.target.value)} />
                            <Button type='submit'>Search</Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
            <Row className='resultsWrapper g-0'>
                {dataResults !== undefined ? dataResults.map(result => {
                    return (
                        <Col className='resultsCol'>
                            {result.imageURL != null ? <img src={`https://image.tmdb.org/t/p/w154${result.imageURL}`} alt='No poster available' /> :
                                <h2 className='altBackground'>No poster available</h2>}
                            <h5>{result.title}</h5>
                            <p>{result.review}</p>
                            <Button 
                            onMouseEnter={() => {setSelected(result)}}
                            onClick={() => {setSelected(result); openModal(selected); console.log(selected)}}>Movie Details
                            </Button>
                        </Col>
                    )
                })
                    :
                    <Col className='noResultsCol'>
                        <h1>Get started with a new movie review.</h1>
                    </Col>
                }
            </Row>
            {!!selected && (
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Movie Details"
            >
                                
                <h2>Movie Details</h2>
                <div>{selected.poster_path != null ? <img src={`https://image.tmdb.org/t/p/w154${selected.poster_path}`} alt='No poster available' /> :
                <h2 className='altBackground'>No poster available</h2>}</div>
                <h4>{selected.title}</h4>
                <div>
                    <p>{selected.overview}</p>
                </div>
                <Button className="homepageButton">Edit Review</Button>
                <Button className="homepageButton" onClick={closeModal}>Close</Button>
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

export default MyReviews;