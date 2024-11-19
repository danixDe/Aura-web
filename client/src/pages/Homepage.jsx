import Navbar from "./Navbar";
import ImageSlider from "./ImageSlider";
import Table from "./BloodReq";
import styles from "./Homepage.module.css"
function Homepage(){
    return(
        <>
        <div id={styles.homepage}>

        <Navbar/>
        <div id={styles.feed}>
        <Table id={styles.tables} />
        <ImageSlider id={styles.imageslider}/>
        </div>
        </div>
        </>
    )
}
export default Homepage