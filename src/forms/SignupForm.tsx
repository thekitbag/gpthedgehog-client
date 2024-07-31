import { InputChangeEventDetail, IonButton, IonInput, IonItem, IonLabel, useIonRouter } from "@ionic/react";
import { toastController } from '@ionic/core';
import { useEffect, useState } from "react";
import { postRequest } from "../utils/api";
import { useHistory } from 'react-router-dom';
import { passwordValidator } from "../utils/validators";


const SignupForm: React.FC = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      
      const handleInputChange = (event: CustomEvent<InputChangeEventDetail>) => {
        const element = event.target as HTMLIonInputElement;
        const { name, value } = element;
        setFormData({ ...formData, [name]: value });
      };

      const [shouldRedirect, setShouldRedirect] = useState(false);
      
      const history = useHistory();
      
      const [formErrors, setFormErrors] = useState({
        password: "",
        confirmPassword: "",
      });
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const errors = passwordValidator(formData.password, formData.confirmPassword);
        setFormErrors(errors);
        if(Object.keys(errors).length > 0) {
          return
        }
       
        // Only proceed if there are no errors
        if (Object.keys(errors).length === 0) {
          try {
            const response = await postRequest("/signup", formData);
          
            if (response.status >= 200 && response.status < 300) {
              setShouldRedirect(true);
              const toast = await toastController.create({
                message: 'Sign up successful!',
                duration: 2000,
                color: 'success',
              });
              await toast.present();
            } else {
              const errorMessage = response.data.error || "An error occurred during signup.";
              const toast = await toastController.create({
                message: errorMessage,
                duration: 2000,
                color: "danger",
              });
              await toast.present();
            }
          } catch (error: any) {
            const errorMessage = error?.response?.data?.error || "An error occurred.";
            const toast = await toastController.create({
              message: errorMessage,
              duration: 2000,
              color: "danger",
            });
            await toast.present();
          }
        }
      };
    
      useEffect(() => {
        if (shouldRedirect) {
          (async () => {
            const toast = await toastController.create({
              message: 'Sign up successful!',
              duration: 2000,
              color: 'success',
            });
    
            await toast.present(); 
            history.push('/search'); 
          })();
        }
      }, [shouldRedirect, history]); 

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <p>Join thousands of people getting actual answers to their questions</p>

            <IonItem>
                <IonLabel position="floating">First Name</IonLabel>
                <IonInput type="text" name="firstName" value={formData.firstName} onIonChange={handleInputChange} />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Last Name</IonLabel>
                <IonInput type="text" name="lastName" value={formData.lastName} onIonChange={handleInputChange} />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput type="email" name="email" value={formData.email} onIonChange={handleInputChange} />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput 
                type="password" name="password" value={formData.password} onIonChange={handleInputChange} />
            </IonItem>
            {formErrors.password && (
              <div className="error-message">{formErrors.password}</div>
            )}
            <IonItem>
                <IonLabel position="floating">Confirm Password</IonLabel>
                <IonInput type="password" name="confirmPassword" value={formData.confirmPassword} onIonChange={handleInputChange} />
            </IonItem>
            {formErrors.confirmPassword && (
              <div className="error-message">{formErrors.confirmPassword}</div>
            )}

            {/* ... similar IonItems for password and confirm password */}
            
            <input className="ion-hide" type="submit"/>

            <IonButton type="submit" expand="block">
                Sign Up
            </IonButton>

            <p className="ion-text-center">
                Already have an account? <a href="/login">Sign in</a>
            </p>
        </form>
    )
}


export default SignupForm