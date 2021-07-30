import React, { Component } from "react";
import Util from "../../../../util/util";

class PositionOption extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.onChangeLineup(e.target.getAttribute("data-round"), e.target.getAttribute("data-position"));
    }

    render() {
        let positionOptions = [<td className={"positions-empty-column"}>{this.props.position}</td>];

        for (let roundI in [...Array(this.props.rounds).keys()]) {
            const round = parseInt(roundI) + 1;

            const selected = this.props.lineup[round - 1];

            let borderStyle = "";
            let topRowBorderStyle = "";
            if ((selected != null) && (Util.positions[selected] === this.props.position)) {
                borderStyle = "solid 2px " + Util.colors[selected];

                topRowBorderStyle = borderStyle;
                if (this.props.position === "QB") {
                    topRowBorderStyle = "solid 1px " + Util.colors[selected];
                }
            }

            const overallPick = Util.getOverallPick(this.props.teams, round, this.props.pick);

            let backgroundStyle = "";
            if (this.props.means != null) {
                const positionMeans = this.props.means[Util.positions.indexOf(this.props.position)];

                const mean = positionMeans[overallPick-1];
                const startMean = Math.max(...positionMeans);
                const scaled_mean = Math.round((startMean-mean)*255 / this.props.maxMeanDiff);

                let meanHex = scaled_mean.toString(16);
                if (meanHex.length === 1) {
                    meanHex = "0"+meanHex;
                }

                backgroundStyle = "#" + meanHex+ "FF" + meanHex;
            }

            let className = "";
            if (round === 1) {
                className = "first-position-column";
            }

            positionOptions.push(
                <td
                    key={roundI}
                    data-round={round-1}
                    data-position={this.props.position}
                    className={className}
                    style={{border: borderStyle, borderTop: topRowBorderStyle, backgroundColor: backgroundStyle}}
                    onClick={this.handleClick}
                >
                    {String(Math.round(this.props.means[Util.positions.indexOf(this.props.position)][overallPick-1]*10)/10)}
                </td>
            );
        }

        return positionOptions;
    }
}

export default PositionOption;
