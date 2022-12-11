import {
  processSuperSaasStudents,
  getGoogleSheetInfo,
  processAllBookings,
} from "../myScripts/appFunctions";

function Testing() {
  return (
    <>
      <h1>Testing Links</h1>
      <div className="button_container">
        <button onClick={getGoogleSheetInfo}>Update Academic Student</button>
        <button onClick={processSuperSaasStudents}>Update All Users</button>
        <button onClick={processAllBookings}>Update All Bookings</button>
      </div>
    </>
  );
}

export default Testing;
