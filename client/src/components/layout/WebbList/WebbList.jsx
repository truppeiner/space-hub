import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const WebbList = ({ allWebb }) =>{
    return(
        <>
            <Container>
            <Row>
                {/* populates webb header */}
                {allWebb && allWebb.map(allWebb => (
                    <div key = {allWebb._id} className="mt-5">
                        <div className='mb-5'>
                            <h2>{allWebb.webbTitle}</h2>
                            <h4>{allWebb.webbDescription}</h4>
                        </div>
                        {/* populates webb threads */}
                        {allWebb.threads.map(threads => (
                            <div key = {threads._id}>
                                <p>Created By: {threads.username} At: {threads.createdAt}</p>
                                <h5>{threads.threadTitle}</h5>
                                <p>{threads.threadBody}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </Row>
            </Container>
        </>
    )
};

export default WebbList;