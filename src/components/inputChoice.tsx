import { IonButton, IonCard, IonCardSubtitle, IonCardHeader, IonRow, IonIcon, IonCol } from "@ionic/react";
import { micOutline, pencilOutline } from 'ionicons/icons';



import React from "react";
import './inputChoice.css'

interface InputChoiceProps {
    chooseInput: (input: string) => void;
}

class InputChoice extends React.Component <InputChoiceProps> {
    constructor(props: any) {
        super(props)
    }

    render() {
        return  <IonCard>
                    <IonCardHeader className="input-choice-header">Ask Me Anything</IonCardHeader>
                    <IonCardSubtitle className="input-choice-subtitle">How do you want to ask your question?</IonCardSubtitle>
                    <IonRow>
                        <IonCol>
                            <IonButton expand="block" size="large" onClick={() => this.props.chooseInput('text')}>
                                <IonIcon slot="start" icon={pencilOutline}></IonIcon>
                                Type it
                            </IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton expand="block" size="large" onClick={() => this.props.chooseInput('mic')}>
                                <IonIcon slot="start" icon={micOutline}></IonIcon>
                                Say it
                            </IonButton>
                        </IonCol>
                    </IonRow>                               
                </IonCard>
    }
}

export default InputChoice