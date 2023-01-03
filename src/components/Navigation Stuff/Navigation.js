import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import "./Navigation_Style.css";
import saeLogo from "../../imgs/new_logo_white.png";

function Navigation({ auth }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState(location.pathname);
  const [userName, setUserName] = useState("");

  const changeRoute = (newRoute) => {
    navigate(newRoute);
    setCurrentLocation(newRoute);
  };

  const signOutUser = () => {
    signOut(auth);
    navigate("/login");
  };

  useEffect(() => {
    setUserName(auth.currentUser.displayName);

    const allLinks = document.getElementById("nav").children;
    for (let i = 0; i < allLinks.length; i++) {
      const theLink = allLinks[i].id;
      allLinks[i].classList.remove("selected");
      if (theLink === currentLocation) {
        allLinks[i].classList.add("selected");
      }
    }
  });
  return (
    <nav className="navigation">
      <div className="main_nav" id="nav">
        <button className="nav_button" onClick={() => changeRoute("/")} id="/">
          Home
        </button>
        <button
          className="nav_button"
          onClick={() => changeRoute("/logs")}
          id="/logs"
        >
          Logs
        </button>
        <button
          className="nav_button"
          onClick={() => changeRoute("/studentlist")}
          id="/studentlist"
        >
          Student List
        </button>
        <button
          className="nav_button"
          onClick={() => changeRoute("/todaybookings")}
          id="/todaybookings"
        >
          Today Bookings
        </button>
        <button
          className="nav_button"
          onClick={() => changeRoute("/teacherbooking")}
          id="/teacherbooking"
        >
          Teacher Booking
        </button>
        <button
          className="nav_button hide"
          onClick={() => changeRoute("/testing")}
          id="/testing"
        >
          Testing Links
        </button>
      </div>
      <img src={saeLogo} className="sae_logo" />
      <div className="user_info">
        <p className="user_name">{userName}</p>
        <button className="signout_button" onClick={signOutUser}>
          Sign Out
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
