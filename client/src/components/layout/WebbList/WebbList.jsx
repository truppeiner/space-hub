import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const WebbList = ({ allWebb, title }) =>{
    return(
        <>
            <Container>
            <Row>
                {allWebb && allWebb.map(allWebb => (
                    <div key = {allWebb._id}>
                        <h2>{allWebb.webbTitle}</h2>
                        <h4>{allWebb.webbDescription}</h4>
                        
                    </div>
                ))}
            </Row>
            </Container>
        </>
    )
};

export default WebbList;