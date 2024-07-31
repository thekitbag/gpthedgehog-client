import React from "react"
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react"
import Header from "../components/Header"

class RouteNotFoundMessage extends React.Component {
    render() {
        return <IonPage>
                <IonContent fullscreen>
                    <Header />
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <h1>Oops</h1>
                                <h3>It doesn't look like this page exists</h3>
                                <a href="/" className="button button-outline button-positive">Go Back</a>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
    }
}

export default RouteNotFoundMessage