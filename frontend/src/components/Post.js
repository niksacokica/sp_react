function Post(props){
    return (
        <div className="text-dark">
			<hr/>
			<h1 className="title">{props.post.name}</h1>
			<h5 className="by">PostedBy: {props.post.postedBy.username}</h5>
			<h5 className="date">Date: {props.post.date} </h5>
			<h5 className="likes">Likes: {props.post.likes ? props.post.likes.length : 0}</h5>
            <img className="img" src={"http://localhost:3001/"+props.post.path} alt={props.post.name} style={{width: '25%'}}/>
		</div>
    );
}

export default Post;