import {
  processSuperSaasStudents,
  getGoogleSheetInfo,
  processAllBookings,
  removeOldStudents,
  removeOldSupersaasAccounts,
  getTodayBookings,
  banStudents,
} from "../myScripts/appFunctions";

function Testing({ auth }) {
  return (
    <>
      <h1>Testing Links</h1>
      <div className="button_container">
        <button onClick={getGoogleSheetInfo}>Update Academic Student</button>
        <button onClick={banStudents}>Ban Students</button>
        <button onClick={removeOldStudents}>
          Remove Old Academic Students
        </button>
        <button onClick={removeOldSupersaasAccounts}>
          Remove Old SuperSaas Accounts
        </button>
        <button onClick={processSuperSaasStudents}>
          Processs SuperSaas Users
        </button>
        <button onClick={processAllBookings}>Update All Bookings</button>
        <button onClick={getTodayBookings}>Get Today Bookings</button>
      </div>
    </>
  );
}

export default Testing;
