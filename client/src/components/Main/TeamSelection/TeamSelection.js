import React, { Component } from "react";
import TeamSettings from "./TeamSettings";
import LineupSelection from "./LineupSelection/LineupSelection";
import TeamSelectionHeader from "./TeamSelectionHeader";

class TeamSelection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section id={"team-selection-section"}>
                <div id={"team-selection"}>
                    <TeamSelectionHeader />
                    <h4 id={"team-selection-help-text"}>
                        Click on a position's weekly projected score to draft for each round.
                    </h4>
                    <div id={"team-selection-interface"}>
                        <TeamSettings
                            scoring={this.props.scoring}
                            teams={this.props.teams}
                            rounds={this.props.rounds}
                            pick={this.props.pick}
                            positionStarters={this.props.positionStarters}
                            setScoring={this.props.setScoring}
                            setTeams={this.props.setTeams}
                            setRounds={this.props.setRounds}
                            setPick={this.props.setPick}
                            clearLineup={this.props.clearLineup}
                        />
                        <LineupSelection
                            teams={this.props.teams}
                            rounds={this.props.rounds}
                            pick={this.props.pick}
                            lineup={this.props.lineup}
                            means={this.props.means}
                            onChangeLineup={this.props.onChangeLineup}
                        />
                    </div>
                </div>
            </section>
        );
    }
}

export default TeamSelection;
