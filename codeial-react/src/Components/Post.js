import React from 'react';

//function based component
function Post(props) {
    let poststyle={
        color: 'grey'
    }
  return (
    <li className="Postitem" style={poststyle}>
        {props.post.content}
        {props.post.user.name}

    </li>
  );
}

export default Post;
