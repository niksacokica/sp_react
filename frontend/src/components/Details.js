import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'
import Post from './PostD';

function Details(){
    const [post, setPost] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();
    useEffect(function(){
        const getPost = async function(){
            const res = await fetch("http://localhost:3001/posts/" + searchParams.get("id"));
            const data = await res.json();
			
            setPost(data);
        }
        getPost();
    }, []);

    return(
        <div>
            <ul>
                <Post post={post} key={post._id}></Post>
            </ul>
        </div>
    );
}

export default Details;