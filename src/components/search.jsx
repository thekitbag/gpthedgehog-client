import React from "react"
import { IonCard, IonCardContent, IonCardHeader} from "@ionic/react"
import SearchForm from "../forms/searchForm"

class Search extends React.Component {
    state = {"previousQuestions":  []};

    showAnswer = (answer, question) => {
        this.setState({'preloading': false});
        const previousQuestions = this.state.previousQuestions.slice(); // Make a copy of the array
        previousQuestions.push({q: question, a: answer}); // Append the new object
        this.setState({previousQuestions}); // Update the state with the new array
      }
    
    showPreloader = () => {
      this.setState({'preloading': true})
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
            {this.state.preloading === true && 
              <IonCard>
                <div class="center">
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                </div>
              </IonCard>
            }
            <IonCard>
              <SearchForm showAnswer={this.showAnswer} showPreloader={this.showPreloader}/>
            </IonCard>
            <div ref={el => { this.el = el; }} />
          </div>
        );
      }
    }

export default Search