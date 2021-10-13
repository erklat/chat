import { auth } from "../../firebaseClient";

const SignOut = () => {
    // ukoliko je user logiran prikazat će button za signOut, inače neće prikazati ništa.
    // u jsx kada ne treba biti ništa uvijek vraćamo null
    return !!auth?.currentUser ? <button onClick={() => auth.signOut()}>Sign Out</button> : null
  }

  export default SignOut;