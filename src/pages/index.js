import { TwitterShareButton } from "react-share";

export async function getServerSideProps(context) {
  const { req } = context;
  let users, categories;
  try {
    const usersResponse = await fetch(`http://${req.headers.host}/api/users`);
    users = await usersResponse.json();
    const categoriesResponse = await fetch(
      `http://${req.headers.host}/categories.json`
    );
    categories = await categoriesResponse.json();
  } catch (e) {
    console.log("Error occurred while fetching users", e);
  }

  return {
    props: { users, categories },
  };
}

export default function Home({ users, categories }) {
  return (
    <div>
      <header class="flex flex-wrap items-start justify-around bg-black p-3 text-gray-100">
        <h1 class="text-4xl font-extrabold tracking-tighter text-white sm:text-5xl lg:text-7xl">
          AskDevs
        </h1>
      </header>

      <main class="bg-gradient-to-r from-rose-100 to-teal-100">
        <section class="container mx-auto px-5 pt-10">
          <h1 class="my-4 text-5xl font-bold leading-tight">
            Got a technical question?
          </h1>
          <p class="mb-8 text-3xl leading-normal">
            Ask our tech twitter volunteers!
          </p>
          <div class="flex flex-wrap space-x-2">
            {categories.map((category) => (
              <button class="mt-1 rounded-full border-2 border-solid border-black px-5 py-1 text-center font-bold text-black hover:bg-black hover:text-white">
                {category.name}
              </button>
            ))}
          </div>
        </section>

        <section class="container  mx-auto body-font h-screen min-h-screen text-gray-600 px-5 py-10">
          <div class="-m-4 flex flex-wrap">
            <div class="w-full p-4 md:w-1/2 lg:w-1/4">
              <div class="bg-white font-semibold text-center rounded-3xl border shadow-lg p-10 max-w-xs">
                <img
                  class="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto"
                  src="https://avatars.githubusercontent.com/u/104728441?v=4"
                  alt="product designer"
                />
                <h1 class="text-lg text-gray-700"> Void⚡</h1>
                <h3 class="text-sm text-gray-400 "> Programming </h3>
                <p class="text-xs text-gray-400 mt-4">
                  Senior SWE | Bootcamp Mentor | Follow for tweets 🐦 threads
                  🧵spaces🎙️ that will help you become top 1% developer
                </p>
                <TwitterShareButton
                  title={"@codewithvoid <add your question here>"}
                  url={"https://ask-devs.vercel.app/"}
                  hashtags={["AskDevs", "programming"]}
                >
                  <div class="bg-indigo-600 px-8 py-2 mt-8 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide">
                    Tweet
                  </div>
                </TwitterShareButton>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
