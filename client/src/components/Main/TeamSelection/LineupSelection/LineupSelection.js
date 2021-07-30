import React, { Component } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table'

import RoundHeader from "./RoundHeader";
import OverallHeader from "./OverallHeader";
import SelectedPositionHeader from "./SelectedPositionHeader";
import PositionOptions from "./PositionOptions";

class LineupSelection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id={"lineup-selection"}>
                <Table id={"lineup-selection-table"}>
                    <thead>
                        <tr>
                            <RoundHeader rounds={this.props.rounds}/>
                        </tr>
                        <tr>
                            <OverallHeader teams={this.props.teams} rounds={this.props.rounds} pick={this.props.pick}/>
                        </tr>
                        <tr>
                            <SelectedPositionHeader rounds={this.props.rounds} lineup={this.props.lineup}/>
                        </tr>
                    </thead>
                    <tbody>
                        <PositionOptions
                                teams={this.props.teams}
                                rounds={this.props.rounds}
                                pick={this.props.pick}
                                lineup={this.props.lineup}
                                means={this.props.means}
                                onChangeLineup={this.props.onChangeLineup}
                        />
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default LineupSelection;
