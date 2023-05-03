import { IonCol, IonContent, IonGrid, IonHeader, IonItem, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import Header from '../components/header'
import Search from '../components/search';
import './Home.css';

const Home = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <Header />
        <IonGrid>
          <IonRow>
            <IonCol>
              <Search />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
