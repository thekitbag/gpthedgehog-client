import { InputChangeEventDetail, IonButton, IonInput, IonItem, IonLabel, IonSpinner, IonText, useIonRouter } from "@ionic/react";
import { useEffect, useState } from "react";
import { postRequest } from "../utils/api";
import { useHistory } from 'react-router-dom';
import { passwordValidator } from "../utils/validators";


const SignupForm: React.FC = () => {

  const history = useHistory();

  const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    
  const [isLoading, setIsLoading] = useState(false);
    
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const [formErrors, setFormErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event: CustomEvent<InputChangeEventDetail>) => {
    const element = event.target as HTMLIonInputElement;
    const { name, value } = element;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const errors = passwordValidator(formData.password, formData.confirmPassword);
    const updatedFormErrors = {
      password: errors.password || "",
      confirmPassword: errors.confirmPassword || "",
    };
  
    setFormErrors(updatedFormErrors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true); 
      try {
        const response = await postRequest("/signup", formData);
  
        if (response.status >= 200 && response.status < 300) {
          setShouldRedirect(true);
        } else {
          const errorMessage =
            response.data.error || "An error occurred during signup.";
          alert(errorMessage);
        }
      } catch (error: any) {
        const errorMessage = error?.response?.data?.error || "An error occurred.";
        alert(errorMessage);
      } finally {
        setIsLoading(false); 
      }
    }
  };
    
  useEffect(() => {
    if (shouldRedirect) {
      (async () => {
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
              <IonText className="error-message" color="danger">{formErrors.password}</IonText>
            )}
            <IonItem>
                <IonLabel position="floating">Confirm Password</IonLabel>
                <IonInput type="password" name="confirmPassword" value={formData.confirmPassword} onIonChange={handleInputChange} />
            </IonItem>
            {formErrors.confirmPassword && (
              <IonText className="error-message" color="danger">{formErrors.confirmPassword}</IonText>
            )}
            
            <input className="ion-hide" type="submit"/>

            

            <IonButton type="submit" expand="block" disabled={isLoading}> 
              {isLoading ? ( 
                <IonSpinner name="crescent" /> 
              ) : (
                "Sign Up"
              )}
            </IonButton>


            <p className="ion-text-center">
                Already have an account? <a href="/login">Sign in</a>
            </p>
        </form>
    )
}


export default SignupForm