import React, { Component } from "react";

class ExplanationMain extends Component {
    render() {
        return (
            <div id={"explanation-main"}>
                <div id={"explanation-main-content"}>
                    <p>
                    A drafted fantasy team's projected success is traditionally (<span style={{fontStyle: 'italic'}}>and arbitrarily</span>)
                        evaluated by finding the sum of each player's projected
                    season total, however not every player starts and contributes to the team's score each week.
                        It is necessary to identify how often a player starts and how much they score
                    when deserving of a starting spot in order to properly
                        evaluate a fantasy team where some players will be in the starting lineup more than others.
                    </p>
                    <p>
                        To achieve this, we collected <span><a
                            className={'link-no-underline'}
                            href={'https://fantasydata.com/nfl/fantasy-football-weekly-projections'}
                            target={"_blank"}
                        >
                        projections</a></span> from 2015 through 2020 to
                    identify a probability distribution of what a player is projected to score in any week depending
                    on their season total projection. Given a sample lineup of players each representing a "best available" pick for their
                        position at whatever
                    overall pick they were drafted, we run Monte Carlo simulations for 100,000 weeks using each drafted player's weekly
                        projection probability distribution to see if each player is
                        projected to score enough in a week to start and if so how many points do they contribute to the team.
                    </p>
                    <p>For example,
                        if a quarterback in a simulated week is not projected to be the highest scoring player on the team
                        at the position,
                        they do not start and their projected points do not contribute to the team's projected total for the week. Using our method, starters
                    and bench players can be accurately weighted and compared depending not only on when they are
                    selected, but also on who else is on the fantasy team competing for a starting spot each week.
                    </p>
                    <br/>
                    <h3>Representing a typical draft</h3>
                    <p>
                        In an effort to study the draft strategy of when to pick a certain position, we have to make
                        our draft selections agnostic of specific players and assume each pick is a representation of
                        a typical player that would be available at the respective overall pick of the draft. Assuming
                        that we pick the player
                    </p>
                    <p>
                        Average Draft Position data from <span><a
                            className={'link-no-underline'}
                            href={'https://fantasyfootballcalculator.com/scenario-calculator'}
                            target={"_blank"}
                        >
                            Fantasy Football Calculator
                        </a></span> is used to calculate the probability
                        of any player being available at a pick. Assuming that we will always pick the available
                        player with the lowest ADP of their position, we can create a probability distribution of
                        weekly projected scoring for a given pick by averaging all the players that could be available,
                        weighted by the probability that a given player will be the best available at that pick.
                    </p>
                    <p>
                        Viewing each pick as a combination of the typical available player at a position creates a
                        level of abstraction that allows us to simulate lineups based on choice of position. Surely a
                        team generated from a mock draft can be evaluated in our simulation, but each draft following
                        the same strategy can look markedly different. We want to focus on evaluating the merits of the
                        underlying positional strategy taken during a draft rather than individual player selection decisions.
                    </p>
                </div>
            </div>
        );
    }
}

export default ExplanationMain;
