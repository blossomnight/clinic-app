import * as React from "react";
import Autosuggest from "react-autosuggest";
import Specializations from "../../utils/@Specialization-List.json";

type Props = {};
type State = {};

const specializations: string[] = Specializations["Specialization"];

const getSuggestions = (value: string) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : specializations.filter(
        (spec) => spec.toLowerCase().slice(0, inputLength) === inputValue
      );
};

const getSuggestionValue = (suggestion: string) => suggestion;

const renderSuggestion = (suggestion: string) => <div>{suggestion}</div>;

export class SuggestedSearch extends React.Component<Props, State> {
  state = {
    value: "",
    suggestions: [],
  };

  //   onChange = (event: React.KeyboardEvent) => {
  //     this.setState({
  //       value: newValue,
  //     });
  //   };

  //   onSuggestionsFetchRequested = ({value: string, reason: string}) => {
  //     this.setState({
  //       suggestions: getSuggestions(value),
  //     });
  //   };

  //   onSuggestionsClearRequested = () => {
  //     this.setState({
  //       suggestions: [],
  //     });
  //   };

  render() {
    // const inputProps = {
    //   placeholder: "Type a programming language",
    //   value: "",
    //   onChange: this.onChange,
    // };
    return (
      <div></div>
      //   <Autosuggest
      //     suggestions={specializations}
      //     onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
      //     onSuggestionsClearRequested={this.onSuggestionsClearRequested}
      //     getSuggestionValue={getSuggestionValue}
      //     renderSuggestion={renderSuggestion}
      //     inputProps={inputProps}
      //   />
    );
  }
}
