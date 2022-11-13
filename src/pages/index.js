export async function getServerSideProps(context) {
  const { req } = context;
  let users = {};
  try {
    const res = await fetch(`http://${req.headers.host}/api/users`);
    users = await res.json();
  } catch (e) {
    console.log("Error occurred while fetching users", e);
  }

  return {
    props: { users },
  };
}

export default function Home({ users }) {
  return (
    <div>
      <h1 className="font-medium leading-tight text-5xl mt-0 mb-">Ask Devs</h1>
      <code>{JSON.stringify({ res: users })}</code>
    </div>
  );
}
