import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Post from './Post';

function Posts(){
    const [posts, setPosts] = useState([]);
    useEffect(function(){
        const getPosts = async function(){
            const res = await fetch("http://localhost:3001/posts");
            const data = await res.json();
            setPosts(data);
        }
        getPosts();
    }, []);

    return(
        <div>
            <h3>Posts:</h3>
            <ul>
				{posts
					.sort((a, b) => a.date < b.date ? 1 : a.date > b.date ? -1 : 0)
					.map(
					post=>(
						<Link to={{
							pathname: "/details",
							search: "?id=" + post._id,
							state: { fromDashboard: true }
						  }}>
						<Post post={post} key={post._id}></Post>
						</Link>
					)
				)}
            </ul>
        </div>
    );
}

export default Posts;