import React from 'react';
import { IonContent, IonPage, IonHeader } from '@ionic/react';
import HeroSection from '../components/HeroSection';
import FeatureGrid from '../components/FeatureGrid';
import Footer from '../components/Footer';
import Header from '../components/Header'
import './Home.css'; 

const LandingPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <Header />
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <HeroSection />
        <FeatureGrid />
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default LandingPage;
