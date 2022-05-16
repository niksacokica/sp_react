function Comment(props){	
    return (
        <div className="text-dark">
			<h5 className="comment">{props.comment.postedBy.username}: {props.comment.content}</h5>
			<hr/>
		</div>
    );
}

export default Comment;