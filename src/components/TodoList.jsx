export default function TodoLIst({ todos, onSelect }) {
  const dates = {};

  todos.forEach((todo) => {
    if (dates[todo.date]) {
      dates[todo.date] = [...dates[todo.date], todo];
    } else {
      dates[todo.date] = [todo];
    }
  });

  console.log(dates);

  return (
    <>
      {Object.keys(dates).map((date) => {
        return (
          <div className="date" onClick={() => onSelect(date)}>
            <p>{date}</p>
            <p>({dates[date].length})</p>
          </div>
        );
      })}
    </>
  );
}
