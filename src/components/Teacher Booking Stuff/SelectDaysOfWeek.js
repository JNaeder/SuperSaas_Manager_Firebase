function SelectDaysOfWeek({ daysOfWeek, setDaysOfWeek }) {
  const onChange = (e) => {
    const newValue = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      if (!daysOfWeek) {
        daysOfWeek = [];
      }
      const listOfDays = [...daysOfWeek];
      listOfDays.push(newValue);
      setDaysOfWeek(listOfDays);
    } else {
      const listOfDays = daysOfWeek.filter((x) => x !== newValue);
      setDaysOfWeek(listOfDays);
    }
  };

  return (
    <div className="day_selection">
      <form>
        <label htmlFor="monday">Monday</label>
        <input
          type="checkbox"
          name="monday"
          value="Monday"
          onChange={(e) => onChange(e)}
        />
        <label htmlFor="tuesday">Tuesday</label>
        <input
          type="checkbox"
          name="tuesday"
          value="Tuesday"
          onChange={(e) => onChange(e)}
        />
        <label htmlFor="wednesday">Wednesday</label>
        <input
          type="checkbox"
          name="wednesday"
          value="Wednesday"
          onChange={(e) => onChange(e)}
        />
        <label htmlFor="thursday">Thursday</label>
        <input
          type="checkbox"
          name="thursday"
          value="Thursday"
          onChange={(e) => onChange(e)}
        />
        <label htmlFor="friday">Friday</label>
        <input
          type="checkbox"
          name="friday"
          value="Friday"
          onChange={(e) => onChange(e)}
        />
      </form>
    </div>
  );
}

export default SelectDaysOfWeek;
