import React from "react";

function RoundHeader (props) {
    let roundHeaders = [<th className={"positions-label-empty-column"}>Round</th>];

    for (const roundI in [...Array(props.rounds).keys()]) {
        const round = parseInt(roundI)+1;

        roundHeaders.push(<th className={"position-selection-header"} key={round}>{round}</th>);
    }

    return roundHeaders;
}

export default RoundHeader;
