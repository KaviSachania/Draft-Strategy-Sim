import React, { Component } from "react";
import Header from './Header/Header';
import Main from './Main/Main';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            user: null
        }
    }

    setUser = (username) => {
        this.setState({user: username, loggedIn: true});
    };

    clearUser = () => {
        this.setState({user: null, loggedIn: false});
    };

    render() {
        return (
            <div className={"container"}>
                <Header
                    loggedIn={this.state.loggedIn}
                    user={this.state.user}
                    setUser={this.setUser}
                    clearUser={this.clearUser}
                />
                <Main
                    loggedIn={this.state.loggedIn}
                    user={this.state.user}
                    setUser={this.setUser}
                />
            </div>
        );
    }
}

export default Home;
