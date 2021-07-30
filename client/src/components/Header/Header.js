import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import AuthModal from "./AuthModal";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAuthModal: false,
            isRegistrationModal: true,
        };
        this.handleOpenAuthModal = this.handleOpenAuthModal.bind(this);
        this.closeAuthModal = this.closeAuthModal.bind(this);
    }

    handleOpenAuthModal = (e) => {
        let register = false;
        if (e.currentTarget.value === 'register') {
            register = true;
        }

        this.setState({showAuthModal: true, isRegistrationModal: register});
    };

    closeAuthModal = () => {
        console.log("close");

        this.setState({showAuthModal: false});
    };

    logout = () => {
        this.props.clearUser();
    };

    render() {
        return (
            <header>
                <div id={"app-header"}>
                    <div id={"app-name"}>
                        <h1><a
                            href={"#"}
                            id={"logo-link"}

                        >
                            DraftStrategySim
                        </a></h1>
                    </div>
                    {/*{!this.props.loggedIn ?*/}
                    {/*    <div id={"auth"}>*/}
                    {/*        <div id={"signup-button"} className={"auth-button"}>*/}
                    {/*            <Button variant={"outline-success"} value={'register'} onClick={this.handleOpenAuthModal}>*/}
                    {/*                Sign up*/}
                    {/*            </Button>*/}
                    {/*        </div>*/}
                    {/*        <div id={"login-button"} className={"auth-button"}>*/}
                    {/*            <Button variant={"success"} value={'login'} onClick={this.handleOpenAuthModal}>*/}
                    {/*                Log in*/}
                    {/*            </Button>*/}
                    {/*        </div>*/}
                    {/*        <AuthModal*/}
                    {/*            showAuthModal={this.state.showAuthModal}*/}
                    {/*            isRegistrationModal={this.state.isRegistrationModal}*/}
                    {/*            setUser={this.props.setUser}*/}
                    {/*            openAuthModal={this.handleOpenAuthModal}*/}
                    {/*            closeAuthModal={this.closeAuthModal}*/}
                    {/*        />*/}
                    {/*    </div> :*/}
                    {/*    <div id={"auth"}>*/}
                    {/*        <div id={"logout-button"} className={"auth-button"}>*/}
                    {/*            <Button variant={"success"} value={'logout'} onClick={this.logout}>*/}
                    {/*                Log out*/}
                    {/*            </Button>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*}*/}

                </div>
            </header>
        );
    }
}

export default Header;
