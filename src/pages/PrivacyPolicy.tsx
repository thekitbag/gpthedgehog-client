import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './PrivacyPolicy.css'


const PrivacyPolicy = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="policy-container">
          <h2>Privacy Policy</h2>

          <h3>1. Information We Collect:</h3>
          <p>
            Personal Information: We may collect personal information, such as your name, email address, and other relevant information, when you voluntarily provide it to us through the App.
          </p>
          <p>
            Usage Data: We may collect non-personal information about how you interact with the App. This may include data such as your device type, operating system, browser type, and usage patterns within the App.
          </p>

          <h3>2. How We Use the Information:</h3>
          <p>
            Personal Information: We may use the personal information you provide to us to deliver the services and features you request, respond to your inquiries or feedback, personalize your experience, and improve our App.
          </p>
          <p>
            Usage Data: We may use non-personal information for analytical purposes, to understand how users interact with the App, and to enhance the overall user experience.
          </p>


          <h3>3. Data Security:</h3>
          <p>We prioritize the security of your personal information and employ appropriate measures to protect it from unauthorized access, alteration, disclosure, or destruction.</p>
          <p>However, please note that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security of your data.</p>

          <h3>4. Third-Party Services:</h3>
          <p>The App may include third-party services, such as analytics providers or advertising networks, that may collect information about your usage. These third-party services have their own privacy policies and practices, and we encourage you to review them.</p>

          <h3>5. Children's Privacy:</h3>
          <p>The App is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected personal information from a child, please contact us immediately, and we will take steps to remove the information.</p>

          <h3>6. Changes to this Privacy Policy:</h3>
          <p>We reserve the right to update or modify this Privacy Policy at any time. Any changes will be effective immediately upon posting the revised Privacy Policy in the App. We encourage you to review this Privacy Policy periodically for any updates.</p>

          <h3>7. Contact Us:</h3>
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at mark.gray@hedgehog.fyi.
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PrivacyPolicy;
