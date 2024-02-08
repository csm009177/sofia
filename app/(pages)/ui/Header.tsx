import UrlButton from "./UrlButton";

export default function Header() {
  return (
    <div className="flex flex-row w-screen justify-between">
      <div className="flex flex-row h-24 w-1/4 p-5 justify-between">
        <UrlButton url="chatlog" title="chat" />
        <UrlButton url="planer" title="planer" />
        <UrlButton url="album" title="album" />
      </div>
      <div className="flex flex-row h-24 w-1/6 p-5 justify-between">
        <UrlButton url="login" title="login" />
        <UrlButton url="signin" title="signin" />
      </div>
    </div>
  );
}
