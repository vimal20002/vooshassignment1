import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleSignInButton = ({ onSuccess, onFailure }) => {
    console.log(process.env.REACT_APP_CLIENT_ID)
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <GoogleLogin
        onSuccess={onSuccess}
        onFailure={onFailure}
        buttonText="Continue with Google"
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleSignInButton;
