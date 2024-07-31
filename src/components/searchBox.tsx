import React from "react"
import { IonCard } from "@ionic/react"
import SearchForm from "../forms/searchForm"

interface SearchBoxState {
}

interface SearchBoxProps {
  showAnswer: (question: string, answer:string) => void;
  showPreloader: () => void;
  firstQuestion: boolean;
}


class SearchBox extends React.Component<SearchBoxProps, SearchBoxState> {

    constructor(props: SearchBoxProps) {
      super(props);
    }

    render() {
        return (
          <div>
            <IonCard>
              <SearchForm showAnswer={this.props.showAnswer} showPreloader={this.props.showPreloader} firstQuestion={this.props.firstQuestion} hidePreloader={function (): void {
                throw new Error("Function not implemented.");
              } }/>
            </IonCard>
          </div>
        );
      }
    }

export default SearchBox