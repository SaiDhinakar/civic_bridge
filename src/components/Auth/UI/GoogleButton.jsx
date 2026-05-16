import { GoogleLogin } from '@react-oauth/google';

export default function GoogleButton({ label = "Continue with Google", onClick }) {
  // We use the new standard Google Identity Services button
  // onClick becomes the onSuccess handler for GoogleLogin
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: 20 }}>
      <GoogleLogin 
        onSuccess={onClick} 
        onError={() => console.error('Google Login Failed')}
        text={label === "Continue with Google" ? "continue_with" : "signup_with"}
        theme="outline"
        size="large"
        width="340px"
      />
    </div>
  );
}
