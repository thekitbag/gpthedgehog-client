import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonButtons,
  IonHeader,
  IonItem,
  IonText,
  IonToolbar,
} from "@ionic/react";
import "./header.css";
import { Link, useLocation, useHistory } from "react-router-dom";
import { postRequest } from "../utils/api";
import getUserInfo from "../utils/auth";

const Header: React.FC = () => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false); 
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    let isMounted = true; // Flag to track component mounted state
  
    (async () => {
      const userInfo = await getUserInfo();
      console.log(userInfo)
      if (isMounted) { // Update state only if component is still mounted

        if (userInfo.authenticated === true) {
          setLoggedIn(userInfo.authenticated);
        }
        
      }
    })();
  
    return () => {
      isMounted = false; // Set flag to false on unmount
    };
  }, [location]);
  
    const handleLogout = async () => {
        try {
          const response = await postRequest("/logout", {});
          if (response.status === 200) {
            localStorage.removeItem("accessToken");
            setLoggedIn(false);
            history.push("/");
            return true;
          } else {
            throw new Error("Logout failed.");
          }
        } catch (error) {
          throw error;
        }
      };

  return (
      <IonHeader>
        <IonToolbar>
            <Link to={isLoggedIn ? "/search" : "/"} className="btn btn-primary">
                        <div className="logo-container"></div>
            </Link>
            <IonButtons slot="end">
            {!isLoggedIn ? (
                            <>
                            <IonButton fill="solid" color="primary" routerLink="/signup">Sign Up</IonButton>
                            <IonButton fill="solid" color="primary" routerLink="/login">Login</IonButton>
                            </>
                        ) : (
                            <IonButton fill="solid" color="primary" onClick={handleLogout}>Logout</IonButton>
                        )}
            </IonButtons> 
        </IonToolbar>
      </IonHeader>
  );
};

export default Header;

