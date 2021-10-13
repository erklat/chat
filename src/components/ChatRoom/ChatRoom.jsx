import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState, useRef } from "react";
import ChatMessage from "../ChatMessage";
import firebase, { firestore, auth } from "../../firebaseClient";

const ChatRoom = () => {
  // ref inView koji je dodijeljen divu na ln:47, ovako znamo
  // kada je div ušao u viewport skrolanjem, koristi se hook
  // useRef iz biblioteke react
  const inView = useRef(null);
  // korištenje hooka useState, koji je po defaultu postavjen na prazan 
  // string. Svaka promjena varijale formValue uz korištenje funkcije
  // setFormValue uzrokuje rerender komponente.
  const [formValue, setFormValue] = useState("");

  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });

  // funkcija koja skrola poruku u viewport
  const scrollIntoView = () => {
    // provjera jel ref radi kako treba, uvijek će tada imati current
    // u suprotnom da ovo nije u if bloku, mogla bi biti greška koja
    // bi prekinula izvršavanje
    if (inView?.current) {
      inView.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  /*
  * asinkrona funkcija uz korištenje async/await sintakse. Asinkronost u 
  * Javascriptu moguće je postići i kroz Promise, međutim await keyword 
  * blokira thread i daljnje izvršavanje, a Promise ne.
  */
  const sendMessage = async (e) => {
    if (!formValue) {
      // ovo je early return, ako ne postoji formValue, ništa u funkciji
      // sendMessage nemoj izvršiti.
      return;
    }

    // funkcija prima event, submit, ovo se stavlja da enter ne bi napravio
    // form submission što je defaultno ponašanje forme
    e.preventDefault();

    // destrukturiranje uid i photoUrl iz usera
    const { uid, photoURL } = auth?.currentUser;

    // naakon slanja postavi varijablu formValue na prazan string, useState hook
    setFormValue("");
    // skrolaj poruku
    scrollIntoView();

    // ovo tu je od firebasea, dok se ovo ne završi funkcija čeka točno na
    // ovom mjestu. Optimalno bi bilo korištenje try/catch bloka jer se u 
    // izvršavanju može dogoditi greška, server timeout i sl.
    await messagesRef.add({
      text: formValue,
      createdAt: firebase?.firestore?.FieldValue?.serverTimestamp(),
      uid,
      photoURL,
    });
  };

  return (
    // <></> se naziva React.Fragment i tako se prije koristilo, neće biti
    // renderirano u DOM-u, a služi kad više HTML elemenata treb biti na istoj
    // razini u treeviewu u inspektoru.
    <>
      <main>
        {/*
          varijabla messages je Array jer je map metoda iz prototipa Array, 
          ona uzima jedan array i iz njega returna drugi array, u ovom slučaju
          to će biti Array komponenti ChatMessage u koje se poruka pušta kao prop.
          key prop je iznimno važan da se ispravno koristi, u slučaju da se ponove
          dva ista keya React neće znati napraviti reconciliation što će dovesti
          do bugova u radu aplikacije.
        */}
        {messages?.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

         {/*
         * div koji na sebi ima ref za korištenje u funkciji scrollIntoView
         */}
        <div ref={inView} />
      </main>

      {/*
      * onSubmit event forme, ovdje puštamo event koji ćemo preventat
      */}
      <form onSubmit={(e) => sendMessage(e)}>
        {/*
          text input koji za vrijednost ima varijablu formValue (useState hook)
          na promjenu će iskoristiti metodu setFormValue da promijeni state 
          komponente. Ovdje svakim klikom se događa rerenderiranje komponente,
          idealno bi bilo iskoristiti debounce da se broj evenata smanji.
        */}
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
          {/*
          * button za submit forme, nije ga moguće kliknut ako je formValue prazan string
          */}
        <button type="submit" disabled={!formValue}>
          📨
        </button>
      </form>
    </>
  );
};

export default ChatRoom;
