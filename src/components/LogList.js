import LogItem from "./LogItem";

function LogList({ logItems }) {
  return (
    <>
      {logItems.map((item, i) => {
        return <LogItem item={item} key={i} />;
      })}
    </>
  );
}

export default LogList;
