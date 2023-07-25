import { IonCard, IonCardContent, IonCardHeader } from "@ionic/react";
import React, { ReactNode } from "react";
import FollowUpQuestionForm from "../forms/followUpQuestionForm";
import InputChoice from "./inputChoice";

interface AnswerCardProps {
    thread: {q:string, a:string}[];
    showPreloader: () => void;
}

interface AnswerCardState {
    thread: {q:string, a:string}[];
    preloading: boolean;
}

class AnswerCard extends React.Component<AnswerCardProps, AnswerCardState> {
    constructor (props: any) {
        super(props);
        this.state = {thread: this.props.thread, preloading: false};
    }

    showResponse = (answer: string, question: string) => {
        const thread = this.state.thread.slice(); 
        const qpPair =  { q: question, a: answer };
        thread.push(qpPair);
        this.setState({thread});
    }

    showPreloader = () => {
        this.setState({preloading: true})
    }

    hidePreloader = () => {
        this.setState({preloading: false})
    }

    render() {
        return  <IonCard className="answer-card">
                    {this.state.thread.map( (i, index) => 
                            <div key={index}>
                                <IonCardHeader className="hedgehog-question">{i.q}</IonCardHeader>
                                <IonCardContent className="hedgehog-answer">{i.a}</IonCardContent>
                            </div>  
                        )
                    }
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
                    {this.state.preloading === false &&
                            <FollowUpQuestionForm thread={this.state.thread} showAnswer={this.showResponse} showPreloader={this.showPreloader} hidePreloader={this.hidePreloader}/>
                    }
                </IonCard>
    }
}

export default AnswerCard