import React, { Component } from "react";
import Util from "../../../util/util";

function StartingLineupResults(props) {
    let lineupResults = [];

    if (props.results != null) {
        // const position = result['position'];
        // const positionStyle = Util.colors[Util.positions.indexOf(position)];

        const lineupScores = props.results['startingLineup'];

        for (let startingLineupI = 0; startingLineupI < 9; startingLineupI++) {

            // let backgroundStyle = "";
            // if (props.results != null) {
            //     let meanHex = Math.round((100 - starting) * 2.55).toString(16);
            //     if (meanHex.length === 1) {
            //         meanHex = "0" + meanHex;
            //     }
            //
            //     backgroundStyle = "#" + meanHex + "FF" + meanHex;
            // }

            let lineupI = startingLineupI;

            if (startingLineupI >= 6) {
                if (startingLineupI === 6) {
                    lineupI = 8;
                } else {
                    lineupI -= 1;
                }
            }

            lineupResults.push(
                <td>{lineupScores[lineupI]}</td>
            );
        }
    } else {
        for (let lineupI in [...Array(9).keys()]) {
            lineupResults.push(
                <td>&nbsp;</td>
            );
        }
    }

    return lineupResults;
}

export default StartingLineupResults;
