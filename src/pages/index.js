import Head from 'next/head';
import { TwitterShareButton } from 'react-share';
import { useState } from 'react';
import { shuffle } from 'fast-shuffle';
import dynamic from 'next/dynamic';

const HeaderLogo = dynamic(() => import('../components/HeaderLogo'), { ssr: false });
export async function getServerSideProps(context) {
  const { req } = context;
  let users, categories;
  try {
    const usersResponse = await fetch(`http://${req.headers.host}/api/users`);
    users = await usersResponse.json();
    users = shuffle(users); // Randomize order of users
    const categoriesResponse = await fetch(`http://${req.headers.host}/categories.json`);
    categories = await categoriesResponse.json();
  } catch (e) {
    console.log('Error occurred while fetching data from server', e);
  }

  return {
    props: { users, categories },
  };
}

export default function Home({ users, categories }) {
  const [categoryUsers, setCategoryUsers] = useState(users);
  const [selectedCategory, setSelectedCategory] = useState('');

  function onCategoryButtonClick(e) {
    const {
      dataset: { slug },
    } = e.target;
    setSelectedCategory(slug);
    setCategoryUsers(users.filter((u) => u.categories.flatMap((c) => c.slug).indexOf(slug) >= 0));
  }

  function getProfileCard(user) {
    return (
      <div className="w-full p-4 md:w-1/2 lg:w-1/4 flex justify-center" key={user.username}>
        <div className="bg-white flex flex-col items-center justify-center p-4 shadow-lg rounded-2xl w-64 hover:shadow-gray-500">
          <img
            src={user.image}
            alt="profile"
            className="mx-auto rounded-full py-2 w-16 "
            style={{ borderRadius: '100%' }}
          />
          <p className="font-bold text-2xl tracking-wide text-gray-800 text-center mt-4">
            {user.name}
          </p>
          <p className="text-gray-500 font-semibold mt-2">{user.bio}</p>
          <div className="w-full mt-8">
            <TwitterShareButton
              title={`@${user.contacts.twitter} <add your question here>`}
              url={'https://ask-devs.vercel.app/'}
              hashtags={['AskDevs']}
              className="bg-blue-400 py-2 px-4 hover:bg-blue-600 text-white w-full font-semibold rounded-lg shadow-lg"
              resetButtonStyle={false}
            >
              Tweet
            </TwitterShareButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>AskDevs</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </Head>
      <header className="flex flex-wrap items-start justify-around bg-black p-3 text-gray-100">
        <HeaderLogo />
      </header>

      <main className="bg-gradient-to-r from-rose-100 to-teal-100">
        <section className="container mx-auto px-5 pt-10">
          <h1 className="my-4 text-5xl font-bold leading-tight">Got a technical question?</h1>
          <p className="mb-8 text-3xl leading-normal">Ask our tech twitter volunteers!</p>
          <div className="flex flex-wrap space-x-2">
            {categories.map((c) =>
              c.slug === selectedCategory ? (
                <button
                  className="mt-1 rounded-full border-2 border-solid border-black px-5 py-1 text-center font-bold bg-black text-white"
                  key={`${c.slug}`}
                >
                  {c.name}
                </button>
              ) : (
                <button
                  className="mt-1 rounded-full border-2 border-solid border-black px-5 py-1 text-center font-bold text-black hover:bg-black hover:text-white"
                  key={`${c.slug}`}
                  data-slug={`${c.slug}`}
                  onClick={onCategoryButtonClick}
                >
                  {c.name}
                </button>
              )
            )}
          </div>
        </section>

        <section className="container  mx-auto body-font h-screen min-h-screen text-gray-600 px-5 py-10">
          <div className="-m-4 flex flex-wrap">{categoryUsers.map(getProfileCard)}</div>
        </section>
      </main>
    </div>
  );
}
