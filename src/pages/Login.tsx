import React, { useEffect } from 'react';
import { IonPage, IonContent, IonHeader, IonGrid, IonRow, IonCol } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import LoginForm from '../forms/LoginForm';
import getUserInfo from '../utils/auth';
import './Login.css';

const LoginPage: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    getUserInfo().then((userInfo) => {
      if (userInfo.authenticated === true) {
        history.replace("/search"); // Redirect to search page if already logged in
      }
    });
  }, [history]);

  return (
    <IonPage>
      <IonHeader>
        <Header />
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="6">
              <LoginForm />
            </IonCol>
            <IonCol sizeMd="6">
              {/* You can add an image or other content here if you want */}
              <div className="img3-container"></div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
