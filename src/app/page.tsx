import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import Toolbar from "@mui/material/Toolbar";

export default withPageAuthRequired(async function Home() {
  const session = await getSession();

  return (
    <main
      style={{
        padding: "1em",
      }}
    >
      <Toolbar />
      <h1>Home</h1>
      <pre
        style={{
          color: "white",
          backgroundColor: "black",
        }}
      >
        {JSON.stringify(session?.user, null, 2)}
      </pre>
    </main>
  );
});
