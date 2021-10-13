/*
* import React biblioteke iz foldera node_modueles
*/
import React from "react";

/*
* import komponenti iz filesistema iz foldera /componenents
*/
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import ChatRoom from "./components/ChatRoom";

/*
* import GoogleUser iz file firebaseClient
* { GoogleUser } znači da file exporta više varijabli,
* nema default export
*/
import { GoogleUser } from "./firebaseClient";

/*
* import GoogleUser iz file firebaseClient
* { GoogleUser } znači da file exporta više varijabli
*/
import "./App.css";

function App() {
  /*
  * GoogleUser() je funkcija koja u return ima usera koji će biti
  * spremljen u varijablu user
  */
  const user = GoogleUser();

  return (
    <div className="App">
      <header>
        <h1>Mario Chat Algebra💬</h1>
        <SignOut />
      </header>
      {/*
        ternarni operator. Ukoliko user === true, prikazat će
        komponentu ChatRoom, inače kompoenentu SignIn
      */}
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

export default App;
