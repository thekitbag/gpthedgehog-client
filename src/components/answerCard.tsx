import { IonCard, IonCardContent, IonCardHeader } from "@ionic/react";
import React, { ReactNode } from "react";
import FollowUpQuestionForm from "../forms/followUpQuestionForm";

interface AnswerCardProps {
    thread: {q:string, a:string}[];
}

interface AnswerCardState {
    thread: {q:string, a:string}[];
}

class AnswerCard extends React.Component<AnswerCardProps, AnswerCardState> {
    constructor (props: any) {
        super(props);
        this.state = {thread: this.props.thread};
    }

    showResponse = (answer: string, question: string) => {
        const thread = this.state.thread.slice(); 
        const qpPair =  { q: question, a: answer };
        thread.push(qpPair);
        this.setState({thread});
    }
    render() {
        console.log(this.state)
        return  <IonCard>
                  <div>
                    {this.state.thread.map( i => 
                            <div>
                                <IonCardHeader className="hedgehog-question">{i.q}</IonCardHeader>
                                <IonCardContent className="hedgehog-answer">{i.a}</IonCardContent>
                            </div>  
                        )
                    }
                  </div>
                  <FollowUpQuestionForm thread={this.state.thread} showResponse={this.showResponse}/>
                </IonCard>
    }
}

export default AnswerCard