import React from "react";
import { getRequest, postRequest } from '../utils/api';
import {QuestionForm, AskButton} from "./questionForms";


class SearchForm extends QuestionForm {

    constructor(props: any) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    placeholderText(): string {
        if (this.props.firstQuestion == true) {
            return "Ask your question here"
        } else {
            return "Ask a new question here"
        }
        
    }

    inputClassName = 'initial-question-input'
    
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
}

export default SearchForm