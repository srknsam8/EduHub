import styles from './Navbar.module.css';

function Navbar() {
  const navItems = [
    'Online assesment',
    'Courses',
    'Career Mapper',
    'Smart Notes',
  ];

  return (
    <div className={styles.navbarMainContainer}>
      <div>Logo</div>
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
