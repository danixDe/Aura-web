import Navbar from "./Navbar";
import ImageSlider from "./ImageSlider";
import Table from "./BloodReq";
import styles from "./Homepage.module.css"
import Card from "./Card"
function Homepage(){
    let cards=["Blood availability search","Blood donation camp","Register blood camp",];
    return(
        <div id={styles.homepage}>
            <div id={styles.navbar}>
                <Navbar/>
            </div>
            <div id={styles.feed}>
                <Table id={styles.tables} />
                <ImageSlider id={styles.imageslider}/>
            </div>
            <div id={styles.cards}>
                {
                    cards.map((card)=>{
                        return( <Card id={styles.card} card={card}/>)
                    })
                }
            </div>
        </div>
    )
}
export default Homepage