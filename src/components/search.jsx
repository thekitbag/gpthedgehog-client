import React from "react"
import { IonCard, IonCardContent, IonCardHeader} from "@ionic/react"
import SearchForm from "../forms/searchForm"

class Search extends React.Component {
    state = {"previousQuestions":  []};
    showAnswer = (answer, question) => {
        const previousQuestions = this.state.previousQuestions.slice(); // Make a copy of the array
        previousQuestions.push({q: question, a: answer}); // Append the new object
        this.setState({previousQuestions}); // Update the state with the new array
      }
      
    componentDidUpdate() {
        this.scrollToBottom();
      }
    
    scrollToBottom() {
    this.el.scrollIntoView({ behavior: 'smooth' });
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
            <IonCard>
              <SearchForm showAnswer={this.showAnswer}/>
            </IonCard>
            <div ref={el => { this.el = el; }} />
          </div>
        );
      }
    }

export default Search