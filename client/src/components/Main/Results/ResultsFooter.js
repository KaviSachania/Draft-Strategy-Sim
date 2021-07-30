import React, { Component } from "react";
import Button from 'react-bootstrap/Button';

class ResultsFooter extends Component {
    render() {

        let isDisabled = false;
        if (this.props.results == null) {
            isDisabled = true;
        }

        return (
            <div id={"results-footer"}>
                <Button id={"save-button"} variant={"success"} disabled={isDisabled}>
                    Save
                </Button>
            </div>
        );
    }
}

export default ResultsFooter;
