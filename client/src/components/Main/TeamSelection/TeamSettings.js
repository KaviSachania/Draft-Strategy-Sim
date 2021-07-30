import React, { Component } from "react";

import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from "react-bootstrap/Button";

class TeamSettings extends Component {
    constructor(props) {
        super(props);
        this.onChangeScoring = this.onChangeScoring.bind(this);
        this.onChangeTeams = this.onChangeTeams.bind(this);
        this.onChangeRounds = this.onChangeRounds.bind(this);
        this.onChangePick = this.onChangePick.bind(this);
        this.onClearLineup = this.onClearLineup.bind(this);
    }

    onChangeScoring = (e) => {
        this.props.setScoring(e.currentTarget.value);
    };

    onChangeTeams = (e) => {
        this.props.setTeams(e.currentTarget.value);
    };

    onChangeRounds = (e) => {
        this.props.setRounds(e.currentTarget.value);
    };

    onChangePick = (e) => {
        this.props.setPick(e);
    };

    onClearLineup = () => {
        this.props.clearLineup();
    };

    render() {
        return (
            <div id={"team-settings"}>
                <Form id={"team-settings-form"}>
                    <Form.Label className={"settings-btn-label"} htmlFor={'scoring-btn-group'}>Scoring: </Form.Label>
                    <ToggleButtonGroup id={'scoring-btn-group'} className={"settings-btn-group"} name={'scoring-btn-group'} defaultValue={'Standard'} >
                        <ToggleButton
                            key={0}
                            id={'standard-btn'}
                            type={"radio"}
                            variant={'outline-success'}
                            name={"standard-btn"}
                            value={'Standard'}
                            size={'sm'}
                            checked={this.props.scoring === 'Standard'}
                            onChange={this.onChangeScoring}
                        >
                            Standard
                        </ToggleButton>
                        <ToggleButton
                            key={1}
                            id={'ppr-btn'}
                            type={"radio"}
                            variant={'outline-success'}
                            name={"ppr-btn"}
                            value={'PPR'}
                            size={'sm'}
                            checked={true}
                            onChange={this.onChangeScoring}
                        >
                            PPR
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <Form.Label className={"settings-btn-label"} htmlFor={'teams-btn-group'}>Teams: </Form.Label>
                    <ToggleButtonGroup id={'teams-btn-group'} className={"settings-btn-group"} name={'teams-btn-group'} defaultValue={12} >
                        {[8,10,12].map(
                            (teams) => (
                                <ToggleButton
                                    key={teams}
                                    id={`teams-${teams}-btn`}
                                    type={"radio"}
                                    variant={'outline-success'}
                                    name={`teams-${teams}-btn`}
                                    value={teams}
                                    size={'sm'}
                                    checked={teams === 12}
                                    onChange={this.onChangeTeams}
                                >
                                    {teams}
                                </ToggleButton>
                            ),
                        )}
                    </ToggleButtonGroup>
                    <Form.Label className={"settings-btn-label"} htmlFor={'rounds-btn-group'}>Rounds: </Form.Label>
                    <ToggleButtonGroup id={'rounds-btn-group'} className={"settings-btn-group"} name={'rounds-btn-group'} defaultValue={16} >
                        {[14,15,16].map(
                            (rounds) => (
                                <ToggleButton
                                    key={rounds}
                                    id={`rounds-${rounds}-btn`}
                                    type={"radio"}
                                    variant={'outline-success'}
                                    name={`rounds-${rounds}-btn`}
                                    value={rounds}
                                    size={'sm'}
                                    checked={this.props.rounds===rounds}
                                    onChange={this.onChangeRounds}
                                >
                                    {rounds}
                                </ToggleButton>
                            ),
                        )}
                    </ToggleButtonGroup>
                    <Form.Label className={"settings-btn-label"} htmlFor={"picks-dropdown"}>Pick: </Form.Label>
                    <DropdownButton className={"settings-btn-group"}
                                    as={ButtonGroup}
                                    key={2}
                                    id={'picks-dropdown'}
                                    variant={'success'}
                                    title={''}
                                    size={'sm'}
                                    title={this.props.pick}
                                    default={1}
                    >
                        {[...Array(this.props.teams).keys()].map(
                            (pick) => (
                                <Dropdown.Item
                                    className={'pick-dropdown-option'}
                                    eventKey={pick+1}
                                    variant={'success'}
                                    value={pick+1}
                                    key={pick+1}
                                    id={`pick-${pick+1}-option`}
                                    size={'sm'}
                                    onSelect={this.onChangePick}
                                >
                                    {pick+1}
                                </Dropdown.Item>
                            ),
                        )}
                    </DropdownButton>
                    <Button
                        id={"clear-button"}
                        variant={"success"}
                        value={"Clear"}
                        size={'sm'}
                        onClick={this.onClearLineup}
                    >
                        <i className="fas fa-redo"></i>
                    </Button>
                </Form>
            </div>
        );
    }
}

export default TeamSettings;
