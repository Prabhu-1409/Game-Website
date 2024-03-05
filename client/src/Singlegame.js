import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './Singlegame.css'
import live from './icons/live.png'

function Singlegame() {
  const[singlegamedata,setsinglegame]= useState([])
  const [gameimages,setimages] = useState()
    const id = useParams()
    console.log(id.id)
    useEffect(()=>{
        axios.get(`http://localhost:3001/${id.id}`).then((single)=>{
            console.log(single)
            setsinglegame([single.data])
            setimages(single.data.screenshots)
            //console.log(single.data.screenshots)
        })
    },[id])
  return (
    <div className='single-game'>
      <div className='carousel-property'>
      <Carousel className='carousel' autoPlay showArrows={true} showIndicators={true}>
      {gameimages && gameimages.map((slideimage,i)=>{
        return <React.Fragment>
        <img src={slideimage.image} className='slide-image' alt='slide-image'></img>
        </React.Fragment>
      })}
      </Carousel>
      </div>
      {singlegamedata && singlegamedata.map((data,i)=>{
        return <React.Fragment>
          <div className='singlegamepage'>
          <h3 className='game-title'>{data.title}</h3>
          <div className='status'>
          <img src={live} alt='status' className='live'></img>
          <h5 className='status-text'>{data.status}</h5>
          </div>
          <div className='subtopic'>
            <div className='subtopic-align'>
            <h5 className='topics'>Developer:</h5><h5>{data.developer}</h5>
            </div>
            <div className='subtopic-align'>
              <h5 className='topics'>Genre:</h5><h5>{data.genre}</h5>
            </div>
            <div className='subtopic-align'>
            <h5 className='topics'>Release-Date:</h5><h5>{data.release_date}</h5>
            </div>
            <div className='subtopic-align'>
              <h5 className='topics'>Publisher</h5><h5>{data.publisher}</h5>
            </div>
          </div>
          <div className='specification'>
            <h5 className='spec-text'>System Requirements</h5>
            <table  width={'50%'}>
              <tr>
                <td className='spec-name'>Graphics</td>
                <td>{data.minimum_system_requirements.graphics}</td>
              </tr>
              <tr>
                <td className='spec-name'>Memory</td>
                <td>{data.minimum_system_requirements.memory}</td>
              </tr>
              <tr>
                <td className='spec-name'>Operating System</td>
                <td>{data.minimum_system_requirements.os}</td>
              </tr>
              <tr>
                <td className='spec-name'>Processor</td>
                <td>{data.minimum_system_requirements.processor}</td>
              </tr>
              <tr>
                <td className='spec-name'>Storage</td>
                <td>{data.minimum_system_requirements.storage}</td>
              </tr>
            </table>
          </div>
          <div>
            <h5 className='description'>Description</h5>
            <p>{data.description}</p>
          </div>
          </div>
        </React.Fragment>
      })}
    </div>
  )
}

export default Singlegame
