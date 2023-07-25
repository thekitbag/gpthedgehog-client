import React from "react"
import { IonCard} from "@ionic/react"
import SearchForm from "../forms/searchForm"

interface SearchState {
}

interface SearchProps {
  showAnswer: (question: string, answer:string) => void;
  showPreloader: () => void;
  firstQuestion: boolean;
}


class Search extends React.Component<SearchProps, SearchState> {

    constructor(props: SearchProps) {
      super(props);
    }

    render() {
        return (
          <div>
            <IonCard>
              <SearchForm showAnswer={this.props.showAnswer} showPreloader={this.props.showPreloader} firstQuestion={this.props.firstQuestion}/>
            </IonCard>
          </div>
        );
      }
    }

export default Search