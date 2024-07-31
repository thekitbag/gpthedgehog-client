import { IonButton, IonCard, IonCardSubtitle, IonCardHeader, IonRow, IonIcon, IonCol } from "@ionic/react";
import { micOutline, pencilOutline } from 'ionicons/icons';



import React from "react";
import './inputChoice.css'

interface InputChoiceProps {
    chooseInput: (input: string) => void;
    title: string;
    subTitle: string;
    cardClass: string;
    buttonClass: string;
}

class InputChoice extends React.Component <InputChoiceProps> {
    constructor(props: any) {
        super(props)
    }

    render() {
        return  <IonCard className={this.props.cardClass}>
                    <IonCardHeader className="input-choice-header">{this.props.title}</IonCardHeader>
                    <IonCardSubtitle className="input-choice-subtitle">{this.props.subTitle}</IonCardSubtitle>
                    <IonRow>
                        <IonCol>
                            <IonButton className={this.props.buttonClass} expand="block"  onClick={() => this.props.chooseInput('text')}>
                                <IonIcon slot="start" icon={pencilOutline}></IonIcon>
                                Type it
                            </IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton className={this.props.buttonClass} expand="block" onClick={() => this.props.chooseInput('mic')}>
                                <IonIcon slot="start" icon={micOutline}></IonIcon>
                                Say it
                            </IonButton>
                        </IonCol>
                    </IonRow>                               
                </IonCard>
    }
}

export default InputChoice