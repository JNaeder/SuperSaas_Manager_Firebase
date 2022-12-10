import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

function Navigation() {
  const currentLocation = useLocation().pathname;

  useEffect(() => {
    const allLinks = document.getElementById("nav").children;
    console.log(allLinks);
    for (let i = 0; i < allLinks.length; i++) {
      console.log(allLinks[i].href);
    }
  });

  return (
    <nav className="navigation" id="nav">
      <Link to="/" className="nav_button selected">
        Home Page
      </Link>
      <Link to="/studentlist" className="nav_button">
        Student List
      </Link>
      <Link to="/teacherbooking" className="nav_button">
        Teacher Booking
      </Link>
      <Link to="/todaybookings" className="nav_button">
        Today Bookings
      </Link>
    </nav>
  );
}

export default Navigation;
