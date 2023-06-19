import React from "react";
import { IonCol, IonGrid, IonInput, IonItem, IonRow } from '@ionic/react';
import { IonButton } from '@ionic/react';
import { InputChangeEventDetail } from '@ionic/core';

interface ButtonProps {
    onClick: () => void;
}

interface QuestionFormProps {
    showAnswer: (answer: string, question: string) => void;
    showPreloader: () => void;
    firstQuestion?: boolean;
    thread?: {q:string, a:string}[];
}

interface QuestionFormState {
    value: string;
}

class AskButton extends React.Component<ButtonProps> {
    render() {
        return <IonButton onClick={this.props.onClick} color='primary'>Ask</IonButton>
    }
}

abstract class QuestionForm extends React.Component<QuestionFormProps, QuestionFormState> {

    constructor(props: any) {
        super(props);
        this.state = {value: ''};  
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event: CustomEvent<InputChangeEventDetail>) {
        this.setState({value: event.detail.value || ''});
    }

    abstract placeholderText(): string;
    abstract handleSubmit(event: React.FormEvent<HTMLFormElement>): void;

    render() {
        return  <form onSubmit={this.handleSubmit}>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12">
                                <IonInput 
                                    className="placeholder-text" 
                                    type="text" size={240} 
                                    onIonInput={this.handleChange}
                                    value={this.state.value} 
                                    color="dark" 
                                    placeholder={this.placeholderText()} />
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

export {QuestionForm, AskButton}