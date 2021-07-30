import React, { Component } from "react";
import axios from "axios";
import TeamSelection from "./TeamSelection/TeamSelection";
import Results from "./Results/Results";
import Explanation from "./Explanation/Explanation";
import Util from "../../util/util";
import TeamSettings from "./TeamSelection/TeamSettings";

class Main extends Component {
    constructor(props) {
        super(props);
        this.onChangeLineup = this.onChangeLineup.bind(this);
        this.state = {
            scoring: 'Standard',
            teams: 12,
            rounds: 16,
            pick: 1,
            positionStarters: {starters: [1,2,2,1,1,1], flex: {count: 1, positions: [1,2,3]}},
            lineup: [0,1,2,3,4,5,4,3,2,1,0,1,2,3,4,5],
            // lineup: [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
            data: null,
            refreshDistributions: true
        }
    }

    componentDidMount() {
        this.loadDistributions(this.state.scoring, this.state.teams);
    }

    loadDistributions = async (scoring, teams) => {
        await axios
            .get("/distributions/?scoring="+scoring+"&teams="+teams)
            .then((res) => this.setState({data: res.data[0]['data'], refreshDistributions: false}))
            .catch((err) => console.log(err));
    };

    setScoring = async (scoring) => {
        await this.loadDistributions(scoring, this.state.teams);

        this.setState({refreshDistributions: true, scoring: scoring});
    };

    setTeams = async (teams) => {
        const teamsInt = parseInt(teams);

        let pick=this.state.pick;
        if (teamsInt<pick) {
            pick = teamsInt;
        }

        await this.loadDistributions(this.state.scoring, teamsInt);

        this.setState({refreshDistributions: true, teams: teamsInt, pick: pick});
    };

    setRounds = (rounds) => {
        let lineup = this.state.lineup;
        if (lineup.length > parseInt(rounds)) {
            lineup = lineup.slice(0, rounds);
        } else if (lineup.length < parseInt(rounds)) {
            const positionsAdded = parseInt(rounds)-lineup.length;
            for (let i =0; i<positionsAdded; i++) {
                lineup.push(null);
            }
        }


        this.setState({rounds: parseInt(rounds), lineup: lineup});
    };

    setPick = (pick) => {
        this.setState({pick: parseInt(pick)});
    };

    onChangeLineup = (roundI, position) => {
        let newLineup = this.state.lineup;
        let oldPosition = newLineup[roundI];
        let newPosition = Util.positions.indexOf(position);

        if (oldPosition === newPosition) {
            newPosition = null;
        }

        newLineup[roundI] = newPosition;
        this.setState({lineup: newLineup});
    };

    clearLineup = () => {
        let newLineup = this.state.lineup;
        for (let lineupI = 0; lineupI<newLineup.length;lineupI++) {
            newLineup[lineupI] = null;
        }

        this.setState({lineup: newLineup});
    };

    render() {
        let mainDiv = null;
        if (this.state.data != null) {
            mainDiv = (
                <div className={"main"}>
                    <div id={"main-simulation-content"}>
                        <TeamSelection
                            teams={this.state.teams}
                            rounds={this.state.rounds}
                            pick={this.state.pick}
                            positionStarters={this.state.positionStarters}
                            lineup={this.state.lineup}
                            means={this.state.data.means}
                            setScoring={this.setScoring}
                            setTeams={this.setTeams}
                            setRounds={this.setRounds}
                            setPick={this.setPick}
                            onChangeLineup={this.onChangeLineup}
                            clearLineup={this.clearLineup}
                        />
                        <Results
                            teams={this.state.teams}
                            pick={this.state.pick}
                            positionStarters={this.state.positionStarters}
                            lineup={this.state.lineup}
                            distributions={this.state.data.distributions}
                        />
                    </div>
                    <div id={"how"}>
                    </div>
                    <Explanation/>
                </div>
            );
        }

        return mainDiv;
    }
}

export default Main;
