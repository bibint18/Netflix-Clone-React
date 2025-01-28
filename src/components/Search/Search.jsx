import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Search.css';

function Search({search}) {
    const [apiData, setApiData] = useState([]);
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlN2RlMTA1N2YzMGJhMjZlNWMyOTQyY2I1OTEwYWI2NSIsIm5iZiI6MTczNjE1MDYwMi41NzUsInN1YiI6IjY3N2I4ZTRhMmIwOTdiMTVhMjc0ZmYwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1S1E95imxdyEeGgf656fquoT-D4QhXAwBJ6_8-LkNdA'
        }
    };

    useEffect(() => {
        const fetchData = async (url) => {
            try {
                const res = await fetch(url, options);
                const data = await res.json();

                setApiData((prevData) => {
                    const combinedData = [...prevData, ...data.results];
                    const uniqueData = Array.from(
                        new Map(combinedData.map((item) => [item.id, item])).values()
                    );
                    return uniqueData;
                });
            } catch (err) {
                console.error(err);
            }
        };

        const urls = [
            'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
            'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
            'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1'
        ];

        urls.forEach(fetchData);
    }, []);

    return (
        <>
            <div className="grid-list">
                {apiData.filter((card,_)=>card.original_title.toLowerCase().includes(search.toLowerCase())).map((card, index) => (
                    <Link to={`/player/${card.id}`} className="card" key={index}>
                        <div className="grid-card">
                            <img src={`https://image.tmdb.org/t/p/w500` + card.poster_path} alt="" />
                            <p>{card.original_title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}

export default Search;
