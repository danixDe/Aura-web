import * as React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import styles from "./ImageSlider.module.css";
import { FcPrevious,FcNext } from "react-icons/fc";
import { useState } from 'react';
 function ImageSlider() {
  const [index,setIndex]=useState(0);
  let images=[{url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOPyA7gYKwFL5KWQrsbkmI-8AHPDuCSA3jnA&s",desc:"udaykiran memmorial blood donation camp",venue:"01-12-2024 , GVPCE"},
  {url:"https://static.toiimg.com/thumb/msid-114248415,imgsize-1000986,width-400,resizemode-4/114248415.jpg",desc:"devara blood camp",venue:"yerra samudram"},
  {url:"https://t3.ftcdn.net/jpg/06/05/30/32/360_F_605303270_2KiqCAkwwzYQNDHU89zMoedrlOUkN7wR.jpg", desc:"friends for help blood camp", venue:"KGH vizag"},
  {url:"https://png.pngtree.com/template/20210525/ourmid/pngtree-blood-donation-during-covid-19-social-media-banner-psd-image_528207.jpg",desc:"youth for seva blood camp", venue:"gnanapuram"},
  
]
  const imglen=images.length;
  const prevbtn=()=>{
    setIndex(i=>i==0?imglen-1:i-1);
  }
  const nextbtn=()=>{
    setIndex(i=>(i+1)%imglen);
  }
  // const autoslder = setInterval(()=>{
  //   nextbtn();
  // },5000)
  return (
    <>
    <div id={styles.container}>
      <div id={styles.prevbtn}>
      <FcPrevious onClick={prevbtn}/>
      </div>
      <div id={styles.image}>
      <Card sx={{ minHeight: '280px', width: 320 }}>
      <CardCover>
        <img
          src={images[index].url}
          srcSet={images[index].url}
          loading="lazy"
          alt=""
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
        }}
      />
      <CardContent sx={{ justifyContent: 'flex-end' }}>
        <Typography level="title-lg" textColor="#fff">
          {images[index].desc}
        </Typography>
        <Typography
          startDecorator={<LocationOnRoundedIcon />}
          textColor="neutral.300"
        >
          {images[index].venue}
        </Typography>
      </CardContent>
    </Card>

      </div>
      <div id={styles.nextbtn}>
        <FcNext onClick={nextbtn}/>
      </div>
    </div>
    </>
  );
}

export default ImageSlider