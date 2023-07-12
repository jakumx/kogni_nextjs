"use client";
import { GoogleOAuthProvider } from '@react-oauth/google'
import Login from './components/Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'


export default function Home() {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOAUTH}>
      <body style={{background: "white"}}>
        <main style={{fontFamily: 'Open Sans'}}>
          <Login />
        </main>
      </body>
    </GoogleOAuthProvider>
  )
}
