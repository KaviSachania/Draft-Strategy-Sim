import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
import PositionResults from "./PositionResults";
import StartingLineupResults from "./StartingLineupResults";
import Util from "../../../util/util";

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function SimulationResults(props) {
    return (
        <div id={"simulation-results"}>
            <Table id={"starting-lineup-results-table"} >
                <thead>
                <tr>
                    <th style={{backgroundColor: Util.colors[0]}}>QB</th>
                    <th style={{backgroundColor: Util.colors[1]}}>RB1</th>
                    <th style={{backgroundColor: Util.colors[1]}}>RB2</th>
                    <th style={{backgroundColor: Util.colors[2]}}>WR1</th>
                    <th style={{backgroundColor: Util.colors[2]}}>WR2</th>
                    <th style={{backgroundColor: Util.colors[3]}}>TE</th>
                    <th style={{backgroundColor: '#999999'}}>FLEX</th>
                    <th style={{backgroundColor: Util.colors[4]}}>DEF</th>
                    <th style={{backgroundColor: Util.colors[5]}}>K</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <StartingLineupResults results={props.results} />
                </tr>
                </tbody>
            </Table>
            <Table id={"results-table"} >
                <thead>
                    <tr>
                        <th>Round</th>
                        <th>Pos.</th>
                        <OverlayTrigger
                            key={0}
                            className={'results-tooltip'}
                            placement={'top'}
                            overlay={
                                <Tooltip id={'tooltip-total'}>
                                    Points scored in a week
                                </Tooltip>
                            }
                        >
                            <th>Total Pts.</th>
                        </OverlayTrigger>
                        <OverlayTrigger
                            key={1}
                            className={'results-tooltip'}
                            placement={'top'}
                            overlay={
                                <Tooltip id={'tooltip-team'}>
                                    Points contributed to starting lineup
                                </Tooltip>
                            }
                        >
                            <th>Team Pts.</th>
                        </OverlayTrigger>
                        <OverlayTrigger
                            key={2}
                            className={'results-tooltip'}
                            placement={'top'}
                            overlay={
                                <Tooltip id={'tooltip-start'}>
                                    Chance of starting a week
                                </Tooltip>
                            }
                        >
                            <th>Start %</th>
                        </OverlayTrigger>
                    </tr>
                </thead>
                <tbody>
                    <PositionResults results={props.results} />
                </tbody>
            </Table>
        </div>
    );
}

export default SimulationResults;
