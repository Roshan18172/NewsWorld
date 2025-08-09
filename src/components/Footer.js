function Footer(props) {
  return (
      <footer className={`fixed-bottom bg-primary text-white`}> 
        <p className='text-center m-auto'>&copy;  {new Date().getFullYear()} NewsWorld. All rights reserved.</p>
      </footer>
  );
}
export default Footer;
// This component is a simple footer that displays the copyright information and a message from the team.