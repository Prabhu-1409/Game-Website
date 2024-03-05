import axios from "axios";
import { useState } from "react";

const [games, setgames] = useState()

axios.get(`https://api.rawg.io/api/platforms?key=${api}`).then((res)=>{
    console.log(res.data)
  })