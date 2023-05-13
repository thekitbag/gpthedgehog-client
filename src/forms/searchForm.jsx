import React from "react";
import { IonCol, IonGrid, IonInput, IonItem, IonRow } from '@ionic/react';
import { IonButton } from '@ionic/react';
import { getRequest, postRequest } from '../utils/api';

class AskButton extends React.Component {
    render() {
        return <IonButton onClick={this.props.ask} color='primary'>Ask</IonButton>
    }
}

class SearchForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.props.showPreloader();
        const data = 'q=' + this.state.value;
        let r = await getRequest('/ask', data);
        const results = r.data.answer;
        const question = r.data.question;
        this.props.showAnswer(results, question);
    }

    render() {
        return  <form onSubmit={this.handleSubmit}>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12">
                                <IonInput className="placeholder-text" type="text" size="240" onIonInput={this.handleChange} color="dark" placeholder="Ask me anything..." />
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="12" class="ion-text-center">
                                <AskButton 
                                    value="Submit"
                                    ask={this.handleSubmit}
                                />
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </form>
    }
}

export default SearchForm