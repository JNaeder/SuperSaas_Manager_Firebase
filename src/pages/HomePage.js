import LogContainer from "../components/LogContainer";

function HomePage({ app }) {
  return (
    <>
      <h1>Logs</h1>
      <LogContainer app={app} />
    </>
  );
}

export default HomePage;
