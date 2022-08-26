import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

// import { GiSpaceShuttle } from 'react-icons/gi';

function Header( props ){
    // set form state
    const [formState, setFormState] = useState({ email: "", password: ""});
    const [login] = useMutation(LOGIN_USER);

    // function to logout
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };

    // function to handle login modal
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // function to update modal form based on input 
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        })
    };

    // handle login form submit
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await login({
                variables: { ...formState },
            });
            Auth.login(data.login.token);
        } catch (error){
            console.log(error);
        }

        // clear form values
        setFormState({
            email: "",
            password: "",
        });
    };

    return(
        <>
            <Navbar bg='light'>
                <Container>
                    <Navbar.Brand>
                        <h2>Space Hub</h2>
                    </Navbar.Brand>
                    {Auth.loggedIn() ? (
                        // if logged in render this section
                            <Navbar.Text>
                                <Button variant='secondary' onClick={logout}>Logout</Button>
                            </Navbar.Text>
                    ): (
                        // if logged out render this section
                        <>
                            <Navbar.Text>
                                <Button variant='secondary' onClick= {handleShow}>Login</Button>
                            </Navbar.Text>
                            {/* will render login modal on button click */}
                            <Modal show = {show} onHide = {handleClose} animation = { true }>
                                <Modal.Header>
                                    Login
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={handleFormSubmit}>
                                        <Form.Group className='m-3'>
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control
                                                placeholder = 'Enter Email'
                                                name = 'email'
                                                type = 'email'
                                                value = {formState.email}
                                                onChange = {handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group className='m-3'>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                placeholder = 'Enter Password'
                                                name = 'password'
                                                type = 'password'
                                                value = {formState.password}
                                                onChange = {handleChange}
                                            />
                                        </Form.Group>
                                    <Button variant="secondary" onClick = {handleClose} type="submit">Submit</Button>
                                    </Form>
                                </Modal.Body>
                            </Modal>
                        </>
                    )}
                </Container>
            </Navbar>
        </>
    )
}

export default Header;
