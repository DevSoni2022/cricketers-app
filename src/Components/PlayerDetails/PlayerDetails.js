import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import getPlayers from '../../get-players';
import './playerdetails.scss'
// import {withRouter} from 'react-router-dom'
const PlayerDetails = (prop) => {
    let { id } = useParams();
    const [data,setData] =useState('')
    const [detials,setDetail] = useState('')
    const getData = () => {
        getPlayers().then((res) => {
          setData(res);
          if(data && data.length>0)
          {
             setDetail( data.filter((ele,index)=>ele && ele.id ==id))
          }
        });
      };
      useEffect(() => {
        getData();
       
      }, [data.length]);

    const {name,Age,type,description,dob,points,rank} = detials && detials[0]
    
const getDob=(dob)=>{
let DateOfBirth = new Date(dob).toDateString();

// DateOfBirth = DateOfBirth && DateOfBirth.dateString();
return DateOfBirth
}
    //   let Dob =new Date(dob)
  return (
    <div className='PlayerDetails '>
        <span className='arrow-main'><svg className='arrow' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path></svg>
</span>
        <span className='heading'> Player Details </span>

        <div className='player-detail-text'>
            <span className='name'>{name}</span>
            <p className='discription'>{description}</p>
            <div className='type'><span className='type-text'>Type :</span><span className='type-main'>&nbsp;{type}</span></div>
            <div className='type'><span className='type-text'>Points :</span><span className='type-main'>&nbsp;{points}</span></div>
            <div className='type'><span className='type-text'>Rank :</span><span className='type-main'>&nbsp;{rank}</span></div>
            <div className='type'><span className='type-text'>Date of Birth :</span><span className='type-main'>&nbsp;{getDob(dob)}</span></div>
            <div className='type'><span className='type-text'>Age :</span><span className='type-main'>&nbsp;{Age}</span></div>

        </div>

        <div className='second-container'>

        <h2>See similar type players</h2>
        <div className='second-main'>
        {
            data && data.length>0 && data.filter((ele,index)=>ele.type ==type).map((ele2,index)=>{
                if(index<5)
                return(
                    <a href={`/PlayerDetail/`+ele2.id} className='similar-player-card'>
                        <div className='name'>Name : &nbsp;{ele2.name}</div>
                        <div className='name'>Points:&nbsp;{ele2.points}</div>
                        <div className='name'>Rank : &nbsp;{ele2.rank}</div>

                    </a>
                )
            })
        }
        </div>
        </div>
    </div>
  )
}

export default PlayerDetails