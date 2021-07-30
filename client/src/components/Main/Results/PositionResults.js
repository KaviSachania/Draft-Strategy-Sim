import React, { Component } from "react";
import Util from "../../../util/util";

function PositionResults(props) {
    let positionResults = [];

    for (let resultsI = 0; resultsI < 16; resultsI++) {
        if ((props.results != null) && (resultsI < props.results['players'].length)) {
            const round = resultsI + 1;

            let result = props.results['players'][resultsI];

            const position = result['position'];
            const positionStyle = Util.colors[Util.positions.indexOf(position)];

            const startScore = result['startScore'];
            const totalScore = result['totalScore'];

            const starting = result['starting'];


            let backgroundStyle = "";
            if (props.results != null) {
                let meanHex = Math.round((100-starting)*2.55).toString(16);
                if (meanHex.length === 1) {
                    meanHex = "0"+meanHex;
                }

                backgroundStyle = "#" + meanHex+ "FF" + meanHex;
            }

            positionResults.push(
                <tr>
                    <td>{round}</td>
                    <td style={{backgroundColor: positionStyle}}>{position}</td>
                    <td>{totalScore}</td>
                    <td>{startScore}</td>
                    <td style={{backgroundColor: backgroundStyle}}>{starting}</td>
                </tr>
            );
        } else {
            positionResults.push(
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
            );
        }
    }

    return positionResults;
}

export default PositionResults;
