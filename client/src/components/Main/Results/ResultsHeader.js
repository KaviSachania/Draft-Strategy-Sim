import React, { Component } from "react";
import Button from 'react-bootstrap/Button';

class ResultsHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            simulationRunning: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = () => {
        this.props.setSimulationRunning();
        // this.setState({simulationRunning: true}, (sim=this.props.onSimulate, setty=this.setState) => {
        //     this.forceUpdate(() => {
        //         setTimeout(function(onSimulate=sim, setSt=setty){
        //             onSimulate();
        //         }, 10);
        //     });
        //     //sim();//.then((setState=setty) => setState({simulationRunning: false}));
        //     // sim();
        //     // this.setState({simulationRunning: false});
        //
        //
        //
        // });
        this.forceUpdate((sim=this.props.onSimulate) => {
            setTimeout(function(onSimulate=sim){
                onSimulate();
            }, 10);
        });
    };

    render() {
        let score="\xa0\xa0\xa0\xa0\xa0";
        if (this.props.results != null) {
            score = this.props.results['score'];
        }

        let isDisabled = false;
        for (let position of this.props.lineup) {
            if (position == null) {
                isDisabled = true;
            }
        }

        return (
            <div id={"results-header"}>
                <div id={"results-score"}>
                    <h2>Score: {score}</h2>
                </div>
                {!this.props.simulationRunning ?
                    <Button
                        id={"simulate-button"}
                        variant={"success"}
                        type={"Submit"}
                        value={"Simulate"}
                        onClick={this.handleSubmit}
                        disabled={isDisabled}
                    >
                        Simulate
                    </Button>
                    :
                    <Button
                        id={"simulate-button"}
                        variant={"success"}
                        type={"Submit"}
                        value={"Simulate"}
                        onClick={this.handleSubmit}
                        disabled={true}
                    >
                        Simulating...
                    </Button>
                }
            </div>
        );
    }
}

export default ResultsHeader;
