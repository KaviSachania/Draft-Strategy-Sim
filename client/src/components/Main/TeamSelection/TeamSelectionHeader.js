import React from "react";

function TeamSelectionHeader(props) {
    return (
        <div id={"team-selection-header"}>
            <h2 id={"team-selection-header-title"}>Fantasy Football Draft Strategy Simulator</h2>
            <div>
                <h4 className={"team-selection-header-byline"}>
                   Simulate a draft strategy to see how each pick contributes to a team's projected score.
                </h4>
                <h4 className={"team-selection-header-byline"}>
                    View how much each player starts and scores each week on average.
                </h4>
                <p id={'explanation-link'}><a className={"link-no-underline"} href={"#how"}>How this works</a></p>
            </div>
        </div>
    );
}

export default TeamSelectionHeader;
