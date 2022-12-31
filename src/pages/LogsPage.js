import LogContainer from "../components/LogContainer";

function LogsPage({ app }) {
  return (
    <>
      <h1>Logs</h1>
      <LogContainer app={app} />
    </>
  );
}

export default LogsPage;
