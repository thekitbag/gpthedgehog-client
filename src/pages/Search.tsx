import React from 'react';
import { IonCol, IonContent, IonGrid, IonPage, IonRow, IonCard, IonButton, IonCardHeader, IonCardContent, IonText, IonCardTitle} from '@ionic/react';
import Header from '../components/Header'
import SearchBox from '../components/searchBox';
import AnswerCard from '../components/answerCard';
import './Home.css';
import './Search.css';
import InputChoice from '../components/inputChoice';
import AudioQuestionRecorder from '../components/audioInput';
import UpgradeBanner from '../components/UpgradeBanner';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import getUserInfo from "../utils/auth";

interface QuestionAnswerPair {
  q: string;
  a: string;
}

interface Threads {
  questionAnswerPair: QuestionAnswerPair[]
}

interface SearchState {
  chosenInput: string;
  preloading: boolean;
  previousQuestions: Threads[];
  firstQuestion: boolean;
  userName: string;
  subscriptionType: string;
  remainingSearches: number;
  userId: number;
}

interface SearchProps extends RouteComponentProps {
}

class Search extends React.Component<SearchProps, SearchState> {
  private el: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props)
    this.state = {chosenInput: 'text', 
                  preloading: false,
                  previousQuestions: [], 
                  firstQuestion: true,
                  userName: '',
                  subscriptionType: '',
                  remainingSearches: 0,
                  userId: -1,
                }
    this.el = React.createRef();
  }

  async componentDidMount() {
    try {
      const userInfo = await getUserInfo();
      if (userInfo.authenticated === false) {
        this.props.history.replace("/login"); 
      }
      else {
        this.setState({userName: userInfo.userName, 
                      subscriptionType: userInfo.subscriptionType, 
                      remainingSearches: userInfo.searches,
                      userId: userInfo.userId
                    })
      }
    }
    catch (error) {
      console.log(error)
    }
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
    this.setState({preloading: false, chosenInput: 'text'})
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
            <UpgradeBanner 
              remainingSearches={this.state.remainingSearches} 
              subscriptionType={this.state.subscriptionType}
              userId={this.state.userId} 
            />
          {this.state.previousQuestions.length == 0 && 
            <IonRow>
              <IonCol>
                <IonText >
                  <h1 className='ion-text-center'>Hi {this.state.userName} What do you want to know?</h1>
                </IonText>
              </IonCol>
            </IonRow>
          }
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
                this.state.chosenInput === 'undecided' && this.state.firstQuestion === true &&
                  <InputChoice chooseInput={this.chooseInput} title={'Ask Me Anything'} subTitle={'How do you want to ask your question?'} cardClass={'primary-input-choice'} buttonClass={''}/>
                }
                {
                this.state.chosenInput === 'undecided' && this.state.firstQuestion === false &&
                  <InputChoice chooseInput={this.chooseInput} title={'Ask Me Something New'} subTitle={''} cardClass={'primary-input-choice'} buttonClass={''}/>
                }
                {
                this.state.chosenInput === 'text' && this.state.preloading === false &&
                  <SearchBox showAnswer={this.showAnswer} showPreloader={this.showPreloader} firstQuestion={this.state.firstQuestion}/>
                }
                {
                this.state.chosenInput === 'mic' && this.state.preloading === false &&
                  <AudioQuestionRecorder showAnswer={this.showAnswer} showPreloader={this.showPreloader} tryAgain={this.tryAgain}/>
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

export default withRouter(Search);
