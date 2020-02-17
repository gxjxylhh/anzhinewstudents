import React, { Component } from "react";
import PropTypes from "prop-types";
export class Autocomplete extends Component {
    static propTypes = {
        suggestions: PropTypes.instanceOf(Array)
    };
    static defaultProperty = {
        suggestions: []
    };
    constructor(props) {
        super(props);
        //console.log(this.props.name+"props major name");

        this.state = {
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: ""
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange = e => {

        const { suggestions } = this.props;
        const userInput = e.currentTarget.value;

        const filteredSuggestions = suggestions.filter(
            (suggestion) => {
            return suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1;
            }
        );

        console.log("userinput"+userInput);console.log("suggestion"+filteredSuggestions);
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        });
        this.forceUpdate();
    };

    onClick = e => {

        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText
        });
    };
    onKeyDown = e => {

        const { activeSuggestion, filteredSuggestions } = this.state;

        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion]
            });
        } else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion - 1 });
        } else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };




    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;
        let suggestionsListComponent;
        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                console.log(filteredSuggestions+"wfalsdkll;k;lk~~~~~~");
                suggestionsListComponent = (
                    <ul className="suggestion">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;

                            if (index === activeSuggestion) {
                                className = "";
                                //console.log(this.state.userInput+"   hooo ya");
                            }else{
                                console.log("hooya");
                                console.log("suggestion inside"+suggestion);
                                console.log("wot inside"+filteredSuggestions);

                            }

                            return (

                                <li key={suggestion} onClick={onClick}>
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div className="no-suggestions">
                        <em>please press the Load button then delete and re-enter university name</em>
                    </div>
                );
            }
        }

        return (
            <React.Fragment>
                <input
                    type="search"
                    name="majorname"
                    size = '34'
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                />
                {suggestionsListComponent}
            </React.Fragment>

        );
    }
}

export default Autocomplete;
