import React from "react"
import { IonCard, IonCardContent, IonCardHeader} from "@ionic/react"
import SearchForm from "../forms/searchForm"

interface QuestionAnswerPair {
  q: string;
  a: string;
}

interface SearchState {
  previousQuestions: QuestionAnswerPair[];
  preloading: boolean;
}

interface SearchProps {
}


class Search extends React.Component<SearchProps, SearchState> {
    private el: React.RefObject<HTMLDivElement>;

    constructor(props: SearchProps) {
      super(props);
  
      this.el = React.createRef();
  
      this.state = {
        previousQuestions: [],
        preloading: false,
      };
    }

    showAnswer = (answer:string, question:string) => {
        this.setState({'preloading': false});
        const previousQuestions = this.state.previousQuestions.slice(); 
        previousQuestions.push({q: question, a: answer}); 
        this.setState({previousQuestions});
      }
    
    showPreloader = () => {
      this.setState({'preloading': true})
    }
      
    componentDidUpdate() {
        this.scrollToBottom();
      }
    
      scrollToBottom() {
        this.el.current?.scrollIntoView({ behavior: 'smooth' });
      }

    render() {
        return (
          <div>
            {this.state.previousQuestions.length > 0 && 
            this.state.previousQuestions.map(r =>
                <IonCard key={r.q}>
                <IonCardHeader className="hedgehog-question">{r.q}</IonCardHeader>
                <IonCardContent className="hedgehog-answer">{r.a}</IonCardContent>
                </IonCard> 
            )}
            {this.state.preloading === true && 
              <IonCard>
                <div className="center">
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                </div>
              </IonCard>
            }
            <IonCard>
              <SearchForm showAnswer={this.showAnswer} showPreloader={this.showPreloader}/>
            </IonCard>
            <div ref={this.el}></div>
          </div>
        );
      }
    }

export default Search