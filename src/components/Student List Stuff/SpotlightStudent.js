import moment from "moment";
import { MdContentCopy } from "react-icons/md";

function SpotlightStudent({ spotlightStudent }) {
  if (spotlightStudent) {
    const momentTime = moment(spotlightStudent["lastLogin"]);
    const newDate = momentTime.format("MM/DD/YYYY");
    const dateDiff = momentTime.fromNow();

    const copyEmailToClipboard = () => {
      navigator.clipboard.writeText(spotlightStudent["email"]);
    };

    return (
      <div>
        <div className="student_name_container">
          <h1 className="student_name">{spotlightStudent["fullName"]}</h1>
        </div>
        <table className="spotlight_table">
          <tbody>
            <tr>
              <td>Email</td>
              <td>
                <div className="email_section">
                  <span>{spotlightStudent["email"]}</span>
                  <button
                    onClick={copyEmailToClipboard}
                    className="copy_button"
                  >
                    <MdContentCopy />
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>Mod</td>
              <td>
                {spotlightStudent["status"] !== "inactive"
                  ? spotlightStudent["mod"]
                  : "n/a"}
              </td>
            </tr>
            <tr>
              <td>Credits</td>
              <td>{spotlightStudent["credits"]}</td>
            </tr>
            <tr>
              <td>GPA</td>
              <td>
                {spotlightStudent["status"] !== "inactive"
                  ? spotlightStudent["gpa"]
                  : "n/a"}
              </td>
            </tr>
            <tr>
              <td>ICR</td>
              <td>
                {spotlightStudent["status"] !== "inactive"
                  ? spotlightStudent["icr"]
                  : "n/a"}
                %
              </td>
            </tr>
            <tr>
              <td>Instructor</td>
              <td>
                {spotlightStudent["status"] !== "inactive"
                  ? spotlightStudent["instructor"]
                  : "n/a"}
              </td>
            </tr>
            <tr>
              <td>Last Login</td>
              <td>
                {newDate} ({dateDiff})
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default SpotlightStudent;
