import React from "react";
import { IonGrid, IonRow, IonCol, IonInput, IonButton } from "@ionic/react";
import { InputChangeEventDetail } from '@ionic/core';
import { postRequest } from '../utils/api'

//this Ask button is a copy of the one in SearchForm and they should both be imported in from one place

interface ButtonProps {
    onClick: () => void;
}

class AskButton extends React.Component<ButtonProps> {
    render() {
        return <IonButton onClick={this.props.onClick} color='primary'>Ask</IonButton>
    }
}

interface FollowUpQuestionState {
    value: string;
}

interface FollowUpQuestionProps {
    thread: {q:string, a:string}[];
    showResponse: (result: string, question: string) => void;
}

//this form and tother one should inherit from a single hedgehogForm Component

class FollowUpQuestionForm extends React.Component<FollowUpQuestionProps, FollowUpQuestionState> {
    constructor (props: any) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: CustomEvent<InputChangeEventDetail>) {
        this.setState({value: event.detail.value || ''});
    }

    async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let data = {previousQuestions: this.props.thread, followUp: this.state.value}
        let r = await postRequest('/follow_up', data);

        if (r) {
            const results = r.data.answer;
            const question = r.data.question;
            this.props.showResponse(results, question);
          } else {
            console.error('Request failed');
          }
        this.setState({ value: '' });
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12">
                                <IonInput 
                                    className="follow-up-placeholder-text" 
                                    type="text" size={240} 
                                    onIonInput={this.handleChange}
                                    value={this.state.value} 
                                    color="dark" 
                                    placeholder="ask a follow up question..." />
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="12" class="ion-text-center">
                                <AskButton
                                    onClick={() => this.handleSubmit({ preventDefault: () => {} } as React.FormEvent<HTMLFormElement>)}
                                />
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </form>
    }
}

export default FollowUpQuestionForm