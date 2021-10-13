import { auth } from "../../firebaseClient";

/*
* komponenta kao prop prima message, tip je Object
*/
const ChatMessage = ({ message }) => {
  // destrukuriranje varijabli text, uid, photoURL, po ovome znamo da je 
  // objekt, poželjno koristiti paket prop-types koji će raditi ovu 
  // provjeru
  const { text, uid, photoURL } = message;
  // destrukturiranje objekta auth, varijabla user je preimenovana u currentUser
  const { currentUser: user } = auth;

  // ukoliko je uid poruke jednak uid usera, onda je poruka "sent" od logiranog
  // usera, inače je poruka "received"
  const messageClass = uid === user.uid ? "sent" : "received";

  return (
    // ovdje se koristi messageClass kao klasa koju će primijeniti, nalazi se u App.css
    // ovo u className je template literal.
    <div className={`message ${messageClass}`}>
      <div className="message__user">
        <img src={photoURL} alt="Avatar" />
      </div>
      <p style={{ textAlign: "left" }}>
        {/*
          ?. je optional chaining, ES2020 funkcionalnost da se izbjegne
          currentUser && currentUser.displayName.
          Ako bude tip undefined, prikazat će se Unkown User
        */}
        <span>{user?.displayName || 'Unknown User'}</span>
        <br />
        {text}
      </p>
    </div>
  );
};

export default ChatMessage;
