import React from "react";

class Util {

    static positions = ["QB", "RB", "WR", "TE", "DEF", "K"];

    static colors = ["LightCoral", "yellow", "Tan", "cyan", "orange", "Magenta"];

    static getOverallPick = (teams, round, pick) => {
        return (teams * (round - 1)) + ((round % 2 === 1) ? pick : (teams - pick + 1));
    };
}

export default Util;