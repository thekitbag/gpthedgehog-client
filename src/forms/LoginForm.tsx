import React, { useState } from "react";
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  InputChangeEventDetail,
} from "@ionic/react";
import { toastController } from "@ionic/core";
import { postRequest } from "../utils/api";
import { useHistory } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  const handleInputChange = (event: CustomEvent<InputChangeEventDetail>) => {
    const element = event.target as HTMLIonInputElement;
    const { name, value } = element;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Basic Validation 
    if (!formData.email || !formData.password) {
      const toast = await toastController.create({
        message: "Please fill in both email and password.",
        duration: 2000,
        color: "danger",
      });
      toast.present();
      return;
    }

    try {
      const response = await postRequest("/login", formData);
      if (response.status >= 200 && response.status < 300) {
        // Store the user ID or token here, if needed
        localStorage.setItem("userId", response.data.user_id);

        const toast = await toastController.create({
          message: "Login successful!",
          duration: 2000,
          color: "success",
        });
        toast.present();
        history.push("/search"); // Redirect after login
      } else {
        const errorMessage =
          response.data.error || "Login failed. Please check your credentials.";
        const toast = await toastController.create({
          message: errorMessage,
          duration: 2000,
          color: "danger",
        });
        toast.present();
      }
    } catch (error) {
      // Handle login errors
      console.error("Login failed:", error);
      const toast = await toastController.create({
        message: "Login failed. Please check your credentials.",
        duration: 2000,
        color: "danger",
      });
      toast.present();
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

      <IonButton type="submit" expand="block">
        Login
      </IonButton>

      <p className="ion-text-center">
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </form>
  );
};

export default LoginForm;
