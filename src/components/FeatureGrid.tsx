import React from 'react';
import { IonGrid, IonRow, IonCol, IonIcon, IonText } from '@ionic/react';
import { helpOutline, chatbox, chatbubbleEllipsesOutline } from 'ionicons/icons'; 

const features = [
  { icon: helpOutline, title: 'Ask a Question' },
  { icon: chatbox, title: 'Get an answer in seconds' },
  { icon: chatbubbleEllipsesOutline, title: 'Ask a follow up question'},
];

const FeatureGrid: React.FC = () => {
  return (
    <IonGrid className='feature-grid'>
        <IonRow>
            <IonCol size="12" class="ion-text-center">
                <IonText color="light">
                    <h1>How It Works</h1>
                </IonText>
            </IonCol>
        </IonRow>
      <IonRow class="ion-text-center">
        {features.map((feature, index) => (
          <IonCol size="12" size-md="4" key={index}>
            <IonIcon icon={feature.icon} size="large" color='light'/>
            <IonText color="light">
              <h2>{feature.title}</h2>
            </IonText>
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
};

export default FeatureGrid;
