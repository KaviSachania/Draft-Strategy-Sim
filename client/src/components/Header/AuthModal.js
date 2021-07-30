import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Button from 'react-bootstrap/Button';

import Register from "./Register";
import Login from "./Login";
import axios from "axios";

class AuthModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.handleOpenAuthModal = this.handleOpenAuthModal.bind(this);
        this.handleCloseAuthModal = this.handleCloseAuthModal.bind(this);
    }

    handleOpenAuthModal = (e) => {
        this.props.openAuthModal(e);
    };

    handleCloseAuthModal = () => {
        this.props.closeAuthModal();
    };

    register = (username, password) => {
        const data = {
            username: username,
            password: password,
        };

        // axios
        //     .get("/users/register/")
        //     .then((res) => this.props.setUser(username))
        //     .then((res) => this.props.closeAuthModal())
        //     .catch((err) => console.log(err));

        this.props.closeAuthModal();

        return;
    };

    login = (username, password) => {
        const data = {
            username: username,
            password: password,
        };


        axios
            .get("/users/login/")
            .then((res) => this.props.setUser(res))
            .catch((err) => console.log(err));

        this.props.closeAuthModal();
        return null;
    };

    render() {
        return (
            <Modal

                animation={false}
                show={this.props.showAuthModal}
                onHide={this.handleCloseAuthModal}
            >
                <Modal.Header className={"modal-header"} closeButton={true} closeLabel={''} closeVariant={'white'}>
                    <Modal.Title>{this.props.isRegistrationModal ? 'Sign Up' : 'Log In'}</Modal.Title>
                </Modal.Header>
                <div className={'auth-modal'}>
                    {this.props.isRegistrationModal ?
                        <Register
                            register={this.register}
                            handleOpenAuthModal={this.handleOpenAuthModal}
                        /> :
                        < Login
                            login = {this.login}
                            handleOpenAuthModal={this.handleOpenAuthModal}
                        />
                    }
                </div>
                <Modal.Footer className={"modal-footer"}>
                    <Button variant="secondary" onClick={this.handleCloseAuthModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default AuthModal;
