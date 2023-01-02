function HomePage({ auth }) {
  const displayName = auth.currentUser.displayName;

  return (
    <>
      <h1>Home Page</h1>
      <h2>{`Hello ${displayName}! Welcome`}</h2>
    </>
  );
}

export default HomePage;
