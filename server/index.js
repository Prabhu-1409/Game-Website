const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors({
  origin:'http://localhost:3000',
  methods:['GET','POST'],
  credentials:true
}))

const api='c459857b37874c04ac9304d8a571defd'

const options = {
  method: 'GET',
  url: 'https://www.freetogame.com/api/games',
  headers: {
    'X-RapidAPI-Key': 'ca4bd5a7c7msh108a4348576e0b7p14a928jsnc519998781fe',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
  }
};


app.get('/',(req,res)=>{
  res.send("HELLO")
})

app.get('/games', async(req,res)=>{
  //try{
    //axios.get(`https://api.rawg.io/api/platforms?key=${api}`).then((games)=>{
      //console.log(games.data)
      //res.send(games.data)
    //})
  //}catch(err){
    //console.log(err)
  //}
  try {
    const response = await axios.request(options).then((gamedata)=>{
      //console.log(gamedata.data)
      res.send(gamedata.data)
    }).catch((err)=>{
      console.log(err)
    })
  } catch (error) {
    console.error(error);
  }
  })

app.get('/:id', async(req,res)=>{
  const gameid = req.params.id
  //console.log(gameid)
  try{
      await axios.get(`https://www.freetogame.com/api/game?id=${gameid}`).then((single)=>{
      //console.log(single.data)
      res.send(single.data)
    })
  }catch(err){
    console.log(err)
  }
})

app.get('/games/platform/:platform', async(req,res)=>{
  const gameplatform = req.params.platform
  //console.log(gameplatform)
  try{
   await axios.get(`https://www.freetogame.com/api/games?platform=${gameplatform}`).then((gamedata)=>{
      //console.log(gamedata.data)
      res.send(gamedata.data)
    })
  }catch(err){
    console.log(err)
  }
})

app.get('/games/category/:category', async(req,res)=>{
  const gamecategory = req.params.category
  //console.log(gamecategory)
  try{
   await axios.get(`https://www.freetogame.com/api/games?category=${gamecategory}`).then((categorygame)=>{
      res.send(categorygame.data)
    })
  }catch(err){
    console.log(err)
  }
})

app.get('/games/sort/:sort',async(req,res)=>{
  const sorting = req.params.sort
  try{
    await axios.get(`https://www.freetogame.com/api/games?sort-by=${sorting}`).then((sortedgames)=>{
      res.send(sortedgames.data)
    })
  }catch(err){
    console.log(err)
  }
})

app.get('/games/customsort/:platform/:category/:sort',async(req,res)=>{
  const customplat = req.params.platform
  const customcat = req.params.category
  const customsort = req.params.sort
  //console.log(customplat+" "+customcat+" "+customsort)
  try{
    await axios.get(`https://www.freetogame.com/api/games?platform=${customplat}&category=${customcat}&sort-by=${customsort}`).then((customdata)=>{
      res.send(customdata.data)
    })
  }catch(err){
    console.log(err)
  }
})

app.listen(3001,(req,res)=>{
  console.log("Listening")
})

