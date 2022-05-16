import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../userContext';
import Comment from './Comment';

function Post(props){
	const userContext = useContext(UserContext); 
    const[content, setContent] = useState('');
	
	async function onSubmit(e){
        e.preventDefault();

        if(!content){
            return;
        }
		
        const res = await fetch('http://localhost:3001/comments', {
            method: 'POST',
            credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: content,
				id: props.post._id
            })
        });
        const data = await res.json();
		
		if(data._id !== undefined){
            window.location.reload(false);
        }
    };
	
	async function onLike(e){
		e.preventDefault();
		
		const res = await fetch('http://localhost:3001/posts/' + props.post._id, {
            method: 'POST',
			credentials: 'include'
        });
        const data = await res.json();
		
		if(data._id !== undefined){
            window.location.reload(false);
        }
    };
	
	const [comments, setComments] = useState([]);
    useEffect(function(){
        const getComments = async function(){
            const res = await fetch("http://localhost:3001/comments");
            const data = await res.json();
            setComments(data);
        }
		
        getComments();
    }, []);
	
    return (
        <div className="text-dark">
			<h1 className="title">{props.post.name}</h1>
			<h5 className="date">Date: {props.post.date} </h5>
			<h5 className="likes">Likes: {props.post.likes ? props.post.likes.length : 0}</h5>
            <img className="img" src={"http://localhost:3001/"+props.post.path} alt={props.post.name} style={{width: '25%'}}/>
			
			<br/><br/><hr/>
			
			{comments.map(
				comment=>(
					props.post.comments && props.post.comments.includes(comment._id) ?
						<Comment comment={comment} key={comment._id}></Comment>
					: ""
				)
			)}
			
			{userContext.user ?
			<div>
				{props.post.likes && !props.post.likes.includes(userContext.user._id) ?
					<div>
						<button className="btn btn-primary" onClick={onLike}>Like</button>
						<br/><br/>
					</div>
				: ""}
				
				<form className="form-group" onSubmit={onSubmit}>
					<input type="text" className="form-control" name="content" placeholder="Comment" value={content} onChange={(e)=>{setContent(e.target.value)}}/>
					<input className="btn btn-primary" type="submit" name="submit" value="Comment" />
				</form>
			</div>
			: ""}
		</div>
    );
}

export default Post;