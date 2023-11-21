import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavbarHome from './NavbarHome';
import Footer from './FooterItem';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <>
    <NavbarHome></NavbarHome>
    <Container className="mt-5 mb-5">
      <Row>
        <Col>
          <h2>Effective Date: [18 October 2023]</h2>
          <p>
          These Terms and Conditions ("Terms") govern your use of the KCCB mobile application ("App"), as well as any services, features, content, and functionality offered through the App. By using the App, you agree to comply with and be bound by these Terms. If you do not agree with any part of these Terms, please refrain from using the App.          
          </p>

          <h3>1. Account Registration and Eligibility</h3>
          <p>1.1. KCCB Membership: To create an account on the KCCB App, you must be a registered member of the Korean Chamber of Commerce and Industry (KCCB). By creating an account, you confirm that you are a valid and active member of KCC.</p>
          <p>1.2. Kakao Talk Account: The KCCB App requires users to sign up using their Kakao Talk account. By doing so, you acknowledge that you are the owner of a valid Kakao Talk account and agree to the use of this account for app registration and communication.</p>

          <h3>2. Booking and Cancellation</h3>
          <p>
          2.1. Booking Billiard Tables or Meeting Rooms: The KCCB App allows registered users to book billiard tables or meeting rooms for their use. Booking is subject to availability and is on a first-come, first-served basis.
          </p>
          <p>
          2.2. Cancellation: Users have the flexibility to cancel their booking at any time prior to the scheduled time slot. However, we encourage users to do so in a timely manner to allow others to make reservations.
          </p>

          <h3>3. Acceptable Use</h3>
          <p>
          3.1. Responsible Usage: Users are expected to use the KCCB App responsibly, respecting the rights and interests of other members and the facility itself. Abusive or disruptive behavior is strictly prohibited.
          </p>
          <p>
          3.2. Privacy and Data Security: Users are responsible for safeguarding their account information and adhering to our Privacy Policy. Any misuse of personal data or breaches of privacy are taken seriously.
          </p>

          <h3>4. Modifications and Termination</h3>
          <p>
          4.1. Modifications: The KCCB App reserves the right to modify, suspend, or discontinue any part of the App or its services at any time, with or without notice.
          </p>
          <p>
          4.2. Termination: The KCCB App may terminate or suspend user accounts that violate these Terms or engage in any inappropriate conduct, at its discretion.
          </p>

          <h3>5. Disclaimers and Limitations</h3>
          <p>
          5.1. Accuracy and Availability: The KCCB App makes every effort to ensure the accuracy and availability of the App and its services. However, it does not guarantee that the App will be error-free, uninterrupted, or that all features will always be available.
          </p>
          <p>
          5.2. Liability: To the fullest extent permitted by law, the KCCB App is not liable for any direct, indirect, incidental, special, or consequential damages that result from your use of the KCCB App.
          </p>


          <h3>6. Contact Information</h3>
          <p>
          If you have any questions or concerns about these Terms or the KCCB App, please feel free to contact our app's support team. You can reach us at the following email address:

          <b>acotelimited@gmail.com</b>
          </p>
          
          <h3>7. Changes to the Terms</h3>
          <p>
          The KCCB App reserves the right to update and amend these Terms at its discretion. It will notify users of any material changes to the Terms via the App or other communication channels.
          </p>
          <p>
          By using the KCCB App, you affirm that you have read, understood, and agreed to abide by these Terms and Conditions.          
          </p>

          <h3>8. Account Deletion</h3>
          <p>
          At KCCB, we respect your right to manage your account as you see fit. If you wish to delete your account and have all your associated data removed, please follow the steps below:
          </p>

          <p>
          8.1. Account Deletion Request:

          If you decide to delete your KCCB App account, you can initiate the process by sending a formal account deletion request to our support team. You can simply submit the Delete Request data from <Link to="/send-delete-request">DELETE REQUEST</Link>
          </p>

          <p>
          8.2. Confirmation:
          Upon receiving your account deletion request, our support team will verify your identity to ensure the request is legitimate. This may include confirming your registered email address and other relevant information.
          </p>
          
          <p>
          8.3. Data Removal:

            Once your identity is confirmed, we will proceed with the removal of all data associated with your account. This includes but is not limited to:

            i. Your booking history
            ii. Login information
            iii. Notification data
          </p>

          <p>8.4. 24-Hour Deletion:

After the account deletion request within the 24-hour period, your account and all associated data will be permanently and irreversibly deleted from our systems. You will no longer have access to your account, and any future use of the KCCB App will require creating a new account from scratch.</p>

          <h3>9. Data Protection and Privacy</h3>
          <p>
          At KCCB, we take your data privacy and protection seriously. We are committed to safeguarding your personal information and ensuring that it is not shared or used inappropriately. Here's how we handle your data:
          </p>

          <p><strong>9.1. Data Encryption:</strong></p>
    <p>
        We use state-of-the-art encryption technology to secure your data. This means that any data you transmit
        through the KCCB App, such as login credentials or personal information, is encrypted to protect it from
        unauthorized access. We constantly update our encryption protocols to ensure the highest level of security.
    </p>

    <p><strong>9.2. No Unauthorized Sharing:</strong></p>
    <p>
        We do not share your personal data with third parties without your explicit consent. Your data is only used
        for the purpose of providing you with the services offered by the KCCB App, such as booking facilities and
        sending notifications related to your account and bookings.
    </p>

    <p><strong>9.3. Data Access Controls:</strong></p>
    <p>
        Access to your personal data is strictly controlled and limited to authorized personnel who require access to
        provide you with services or support. We maintain strict internal policies and practices to prevent
        unauthorized access or data breaches.
    </p>

    <p><strong>9.4. Data Retention:</strong></p>
    <p>
        We retain your data only for as long as it is necessary to provide you with our services, with the exception
        of booking and notification data. Your historical booking details and notifications will be automatically and
        permanently deleted every 30 days. This ensures the integrity of our systems and respects your right to data
        privacy.
    </p>

    <p><strong>9.5. Consent for Data Usage:</strong></p>
    <p>
        By using the KCCB App, you consent to the collection and use of your data in accordance with our Privacy
        Policy. We are transparent about what data we collect and how it is used, and you have the right to manage your
        data preferences through the app's settings.
    </p>

    <p>
        By using the KCCB App, you affirm that you have read, understood, and agreed to the data protection and
        privacy practices, including the automatic 30-day data deletion process, outlined in these Terms and
        Conditions.
    </p>


        </Col>
      </Row>
    </Container>
    <Footer></Footer>
    </>
  );
};

export default PrivacyPolicy;
