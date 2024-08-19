import React, { useState } from "react";
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  InputChangeEventDetail,
  IonSpinner,
  IonText,
} from "@ionic/react";
import { toastController } from "@ionic/core";
import { postRequest } from "../utils/api";
import { useHistory } from "react-router-dom";

const LoginForm: React.FC = () => {

  const history = useHistory();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null); 

  const handleInputChange = (event: CustomEvent<InputChangeEventDetail>) => {
    const element = event.target as HTMLIonInputElement;
    const { name, value } = element;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    if (!formData.email || !formData.password) {
        setFormError("Please fill in both email and password.");
        return;
    }

    try {
      setIsLoading(true);
      setFormError(null); 

      const response = await postRequest("/login", formData);
      if (response.status >= 200 && response.status < 300) {
        history.push("/search"); // Redirect after login
      } else {
        const errorMessage =
          response.data.error || "Login failed. Please check your credentials.";
        setFormError(errorMessage);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setFormError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <IonItem>
        <IonLabel position="floating">Email</IonLabel>
        <IonInput
          type="email"
          name="email"
          value={formData.email}
          onIonChange={handleInputChange}
        />
      </IonItem>

      <IonItem>
        <IonLabel position="floating">Password</IonLabel>
        <IonInput
          type="password"
          name="password"
          value={formData.password}
          onIonChange={handleInputChange}
        />
      </IonItem>
      <input className="ion-hide" type="submit"/>

      {formError && <IonText className="error-message" color="danger">{formError}</IonText>}

      <IonButton type="submit" expand="block" disabled={isLoading}> 
        {isLoading ? ( 
          <IonSpinner name="crescent" /> 
        ) : (
          "Sign Up"
        )}
      </IonButton>

      <p className="ion-text-center">
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </form>
  );
};

export default LoginForm;
