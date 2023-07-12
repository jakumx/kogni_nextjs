import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import constants from "../constants";

export default function Login() {
  const [windowHeight, setWindowHeight] = useState(500);
  const [initLoading, setInitLogin] = useState(false);
  const [trainer, setTrainer] = useState();

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    setInitLogin(true);
    const storageTrainer = localStorage.getItem('trainer');
    if (storageTrainer) {
      setTrainer(JSON.parse(storageTrainer || '{}'));
    }
  }, [])

  const handleSuccess = async (responseCredentials: CredentialResponse) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch(`${constants.apiUrl}/login`, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        credential: responseCredentials.credential
      })
    })
    const trainerJSON = await response.json();
    localStorage.setItem('trainer', JSON.stringify(trainerJSON));
    setTrainer(trainerJSON);

  }

  const handleError = () => {
    console.log('Login Error');
  }

  return (
    <>
      {!initLoading ? 
        (<></>) : 
        (<>
          {trainer ? (<div><Dashboard windowHeight={windowHeight} /></div>) : (
            <div className="d-flex align-items-center justify-content-center" style={{ minHeight:`${windowHeight}px` }}>
              <div className="p-2 m-2">
                <Image src="/professor_oak.png" alt="professor_oak" width="209" height="383"/>
              </div>
              <div className="p-2 m-2">
                <p>
                  Hi I am Oak
                </p>
                <p>
                  First of all, What is your name?
                </p>
                <div>
                  <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleError}
                  />
                </div>
              </div>
            </div>
          )}

        </>)
      }
    </>
  )
}