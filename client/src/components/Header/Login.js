import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Button from 'react-bootstrap/Button';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }

    handleLoginSubmit = () => {
        this.props.login();
    };

    render() {
        return (
            <Modal.Body>
                Log in area with a form
                <Button variant="success" onClick={this.handleLoginSubmit}>
                    Submit
                </Button>
            </Modal.Body>
        );
    }
}

export default Login;
