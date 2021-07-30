import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from "axios";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            usernameExists: false
        };
        this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    }

    handleRegisterSubmit = (e) => {
        // const form = e.currentTarget;
        // if (form.checkValidity() === false) {
        //     e.preventDefault();
        //     e.stopPropagation();
        //     console.log('false validity')
        //
        // }

        const username = document.getElementById("username-input").value;
        const password = document.getElementById("password-input").value;



        axios
            .get("/users/?username="+username)
            .then((res) => this.setState({usernameExists: res.data==="true"}))
            .catch((err) => console.log(err));




        this.setState({validated: true});
        console.log(username);
        this.props.register(username, password);
    };

    render() {
        return (
            <Modal.Body className={"model-body"}>
                <Form validated={this.state.validated} className={"auth-form"} >
                    <h3 className={"auth-modal-body-title"}>Create an account</h3>
                    <h4 className={"auth-modal-body-byline"}>Sign up to save interesting lineups for later.</h4>
                    <Form.Group className="auth-form-group mb-3" controlId="formBasicEmail">
                        <Form.Control id={"username-input"} className={"auth-form-input"} size="sm" type="text" placeholder="Username" required/>
                        {this.state.usernameExists &&
                            <Form.Text id="username-exists" muted>
                                Account with username already exists.
                            </Form.Text>
                        }
                    </Form.Group>
                    <Form.Group className={"auth-form-group mb-3"} controlId="formBasicPassword">
                        <Form.Control id={"password-input"} className={"auth-form-input"} size="sm" type="password" placeholder="Password" required/>
                    </Form.Group>
                    <Button id={'submit-registration-btn'} variant="success" onClick={this.handleRegisterSubmit}>
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        );
    }
}

export default Register;
