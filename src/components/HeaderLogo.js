export default function HeaderLogo() {
  return (
    <h1
      onClick={() => {
        window.location.reload();
      }}
      className="text-4xl font-extrabold tracking-tighter text-white sm:text-5xl lg:text-7xl cursor-pointer"
    >
      AskDevs
    </h1>
  );
}
