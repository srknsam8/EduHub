import styles from './Navbar.module.css';
import logo from '../../assets/eduhub.png'

function Navbar() {
  const navItems = [
    'Online assesment',
    'Courses',
    'Career Mapper',
    'Smart Notes',
  ];

  return (
    <div className={styles.navbarMainContainer}>
    <div style={{display:"flex", alignItems:"center"}} >

      <img src={logo} />
      <div style={{fontSize:"2.3rem", marginLeft:"0.3rem"}} >EduHub</div>
    </div>
      <ul className={styles.navItemsList}>
        {navItems.map((item, index) => {
          return(
            <>
            <li key={index}>{item}</li>
            <div className={styles.lineBreak}></div>
            </>
          ) 
        })}
      </ul>
    </div>
  );
}

export default Navbar;
