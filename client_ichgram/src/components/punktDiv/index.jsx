import styles from "./styles.module.css";

function PunktDiv({color}){
    return <div className={styles.punkt} 
    style={{background: color}}/>
}
export default PunktDiv;