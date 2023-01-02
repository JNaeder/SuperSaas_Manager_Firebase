import {
  processSuperSaasStudents,
  getGoogleSheetInfo,
  processAllBookings,
  removeOldStudents,
  removeOldSupersaasAccounts,
  getTodayBookings,
} from "../myScripts/appFunctions";
import { updateProfile } from "firebase/auth";
import { useState } from "react";

function Testing({ auth }) {
  const [theDisplayName, setTheDisplayName] = useState("");

  const setDisplayName = async (e) => {
    e.preventDefault();
    await updateProfile(auth.currentUser, {
      displayName: theDisplayName,
    });
    console.log(`Changed display name to ${theDisplayName}`);
  };
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

      <form>
        <label htmlFor="displayName">Display Name</label>
        <input
          type="text"
          name="display_name"
          onChange={(e) => setTheDisplayName(e.target.value)}
        />

        <button type="submit" onClick={setDisplayName}>
          Set Info
        </button>
      </form>
    </>
  );
}

export default Testing;
