import React from 'react';
import { IonGrid, IonRow, IonCol, IonImg, IonText, IonButton } from '@ionic/react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <IonGrid>
      <IonRow className="ion-align-items-center">
        <IonCol size="12" sizeMd="6">
          <IonText color="dark">
            <h1 className='hero-title'>Get answers instead of webpages</h1>
            <p>Ask Hedgehog anything and get a simple answer in seconds.</p>
            <p>No need to trawl through useless search results, just the answer you want in language you can understand.</p>
          </IonText>
          <IonButton>
            <Link className="btn-text" to="/signup">Sign Up</Link>
          </IonButton>
        </IonCol>
        <IonCol size="12" sizeMd="6" className="ion-text-center"> 
            <div className="img1-container">
            </div> 
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default HeroSection;
