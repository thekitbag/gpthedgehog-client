import React from 'react';
import { IonFooter, IonToolbar, IonText } from '@ionic/react';

const Footer: React.FC = () => (
  <IonFooter>
    <IonToolbar>
      <IonText className="ion-text-center ion-padding">
        © 2024 Hedgehog
      </IonText>
    </IonToolbar>
  </IonFooter>
);

export default Footer;
