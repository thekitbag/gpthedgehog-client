import React, { useState, useEffect } from "react";
import { IonPage, IonContent, IonHeader, IonGrid, IonRow, IonCol } from "@ionic/react";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import SignupForm from "../forms/SignupForm";
import checkAuthStatus from "../utils/auth";
import "./Signup.css" 

const SignupPage: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    checkAuthStatus().then((authenticated) => {
      if (authenticated) {
        history.replace("/search");
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
              <SignupForm />
            </IonCol>
            <IonCol size="12" sizeMd="6">
              <div className="img2-container">
              </div> 
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SignupPage;
