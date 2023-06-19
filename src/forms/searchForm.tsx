import React from "react";
import { IonCol, IonGrid, IonInput, IonItem, IonRow } from '@ionic/react';
import { IonButton } from '@ionic/react';
import { InputChangeEventDetail } from '@ionic/core';
import { getRequest, postRequest } from '../utils/api';
import {QuestionForm, AskButton} from "./questionForms";


class SearchForm extends QuestionForm {

    constructor(props: any) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

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

    placeholderText() {
        if (this.props.firstQuestion === true){
            return 'Ask me anything...'
        }
        else {
            return 'Ask me something else...'
        } 
    }
}

export default SearchForm