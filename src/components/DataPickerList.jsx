export default function DataPickerList({ date }) {
  return (
    <div>
      <p>{date.toDateString()}</p>
    </div>
  );
}
