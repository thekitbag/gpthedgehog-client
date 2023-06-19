import React from "react";
import { IonGrid, IonRow, IonCol, IonInput, IonButton } from "@ionic/react";
import { InputChangeEventDetail } from '@ionic/core';
import { postRequest } from '../utils/api'
import { QuestionForm, AskButton } from "./questionForms";

class FollowUpQuestionForm extends QuestionForm {
    constructor (props: any) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let data = {previousQuestions: this.props.thread, followUp: this.state.value}
        let r = await postRequest('/follow_up', data);

        if (r) {
            const answer = r.data.answer;
            const question = r.data.question;
            this.props.showAnswer(answer, question);
          } else {
            console.error('Request failed');
          }
        this.setState({ value: '' });
    }

    placeholderText() {
        return 'ask a follow up question...'
    }
}

export default FollowUpQuestionForm