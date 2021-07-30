import React from "react";
import PositionOption from "./PositionOption";
import Util from "../../../../util/util";

function PositionOptions (props) {
    let positionOptions = [];

    let maxMeanDiff = 0;

    if (props.means != null) {
        for (let positionI = 0; positionI < Util.positions.length; positionI++) {
            const positionMeans = props.means[positionI];

            const startMean = Math.max(...positionMeans);
            const endMean = Math.min(...positionMeans.slice(0,props.teams*props.rounds));

            const meanDiff = startMean - endMean;
            if (meanDiff > maxMeanDiff) {
                maxMeanDiff = meanDiff;
            }
        }
    }

    for (const position of Util.positions) {
        positionOptions.push(
            <tr key={position}>
                <PositionOption
                    teams={props.teams}
                    rounds={props.rounds}
                    pick={props.pick}
                    lineup={props.lineup}
                    means={props.means}
                    maxMeanDiff={maxMeanDiff}
                    position={position}
                    onChangeLineup={props.onChangeLineup}
                />
            </tr>
        );
    }

    return positionOptions;
}

export default PositionOptions;
