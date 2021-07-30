import React, { Component } from "react";
import ExplanationHeader from "./ExplanationHeader";
import ExplanationMain from "./ExplanationMain";

class Explanation extends Component {
    render() {
        return (
            <section>
                <div id={"explanation"}>
                    <div>
                    <ExplanationHeader />
                    <ExplanationMain />
                    </div>
                </div>
            </section>
        );
    }
}

export default Explanation;
