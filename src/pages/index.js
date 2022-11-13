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
      <header class="flex flex-wrap items-start justify-around bg-black p-3 text-gray-100">
        <h1 class="text-4xl font-extrabold tracking-tighter text-white sm:text-5xl lg:text-7xl">
          AskDevs
        </h1>
      </header>
      <main class="bg-gradient-to-r from-rose-100 to-teal-100 h-screen">
        <section class="container mx-auto px-5 pt-10">
          <h1 class="my-4 text-5xl font-bold leading-tight">
            Got a technical question?
          </h1>
          <p class="mb-8 text-3xl leading-normal">
            Ask our tech twitter volunteers!
          </p>
        </section>
      </main>
    </div>
  );
}
