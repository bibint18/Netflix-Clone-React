
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
function Player() {
  const {id} = useParams()
  const navigate = useNavigate()
  const [apiData,setApiData] = useState({name:'',key:'',published_at:'',typeof:''})
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODMyNTczNjlkN2NmMDliMWIwZjc5MmRkMDkwMjZlYiIsIm5iZiI6MTczNzcxOTE1MC4zMzEsInN1YiI6IjY3OTM3ZDZlMDhjMTcyOWVjOTE4NTExZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D8lqlYXb1JkkUNXMzIOzTThjRUUn25rx6oh0eN5lNkU'
    }
  };
  
  

    useEffect(() => {
      fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));
    },[])

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={() => {navigate(-1)}} />
      <iframe src={`https://www.youtube.com/embed/${apiData.key}`}   width="90%" height="90%" title='trailer' frameBorder="0" allowFullScreen></iframe>

      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
        
      </div>
    </div>
  )
}

export default Player
