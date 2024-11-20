import React from 'react';
import styles from './Card.module.css';

const Card = (props) => {
  return (
      <div className={styles.card}>
        <div className={styles.cardcontent}>
          <p className={styles.cardtitle}>Blood</p>
        <p className={styles.cardpara}>{props.card}</p>
        </div>
      </div>
  );
}


export default Card;
