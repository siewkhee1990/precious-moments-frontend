import React, { useEffect, useState } from 'react'
import { List, Avatar, Typography } from 'antd';
import axios from 'axios';

function PlayVideoPage(props) {


    const videoId = props.match.params.videoId
    const [Video, setVideo] = useState([])

    const videoVariable = {
        videoId: videoId
    }

    useEffect(() => {
        axios.post('/api/video/getVideo', videoVariable)
        .then(response => {
            if(response.data.success) {
                console.log(response.data.video)
                setVideo(response.data.video)
            } else {
                alert('Failed to get video Info')
            }
        })
    }, [])


    return (
        <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
            <video style={{ width: '100%' }} src={video.video_url} controls></video>

            <List.Item
                actions={[]}
            >
                <List.Item.Meta
                    avatar={<Avatar src={Video.writer && Video.writer.image} />}
                    title={<a href="https://ant.design">{Video.title}</a>}
                    description={Video.description}
                />
                <div></div>
            </List.Item>

        </div>
    )
}

export default PlayVideoPage