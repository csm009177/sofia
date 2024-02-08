import UrlButton from "./UrlButton";

export default function Header() {
  return (
    <div className="flex flex-row w-screen justify-between">
      <div className="flex flex-row h-24 p-5">
        <UrlButton url="chatlog" title="chat" />
        <UrlButton url="planer" title="planer" />
        <UrlButton url="album" title="album" />
      </div>
      <div className="flex flex-row justify-between p-5">
        <UrlButton url="login" title="login" />
        <UrlButton url="signin" title="signin" />
      </div>
    </div>
  );
}
