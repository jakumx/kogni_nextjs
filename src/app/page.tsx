"use client";
import { GoogleOAuthProvider } from '@react-oauth/google'
import Login from './components/Login'
import Head from "next/head";
import Script from "next/script";
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Home() {

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOAUTH || ''}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
        crossOrigin="anonymous"
      />
      <body style={{background: "white"}}>
        <main>
          <Login />
        </main>
      </body>
    </GoogleOAuthProvider>
  )
}
