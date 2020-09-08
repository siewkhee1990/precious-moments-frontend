import React, { useEffect, useState } from 'react'
import { Tooltip, Icon } from 'antd';
import { AuthContext } from "../../../AuthContext"
import Axios from 'axios';
import LikeDislikes from '../../../Services/LikeDislikeServices'

function LikeDislikes(props) {

    const { user } = useContext(AuthContext);


    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)
    let variable = {};

    if (props.video) {
        variable = { videoId: props.videoId, userId: props.userId }
    } else {
        variable = { commentId: props.commentId, userId: props.userId }
    }



    return (
        <React.Fragment>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                        onClick={onLike} />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
            </span>&nbsp;&nbsp;
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon
                        type="dislike"
                        theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'}
                        onClick={onDisLike}
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Dislikes}</span>
            </span>
        </React.Fragment>
    )
}


Axios.post('/api/like/getLikes', variable)
.then(response => {
    console.log('getLikes',response.data)

    if (response.data.success) {
        //How many likes does this video or comment have 
        setLikes(response.data.likes.length)

        //if I already click this like button or not 
        response.data.likes.map(like => {
            if (like.userId === props.userId) {
                setLikeAction('liked')
            }
        })
    } else {
        alert('Failed to get likes')
    }
})

Axios.post('/api/like/getDislikes', variable)
.then(response => {
    console.log('getDislike',response.data)
    if (response.data.success) {
        //How many likes does this video or comment have 
        setDislikes(response.data.dislikes.length)

        //if I already click this like button or not 
        response.data.dislikes.map(dislike => {
            if (dislike.userId === props.userId) {
                setDislikeAction('disliked')
            }
        })
    } else {
        alert('Failed to get dislikes')
    }
})


export default LikeDislikes