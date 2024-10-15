import React from 'react';
import { IonGrid, IonRow, IonCol, IonText, IonCardContent, IonCard, IonButton } from '@ionic/react';
import { loadStripe } from '@stripe/stripe-js';
import stripePublishableKey from "../utils/stripeKey"
import { postRequest } from "../utils/api";


interface upgradeBannerProps {
    subscriptionType: string;
    remainingSearches: number;
    userId: number;
}

const UpgradeBanner: React.FC<upgradeBannerProps> = (props) => {
    console.log(stripePublishableKey)
    const stripePromise = loadStripe(stripePublishableKey)

    const handleUpgradeClick = async () => {
        const stripe = await stripePromise;

        const data = {
            userId: props.userId  
            }
        
        const response = await postRequest('/create-checkout-session', data);

        const session = response.data

        // Redirect to Stripe Checkout
        const result = await stripe?.redirectToCheckout({
            sessionId: session.id
        });

        if (result?.error) {
            // Handle errors (e.g., display an error message to the user)
            console.error(result.error.message);
        }
    };
    return (
        <IonRow>
            <IonCol size="12">
            {props.subscriptionType == 'free' &&
            <IonCard color="light">
                <IonCardContent>
                <IonGrid>
                    <IonRow>
                    <IonCol size="12">
                        <IonText color="dark">
                        You have {props.remainingSearches} free searches remaining this month.
                        Upgrade to Hedgehog Premium to get unlimited searches.
                        </IonText>
                    </IonCol>
                    </IonRow>
                    <IonRow>
                    <IonCol>
                        <IonButton color="success" onClick={handleUpgradeClick}>Upgrade</IonButton>
                    </IonCol>
                    </IonRow>
                </IonGrid>  
                </IonCardContent>
            </IonCard>
            }
            </IonCol>
        </IonRow>
    )
}

export default UpgradeBanner