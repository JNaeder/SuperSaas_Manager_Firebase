import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useState } from "react";

function HomePage({ app }) {
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  onAuthStateChanged(auth, (currentUser) => {
    console.log(currentUser.email);
  });

  const login = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={login}>
          Login
        </button>
      </form>
    </>
  );
}

export default HomePage;
