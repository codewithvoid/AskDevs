import { TwitterShareButton } from "react-share";
import { useState, useEffect } from 'react';
import darkLogo from '../assets/logo/dark.png'; // askdev dark logo

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
    console.log("Error occurred while fetching data from server", e);
  }

  return {
    props: { users, categories },
  };
}

export default function Home({ users, categories }) {
  const [categoryUsers, setCategoryUsers] = useState(users);
  const [selectedCategory, setSelectedCategory] = useState('');

  // onSelected category button clicked
  function onCategoryButtonClick(e) {
    const { dataset: { slug } } = e.target;
    setSelectedCategory(slug);
    setCategoryUsers(users.filter(u => u.categories.flatMap(c => c.slug).indexOf(slug) >= 0));
  }

  // volunteers profile
  function getProfileCard(user) {
    return (
      <div className="w-full p-4 md:w-1/2 lg:w-1/4" key={user.username}>
        <div className="bg-white flex flex-col items-center justify-center p-4 shadow rounded-md">
          <img
            src={user.image}
            alt="profile"
            className="mx-auto rounded-full w-24 border-2"
            style={{ "border-color": "#DAB264" }}
          />
          <p className="font-bold text-2xl tracking-wide mt-2" style={{ "color": "#020D1E" }}>
            {user.name}
          </p>
          <p className="text-gray-400 font-semibold">{user.bio}</p>
          <div className="w-full mt-8">
            {/* twitter to volunteer */}
            <TwitterShareButton
              title={`@${user.contacts.twitter} <add your question here>`}
              url={"https://ask-devs.vercel.app/"}
              hashtags={["AskDevs"]}
              style={{ "background-color": "#DAB264", "color": "#020D1E" }}
              className="py-2 px-4 w-full font-semibold rounded shadow-lg"
              resetButtonStyle={false}
            >
              Tweet
            </TwitterShareButton>
          </div>
        </div>
      </div>
    );
  }

  // adding bg gradient
  useEffect(() => {
    document.querySelector("body").classList.add("bg-gradient-to-r");
    document.querySelector("body").classList.add("from-rose-100");
    document.querySelector("body").classList.add("to-teal-100");
    document.querySelector("body").classList.add("bg-fixed");
  });

  // returning SPA
  return (
    <div>
      {/* navbar */}
      <header className="flex flex-wrap items-start" style={{ "background-color": "#020D1E", "position": "sticky", "top": 0 }}>
        <a href="/">
          <img src={darkLogo.src} className="pl-3" width="80" alt="dark logo" />
        </a>
      </header>

      <main >
        <section className="container mx-auto px-5 pt-10">
          {/* title */}
          <div style={{ "color": "#020D1E", }}>
            <h1 className="my-4 text-5xl font-bold">
              Got a technical question?
            </h1>
            <p className="mb-8 text-3xl leading-normal">
              Ask our tech twitter volunteers!
            </p>
          </div>
          {/* cagetories */}
          <div className="flex flex-wrap space-x-5">
            {categories.map((c) => {
              if (c.slug === selectedCategory) {
                return (
                  <button className="m-1 rounded border-2 border-solid border-black px-5 py-1 text-center font-bold bg-black text-white">
                    {c.name}
                  </button>
                )
              } else {
                return (
                  <button className="m-1 rounded border-2 border-solid border-black px-5 py-1 text-center font-bold text-black hover:bg-black hover:text-white" data-slug={`${c.slug}`} onClick={onCategoryButtonClick}>
                    {c.name}
                  </button>
                )
              }
            })}
          </div>
        </section>

        {/* volunteers profiles list */}
        <section className="container mx-auto body-font h-screen min-h-screen text-gray-600 px-2 mt-10">
          <div className="flex flex-wrap">{categoryUsers.map(getProfileCard)}</div>
        </section>
      </main>
    </div>
  );
}
