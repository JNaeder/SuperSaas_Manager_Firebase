import moment from "moment";

function SpotlightStudent({ spotlightStudent }) {
  if (spotlightStudent) {
    const momentTime = moment(spotlightStudent["lastLogin"]);
    const newDate = momentTime.format("MM/DD/YYYY");
    const dateDiff = momentTime.fromNow();
    return (
      <div>
        <h1>{spotlightStudent["fullName"]}</h1>
        <table className="spotlight_table">
          <tbody>
            <tr>
              <td>Email</td>
              <td>{spotlightStudent["email"]}</td>
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
