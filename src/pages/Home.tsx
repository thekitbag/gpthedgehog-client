import React from 'react';
import { IonCol, IonContent, IonGrid, IonPage, IonRow, IonCard, IonButton, IonCardHeader, IonCardContent} from '@ionic/react';
import Header from '../components/header'
import Search from '../components/search';
import AnswerCard from '../components/answerCard';
import './Home.css';
import InputChoice from '../components/inputChoice';
import AudioQuestionRecorder from '../components/audioInput';

interface QuestionAnswerPair {
  q: string;
  a: string;
}

interface Threads {
  questionAnswerPair: QuestionAnswerPair[]
}

interface HomeState {
  chosenInput: string;
  preloading: boolean;
  previousQuestions: Threads[];
  firstQuestion: boolean;
}

interface HomeProps {
}

class Home extends React.Component<HomeProps, HomeState> {
  private el: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props)
    this.state = {chosenInput: 'undecided', preloading: false, previousQuestions: [], firstQuestion: true}
    this.el = React.createRef();
  }

  chooseInput = (input: string) =>  {
    this.setState({chosenInput: input})
  }

  showPreloader = () => {
    this.setState({'preloading': true})
  }

  showAnswer = (answer:string, question:string) => {
    this.setState({'preloading': false});
    const previousQuestions = this.state.previousQuestions.slice(); 
    const newThread = {
      questionAnswerPair: [{ q: question, a: answer }],
    };
    previousQuestions.push(newThread);
    this.setState({
      previousQuestions,
      firstQuestion: false,
      chosenInput: 'text',
    });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.current?.scrollIntoView({ behavior: 'smooth' });
  }

  tryAgain = () => {
    this.setState({preloading: false, chosenInput: 'undecided'})
    const previousQuestions = this.state.previousQuestions.slice();
    const tryAgainMessage = "Sorry, I couldn't understand your question. Please try again."
    const newThread = {
      questionAnswerPair: [{ q: tryAgainMessage, a: '' }],
    };
    previousQuestions.push(newThread);
    this.setState({previousQuestions});
  }

  render() {
    return (
      <IonPage>
        <IonContent fullscreen>
          <Header />
          <IonGrid>
            <IonRow>
              <IonCol>
                {this.state.previousQuestions.length > 0 && 
                  this.state.previousQuestions.map((r, index)  =>
                      <AnswerCard thread={r.questionAnswerPair} key={index} showPreloader={this.showPreloader} />
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
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                {
                this.state.chosenInput === 'undecided' &&
                  <InputChoice chooseInput={this.chooseInput}/>
                }
                {
                this.state.chosenInput === 'text' && this.state.preloading === false &&
                  <Search showAnswer={this.showAnswer} showPreloader={this.showPreloader} firstQuestion={this.state.firstQuestion}/>
                }
                {
                this.state.chosenInput === 'mic' &&
                  <AudioQuestionRecorder showAnswer={this.showAnswer} showPreloader={this.showPreloader} tryAgain={this.tryAgain}/>
                  /*<IonCard>
                    <IonCardHeader><h1>Audio Questions are coming soon</h1></IonCardHeader>
                    <IonCardContent>
                      <IonButton onClick={()=> this.setState({chosenInput: 'text'})}>Back</IonButton>
                    </IonCardContent>
                  </IonCard>*/
                }
              </IonCol>
            </IonRow>
            <IonRow>
              <div ref={this.el}></div>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }
}

export default Home;
