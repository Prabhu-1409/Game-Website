import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Home.css'
import windows from './icons/windows.png'
import browser from './icons/browser.png'
import searchicon from  './icons/search.png'

function Home() {
  const[games,setgames] = useState([])
  const[id,setid] = useState()
  const [initial , setinitial] = useState(0)
  const [final,setfinal] = useState(20)
  const[platform, setplatform] = useState('all')
  const[category,setcategory] = useState('')
  const[sort,setsort]= useState('')
  const [search,setsearch] = useState('')
  //console.log(category)
  //console.log(platform)
  const next = () =>{
    setinitial(initial+20)
    setfinal(final+20)
  }
  const prev = ()=>{
    setinitial(initial-20)
    setfinal(final-20)
  }
  var refresh = 0
  //console.log(final)
  const gamedata = async () =>{
      await axios.get('http://localhost:3001/games').then((received)=>{
      if(received.status===200){
        setgames([...received.data])
      }
      console.log([...received.data])
    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    gamedata()
  },[refresh])
  const platformbutton = async (e) =>{
    e.preventDefault()
    customsortdata()
      await axios.get(`http://localhost:3001/games/platform/${platform}`).then((platgames)=>{
      //console.log(platgames.data)
      if(platgames.status===200){
        setgames([...platgames.data])
      }
     }).catch((err)=>{
      console.log(err)
     })
  }
  const categorybutton = async ()=>{
    customsortdata()
     await axios.get(`http://localhost:3001/games/category/${category}`).then((categorygame)=>{
      if(categorygame.status===200){
        setgames([...categorygame.data])
      }
      }).catch((err)=>{
        console.log(err)
      })
  }
   
  const sortbutton= async (e)=>{
    e.preventDefault()
    customsortdata()
   await axios.get(`http://localhost:3001/games/sort/${sort}`).then((sorted)=>{
      setgames([...sorted.data])
    }).catch((err)=>{
      console.log(err)
    })
  }
  const customsortdata =async () =>{
    console.log("platform="+platform+"category="+category+"sort="+sort)
    await axios.get(`http://localhost:3001/games/customsort/${platform}/${category}/${sort}`).then((cust)=>{
      setgames([...cust.data])
      console.log(cust.data)
    }).catch((err)=>{
      console.log(err)
    })
}
  const searchbutton = (e) =>{
    e.preventDefault()
    //console.log(search)
    let searchdata=[]
    //console.log(searchdata)
    for(let i=0;i<=games.length-1;i++){
        if(games[i].title.toLowerCase().includes(search)){
          searchdata.push(games[i])
        }
    }
    //console.log(...searchdata)
    setgames([...searchdata])
  }
  const sliced = games.slice(initial,final)
  //console.log(games.length)
  //console.log(platform)
  return (
    <div className='home-page'>
      <div className='header'>
      <div className='header-container'>
      <form className='search-form'>
        <input className='search' type='text' placeholder='Search' value={search} onChange={(e)=>{setsearch(e.target.value)}}></input>
        <img src={searchicon} onClick={searchbutton} alt='search' className='search-icon'></img>
      </form>
      <div>
      <select className='platform-toggle' onChange={(e)=>{setplatform(e.target.value)}} onClick={platformbutton}>
        <option value={'all'}>All</option>
        <option value={'pc'}>PC</option>
        <option value={'browser'}>Browser</option>
      </select>
      </div>
      <div>
      <select className='category-toggle' onChange={(e)=>{
        setcategory(e.target.value)
        }} onClick={categorybutton}>
        <option>Select an Category</option>
        <option value={'mmorpg'}>MMOrpg</option>
        <option value={'shooter'}>Shooter</option>
        <option value={'strategy'}>Strategy</option>
        <option value={'moba'}>Moba</option>
        <option value={'racing'}>Racing</option>
        <option value={'sports'}>Sport</option>
        <option value={'social'}>Social</option>
        <option value={'sandbox'}>Sandbox</option>
        <option value={'open-world'}>Open-World</option>
        <option value={'survival'}>Survival</option>
        <option value={'pvp'}>PVP</option>
        <option value={'pve'}>PVE</option>
        <option value={'pixel'}>Pixel</option>
        <option value={'voxel'}>Voxel</option>
        <option value={'zombie'}>Zombie</option>
        <option value={'turn-based'}>Turn-Based</option>
        <option value={'first-person'}>First-Person</option>
        <option value={'third-Person'}>Third-person</option>
        <option value={'top-down'}>Top-Down</option>
        <option value={'tank'}>Tank</option>
        <option value={'space'}>Space</option>
        <option value={'sailing'}>Sailing</option>
        <option value={'side-scroller'}>Side-Scroller</option>
        <option value={'superhero'}>Superhero</option>
        <option value={'permadeath'}>Permadeath</option>
        <option value={'card'}>Card</option>
        <option value={'battle-royale'}>Battle-Royale</option>
        <option value={'mmo'}>MMO</option>
        <option value={'mmofps'}>MMOFPS</option>
        <option value={'mmotps'}>MMOTPS</option>
        <option value={'3d'}>3D</option>
        <option value={'2d'}>2D</option>
        <option value={'anime'}>Anime</option>
        <option value={'fantasy'}>Fantasy</option>
        <option value={'sci-fi'}>Sci-fi</option>
        <option value={'fighting'}>Fighting</option>
        <option value={'action-rpg'}>Action-RPG</option>
        <option value={'action'}>Action</option>
        <option value={'military'}>Military</option>
        <option value={'martial-arts'}>Martial Arts</option>
        <option value={'flight'}>Flight</option>
        <option value={'low-spec'}>Low Specification</option>  
        <option value={'tower-defense'}>Tower Defense</option>  
        <option value={'horror'}>Horror</option>
        <option value={'mmorts'}>MMORTS</option>
      </select>
      </div>
      <div>
      <select className='sort-toggle' onChange={(e)=>{setsort(e.target.value)}} onClick={sortbutton}>
        <option>Sort Games</option>
        <option value={'alphabetical'}>Alphabetical</option>
        <option value={'popularity'}>Popularity</option>
        <option value={'relevance'}>Relevance</option>
        <option value={'release-date'}>Release-date</option>
      </select>
      </div>
      </div>
      </div>
    <div className='align'>
      {sliced && sliced.map((gamedata,i)=>{
        return <React.Fragment>
        <a href={`games/${id}`} style={{textDecoration:'none'}}>
        <div className='card'  onClick={()=>{
          setid(gamedata.id)
        }}>
          <img className='thumbnail' alt='thumbnail' src={`${gamedata.thumbnail}`}></img>
          <div className='platform'>
          {gamedata.platform==="Web Browser"?
            <img src={browser} className='browser' alt='browser' ></img>:
            gamedata.platform==="Web Browser" && gamedata.platform==="PC (Windows)"?
            <>
            <img className='windows' src={windows}></img>
            <img className='browser' src={browser}></img>
            </>:
            <img src={windows} className='windows' alt='windows'></img>
          }
          </div>
          <h4 className='gametitle'>{gamedata.title}</h4>
          <div className='bottom-align'>
            <div className='release-align'>
            <h6>Release-Date</h6>
            <h6>{gamedata.release_date}</h6>
            </div>
            <div className='line'></div>
            <div className='genre-align'>
            <h6>Genre</h6>
            <h6>{gamedata.genre}</h6>
            </div>
            <div className='line1'></div>
          </div>
        </div>
        </a>
        </React.Fragment>
      })}
    </div>
    <div className='page-number'>
    {initial===0?
      <button onClick={prev} className='previous' style={{ display:'none'}}></button>
    :<button className='previous' onClick={prev}>Prev</button>}
    {final>=games.length?
       <button onClick={next} className='next' style={{display:'none'}}>Next</button>
      :
      <button className='next' onClick={next}>Next</button>
    }
    </div>
    </div>
  )
}

export default Home
