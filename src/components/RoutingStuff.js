import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import StudentListPage from "../pages/StudentListPage";
import TeacherBookingPage from "../pages/TeacherBookingPage";
import TodayBookings from "../pages/TodayBookings";
import Testing from "../pages/Testing";
import LogsPage from "../pages/LogsPage";
import Navigation from "./Navigation";
import LogInPage from "../pages/LogInPage";

function RoutingStuff({ app, auth }) {
  return (
    <>
      <Navigation auth={auth} />
      <Routes>
        <Route path="/" element={<HomePage app={app} auth={auth} />} />
        <Route path="/logs" element={<LogsPage app={app} />} />
        <Route path="/studentlist" element={<StudentListPage app={app} />} />
        <Route
          path="/teacherbooking"
          element={<TeacherBookingPage app={app} />}
        />
        <Route path="/todaybookings" element={<TodayBookings app={app} />} />
        <Route path="/testing" element={<Testing auth={auth} />} />
        <Route path="/login" element={<LogInPage />} />
      </Routes>
    </>
  );
}

export default RoutingStuff;
