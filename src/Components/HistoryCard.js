import {Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

import {BiRupee} from 'react-icons/bi'
import {useState,useEffect,useMemo} from 'react'

const Timer=()=>{
  const [remainingTime,setReaminingTime]=useState({})

useEffect (() => {

  let year = new Date().getFullYear();
   let difference = +new Date(`10/01/${year}`) - +new Date();
 let timeLeft={}

   if (difference > 0) {
  timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
   
}
setReaminingTime(timeLeft)

},[remainingTime])


console.log('timer')
return <div className='timerContainer'>
  <div>
  <span className='timerText'>{remainingTime.days<10 ? '0'+remainingTime.days :remainingTime.days}</span>
  <span>:</span>
  <span className='timerText'>{remainingTime.hours<10 ? '0'+remainingTime.hours :remainingTime.hours}</span> <span>:</span>
  <span className='timerText'>{remainingTime.minutes<10 ? '0'+remainingTime.minutes :remainingTime.minutes}</span> <span>:</span>
  <span className='timerText'>{remainingTime.seconds<10 ? '0'+remainingTime.seconds :remainingTime.seconds}</span></div>
  <div>
  <span>{'days'}</span>
  <span>:</span>
  <span >{'hrs'}</span> <span>:</span>
  <span >{'min'}</span> <span>:</span>
  <span >{'sec'}</span></div>
</div>
}





export default function CropCard(props){

var HarvestDetail= {
    HarvestName:'Harvest Name',
    HarvestDisc:'Discription about harvest like which type of minrals were uses, when did it cut etc etc',
    HarvestQuantity:'Harvest qunatity in kg or tons or quintal',
    Image:'https://agritech.tnau.ac.in/agriculture/images/wheat_dec2015.jpg'
  }



console.log("Whole Card");

return (
        <div className='cardContainer'style={{margin:"20px 10px"}}>
          <div className='cardTop'>
      <img src={HarvestDetail.Image} className='cardImage'/>
      <div className='cardRight'>
        <span>Time Left</span>
       
        <span className='timerText'>Date of selling</span>
        
      </div>

         <div className='cardRight' style={{marginLeft:"2em"}}>
        <span>Highest Bid</span>
       
        <span style={{marginTop:'0.1em',color:'rgb(39, 75, 16)'}}>35000 <BiRupee style={{marginTop:"0.1em"}}/></span>
        
      </div>
     
      
          </div>
          <div className='cardBottom'>
            <div>
            <span className='cardTitle'>{HarvestDetail.HarvestName}</span>
            
            </div>
         
            <span className='cardDisc' style={{marginBottom:"1em",marginTop:"1em"}}>Ounatity- {HarvestDetail.HarvestQuantity}</span>
            <span className='cardDisc'>{HarvestDetail.HarvestDisc}</span>
          </div>
       </div>
  
    );
}