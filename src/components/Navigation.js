import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navigation() {
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState(window.location.href);

  const changeRoute = (newRoute) => {
    navigate(newRoute);
    setCurrentLocation(newRoute);
  };

  useEffect(() => {
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
    <nav className="navigation" id="nav">
      <button className="nav_button" onClick={() => changeRoute("/")} id="/">
        Home
      </button>
      <button
        className="nav_button"
        onClick={() => changeRoute("/teacherbooking")}
        id="/teacherbooking"
      >
        Teacher Booking
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
    </nav>
  );
}

export default Navigation;
