import UrlButton from './UrlButton';


export default function Header() {
  return (
    <div>
      <div className='flex flex-row h-32 justify-between p-7'>
      <UrlButton url="chatlog" title="chat"/>
      <UrlButton url="planer" title="planer"/>
      <UrlButton url="album" title="album"/>
      </div>
      <div>
        <UrlButton url="login" title="login"/> 
        <UrlButton url="signin" title="signin"/> 
      </div>
    </div>
  );
}
