import {
  processSuperSaasStudents,
  getGoogleSheetInfo,
  processAllBookings,
  removeOldStudents,
  removeOldSupersaasAccounts,
  getTodayBookings,
} from "../myScripts/appFunctions";

function Testing() {
  return (
    <>
      <h1>Testing Links</h1>
      <div className="button_container">
        <button onClick={getGoogleSheetInfo}>Update Academic Student</button>
        <button onClick={removeOldStudents}>
          Remove Old Academic Students
        </button>
        <button onClick={removeOldSupersaasAccounts}>
          Remove Old SuperSaas Accounts
        </button>
        <button onClick={processSuperSaasStudents}>Update All Users</button>
        <button onClick={processAllBookings}>Update All Bookings</button>
        <button onClick={getTodayBookings}>Get Today Bookings</button>
      </div>
    </>
  );
}

export default Testing;
