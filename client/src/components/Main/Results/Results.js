import React, { Component } from "react";
import ResultsHeader from "./ResultsHeader";
import SimulationResults from "./SimulationResults";
import ResultsFooter from "./ResultsFooter";
import Util from "../../../util/util";

class Results extends Component {
    constructor(props) {
        super(props);
        this.onSimulate = this.onSimulate.bind(this);
        this.state = {
            results: null,
            simulationRunning: false
        }
    }

    setSimulationRunning = () => {
        this.setState({simulationRunning: true});
    };

    simulateWeek = () => {
        const distributions = this.props.distributions;

        const pos_starter_count = this.props.positionStarters.starters;
        const flex_count = this.props.positionStarters.flex.count;
        const flex_pos = this.props.positionStarters.flex.positions;

        let points = new Array(this.props.lineup.length).fill(0);
        let points_for_positions = new Array(Util.positions.length);
        for (let posI = 0; posI < points_for_positions.length; posI++) {
            points_for_positions[posI] = new Array(0);
        }

        for (let player_i= 0; player_i < this.props.lineup.length; player_i++) {
            const pos_i = this.props.lineup[player_i];

            let overall_pick = Util.getOverallPick(this.props.teams, player_i+1, this.props.pick);
            let dist = distributions[pos_i][overall_pick - 1];

            let rand_num = Math.random();

            let prob_sum = 0;

            for (let prob_i = 0; prob_i < dist.length; prob_i++) {
                prob_sum += dist[prob_i];
                if (rand_num < prob_sum) {
                    points[player_i] = prob_i;
                    points_for_positions[pos_i].push(prob_i);
                    break;
                }
            }
        }

        let exp_points = 0;

        let flex_cand_list = [];

        let startingLineup = [];

        for (let pos_i in [...Array(6).keys()]) {
            if (points_for_positions[pos_i].length > 0) {
                points_for_positions[pos_i].sort(function(a, b) {return a - b});

                const positionStarterPoints = points_for_positions[pos_i].slice(-pos_starter_count[pos_i]);

                let pointsAdded = [];

                let reducer = function add(accumulator, currentValue) {
                    pointsAdded.push(currentValue);
                    return accumulator + currentValue;
                };

                exp_points += positionStarterPoints.reduce(reducer, 0);

                pointsAdded.sort(function(a, b) {return b-a});
                startingLineup.push(...pointsAdded);

                if (flex_pos.includes(parseInt(pos_i))) {
                    let posFlexCands = points_for_positions[pos_i]
                        .slice(0, -pos_starter_count[pos_i]);
                    for (let flexCand of posFlexCands) {
                        flex_cand_list.push(flexCand);
                    }
                }
            } else {
                startingLineup.push(0);
            }
        }

        if (flex_cand_list.length > 0) {
            flex_cand_list.sort(function (a, b) {return a - b});

            let pointsAdded = [];

            let reducer = function add(accumulator, currentValue) {
                pointsAdded.push(currentValue);
                return accumulator + currentValue;
            };

            exp_points += flex_cand_list.slice(-flex_count).reduce(reducer, 0);

            pointsAdded.sort(function(a, b) {return b-a});
            startingLineup.push(...pointsAdded);
        }

        let starters = new Array(this.props.lineup.length).fill(0);
        let startingPoints = new Array(this.props.lineup.length).fill(0);

        for (let lineupI = 0; lineupI < this.props.lineup.length; lineupI++) {
            const positionI = this.props.lineup[lineupI];
            const sortedPositionPoints = points_for_positions[positionI];

            const inStarters = sortedPositionPoints.slice(-pos_starter_count[positionI]).includes(points[lineupI]);
            const inFlexCand = sortedPositionPoints.slice(0,
                    -pos_starter_count[positionI]).includes(points[lineupI]);

            if (inStarters===true) {
                if (inFlexCand===true) {
                    const tiedStartersCount = pos_starter_count[positionI]
                        -(sortedPositionPoints.length-sortedPositionPoints.lastIndexOf(points[lineupI])-1);
                    const starterFlexTieCount = sortedPositionPoints.lastIndexOf(points[lineupI])
                            - sortedPositionPoints.indexOf(points[lineupI]) + 1;

                    starters[lineupI] += tiedStartersCount / starterFlexTieCount;
                } else {
                    starters[lineupI] += 1;
                }
            }

            if ((inFlexCand===true) && (flex_pos.includes(positionI))) {
                if (flex_cand_list.slice(-flex_count).includes(points[lineupI])) {
                    if (flex_cand_list.slice(0, -flex_count).includes(points[lineupI])) {
                        const tiedFlexCount = flex_count
                                -(flex_cand_list.length-flex_cand_list.lastIndexOf(points[lineupI])-1);
                        const flexNonflexTieCount = flex_cand_list.lastIndexOf(points[lineupI])
                                - flex_cand_list.indexOf(points[lineupI]) + 1;

                        starters[lineupI] += (1-starters[lineupI])*(tiedFlexCount/flexNonflexTieCount);
                    } else {
                        starters[lineupI] = 1;
                    }
                }
            }

            startingPoints[lineupI] = starters[lineupI]*points[lineupI];
        }

        return [startingLineup, starters, startingPoints, points, exp_points];
    };

    onSimulate = async () => {
        if (this.props.lineup.includes(null)) {
            return;
        }
        if (this.props.rounds * this.props.teams > this.props.distributions[0].length) {
            return;
        }
        if (this.props.pick > this.props.teams) {
            return;
        }

        const nSim = 100000;

        let player_points = new Array(this.props.lineup.length).fill(0);
        let startingPerc = new Array(this.props.lineup.length).fill(0);
        let startingPoints = new Array(this.props.lineup.length).fill(0);
        let startingLineup = new Array(9).fill(0);

        let week_avg = 0;
        for (let i in [...Array(nSim).keys()]) {
            let [startingLineupPoints, starters, startPoints, week_points, exp_points] = this.simulateWeek();
            week_avg += exp_points / nSim;
            for (let player_i = 0; player_i<player_points.length; player_i++) {
                player_points[player_i] += week_points[player_i] / nSim;
                startingPerc[player_i] += starters[player_i] / nSim;
                startingPoints[player_i] += startPoints[player_i] / nSim;
            }
            for (let lineup_i = 0; lineup_i<9; lineup_i++) {
                startingLineup[lineup_i] += startingLineupPoints[lineup_i] / nSim;
            }
        }

        const score = Math.round(week_avg*10) / 10;

        let results = {
            score: score,
            players: [],
            startingLineup: []
        };

        for (let i = 0; i<this.props.lineup.length; i++) {
            results.players.push({
                position: Util.positions[this.props.lineup[i]],
                totalScore: Math.round(player_points[i]*10) / 10,
                startScore: Math.round(startingPoints[i]*10) / 10,
                starting: Math.round(startingPerc[i]*1000) / 10
            })
        }

        for (let i = 0; i<9; i++) {
            results.startingLineup.push(Math.round(startingLineup[i]*10) / 10)
        }

        this.setState({results: results, simulationRunning: false});

    };

    render() {
        return (
            <section>
                <div id={"results"}>
                    <ResultsHeader
                        lineup={this.props.lineup}
                        results={this.state.results}
                        simulationRunning={this.state.simulationRunning}
                        onSimulate={this.onSimulate}
                        setSimulationRunning={this.setSimulationRunning}
                    />
                    <SimulationResults
                        results={this.state.results}
                    />
                    {/*<ResultsFooter results={this.state.results} />*/}
                </div>
            </section>
        );
    }
}

export default Results;
