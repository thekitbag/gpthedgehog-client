import React from "react"
import { IonCard, IonCardContent, IonCardHeader} from "@ionic/react"
import SearchForm from "../forms/searchForm"
import AnswerCard from "./answerCard";

interface QuestionAnswerPair {
  q: string;
  a: string;
}

interface Threads {
  questionAnswerPair: QuestionAnswerPair[]
}

interface SearchState {
  previousQuestions: Threads[];
  preloading: boolean;
  firstQuestion: boolean;
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
        firstQuestion: true,
      };
    }

    showAnswer = (answer:string, question:string) => {
        this.setState({'preloading': false});
        const previousQuestions = this.state.previousQuestions.slice(); 
        const newThread = {
          questionAnswerPair: [{ q: question, a: answer }],
        };
        previousQuestions.push(newThread);
        this.setState({previousQuestions});
        this.setState({firstQuestion: false})
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
            this.state.previousQuestions.map((r, index)  =>
                <AnswerCard thread={r.questionAnswerPair} key={index} showPreloader={this.showPreloader}/>
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
              <SearchForm showAnswer={this.showAnswer} showPreloader={this.showPreloader} firstQuestion={this.state.firstQuestion}/>
            </IonCard>
            <div ref={this.el}></div>
          </div>
        );
      }
    }

export default Search