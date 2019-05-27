import React, { Component } from 'react';

class MainVideo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            videos: [],
        }

    }
    componentDidMount() {
        axios.get('/api/v1/videos?&page_size=1&sorts=-id&filters=status=1')
            .then((res)  => {
                this.setVideos(res.data.result)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    setVideos(videos) {
        this.setState({ videos })
    }

    renderVideo() {
        const { videos } = this.state
        if(!videos.length) return (<p className="text-warning">No video</p>);

        return (<ul className="list">
            {videos.map((video, index) => {
                return <a key={`video-${index}`} data-fancybox href={video.embed_link} className="box-video"><img src={CDN_URL+`${video.images}`} alt="img" /></a>                                   
            })}
        </ul>);
    }
    render() {
        const { videos } = this.state;
        var _title = "모질개선 UP! 맛있는 치킨 쿠키";
        if(videos[0] != undefined) 
        {
            _title = videos[0].title;
        }
        return (
            <div className="block-home4">
                <div className="block-title">
                    <span>RECIPEBOM <strong>TV</strong> <img src="./html/images/icon/video.png" alt="img" /></span>
                </div>
                <div className="block-content">
                    <div className="video">
                        {this.renderVideo()}
                    </div>
                <p>{_title}</p>
                </div>
            </div>
        );
    }
}

export default MainVideo;