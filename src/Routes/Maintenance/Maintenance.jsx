
import './Maintenance.css'
import Navbar from '../../components/Navbar/Navbar';
import Stars from '../../components/Stars/Stars'
import TypewriterEffect from '../../components/typewriterfx/TypeWriterEffect'
import styles from './MaintenanceModule.module.css'
function Maintenance() {
  
  return (
    
    <>
    <Navbar/>
    <Stars/>
    <div className={styles.title2}>
        <TypewriterEffect className={styles.title2} text={"Em Manutenção"}  speed={100} />
        <p className={styles.subtitle2}>Em breve...</p>
      </div>
     
    </>
  )
}

export default Maintenance
