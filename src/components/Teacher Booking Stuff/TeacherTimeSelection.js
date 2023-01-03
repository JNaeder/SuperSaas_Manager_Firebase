function TeacherTimeSelection({ setStartTime, setEndTime }) {
  const startTimes = [
    ["10 AM", 10],
    ["12 PM", 12],
    ["2 PM", 14],
    ["4 PM", 16],
    ["6 PM", 18],
    ["8 PM", 20],
  ];
  const endTimes = [
    ["12 PM", 12],
    ["2 PM", 14],
    ["4 PM", 16],
    ["6 PM", 18],
    ["8 PM", 20],
    ["10 PM", 22],
  ];

  const onChangeStart = (newValue) => {
    setStartTime(newValue);
  };

  const onChangeEnd = (newValue) => {
    setEndTime(newValue);
  };

  return (
    <div className="time_selection_container">
      <div className="label_select">
        <label htmlFor="start_time">Start Time</label>
        <select
          name="start_time"
          onChange={(e) => onChangeStart(e.target.value)}
          defaultValue={"-"}
        >
          <option disabled>-</option>
          {startTimes.map((time, i) => (
            <option key={i} value={time[1]}>
              {time[0]}
            </option>
          ))}
        </select>
      </div>
      <div className="label_select">
        <label htmlFor="end_time">End Time</label>
        <select
          name="end_time"
          onChange={(e) => onChangeEnd(e.target.value)}
          defaultValue={"-"}
        >
          <option disabled>-</option>
          {endTimes.map((time, i) => (
            <option key={i} value={time[1]}>
              {time[0]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default TeacherTimeSelection;
