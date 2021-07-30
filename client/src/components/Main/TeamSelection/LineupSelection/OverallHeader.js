import React from "react";

import Util from "../../../../util/util";

function OverallHeader (props) {
    let overallHeaders = [<th className={"positions-label-empty-column"}>Overall</th>];

    for (const roundI in [...Array(props.rounds).keys()]) {
        const round = parseInt(roundI) + 1;

        const overallPick = Util.getOverallPick(props.teams, round, props.pick);

        overallHeaders.push(<th className={"position-selection-header"} key={round}>{overallPick}</th>);
    }

    return overallHeaders;
}

export default OverallHeader;
