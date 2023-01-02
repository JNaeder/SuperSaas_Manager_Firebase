import "./App.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import RoutingStuff from "./components/RoutingStuff";
import LogInPage from "./pages/LogInPage";

const firebaseConfig = {
  apiKey: "AIzaSyA_vtl1iTjk7KR_5JElhtFX5ycWAWjVpxE",
  authDomain: "sae-supersaas-manager.firebaseapp.com",
  databaseURL: "https://sae-supersaas-manager-default-rtdb.firebaseio.com",
  projectId: "sae-supersaas-manager",
  storageBucket: "sae-supersaas-manager.appspot.com",
  messagingSenderId: "212663505029",
  appId: "1:212663505029:web:3138ac3962e51817fe59ec",
  measurementId: "G-LRYRWPCL53",
};

function App() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  onAuthStateChanged(auth, () => {
    setCurrentUser(auth.currentUser);
  });

  return (
    <div className="App">
      <BrowserRouter>
        {currentUser ? (
          <RoutingStuff app={app} auth={auth} />
        ) : (
          <LogInPage auth={auth} />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
