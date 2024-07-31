import React from "react";
import { postRequest } from '../utils/api'
import { QuestionForm } from "./questionForms";

class FollowUpQuestionForm extends QuestionForm {
    constructor (props: any) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    placeholderText(): string {
        return "Ask a follow up question"
    }

    inputClassName = 'follow-up-question-input'

    async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.props.showPreloader();
        let data = {previousQuestions: this.props.thread, followUp: this.state.value};
        let r = await postRequest('/follow_up', data);

        if (r) {
            const answer = r.data.answer;
            const question = r.data.question;
            this.props.hidePreloader()
            this.props.showAnswer(answer, question);
          } else {
            console.error('Request failed');
          }
        this.setState({ value: '' });
    }
}

export default FollowUpQuestionForm