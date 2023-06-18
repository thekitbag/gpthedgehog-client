import React from "react";
import { IonCol, IonGrid, IonInput, IonItem, IonRow } from '@ionic/react';
import { IonButton } from '@ionic/react';
import { InputChangeEventDetail } from '@ionic/core';
import { getRequest, postRequest } from '../utils/api';

interface ButtonProps {
    onClick: () => void;
}

interface SearchFormProps {
    showAnswer: (answer: string, question: string) => void;
    showPreloader: () => void;
    firstQuestion: boolean;
}

interface SearchFormState {
    value: string;
}

class AskButton extends React.Component<ButtonProps> {
    render() {
        return <IonButton onClick={this.props.onClick} color='primary'>Ask</IonButton>
    }
}

//this form and tother one should inherit from a single hedgehogForm Component
class SearchForm extends React.Component<SearchFormProps, SearchFormState> {

    constructor(props: any) {
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
        this.props.showPreloader();
        const data = {queryString:'q=' + this.state.value};
        let r = await getRequest('/ask', data);

        if (r) {
            const results = r.data.answer;
            const question = r.data.question;
            this.props.showAnswer(results, question);
          } else {
            // Handle the case when r is undefined
            console.error('Request failed');
          }
        
        this.setState({ value: '' });
    }

    setPlaceholderText =() => {
        if (this.props.firstQuestion === true){
            return 'Ask me anything...'
        }
        else {
            return 'Ask me something else...'
        } 
    }

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
                                    placeholder={this.setPlaceholderText()} />
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

export default SearchForm