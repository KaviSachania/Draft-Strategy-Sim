import React from "react";
import Util from '../../../../util/util';

function SelectedPositionHeader(props) {
    let selectedPositionHeaders = [<th className={"positions-label-empty-column"}>Selected</th>];

    for (const roundI in [...Array(props.rounds).keys()]) {
        const round = parseInt(roundI)+1;

        const selected = props.lineup[round-1];

        let text = "\xa0";
        let style= "";
        if (selected != null) {
            style = Util.colors[selected];
            text = Util.positions[selected];
        }

        selectedPositionHeaders.push(
            <th className={"selected-position"} key={round} style={{backgroundColor: style}}>
                {text}
            </th>
        );
    }

    return selectedPositionHeaders;
}

export default SelectedPositionHeader;
