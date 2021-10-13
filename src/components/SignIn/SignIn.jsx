// import funkcije koja koristi stvari iz firebasea
import {signInWithGoogle} from "../../firebaseClient";

const SignIn = () => {
  return (
    // <></> se naziva React.Fragment i tako se prije koristilo, neće biti
    // renderirano u DOM-u, a služi kad više HTML elemenata treb biti na istoj
    // razini u treeviewu u inspektoru.
    <>
      {/*
      * na klik buttona se poziva signInWithGoogle()
      */}
      <button className="sign-in" onClick={() => signInWithGoogle()}>Sign in with Google</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )
}

export default SignIn;