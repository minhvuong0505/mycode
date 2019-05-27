import React, { Component } from 'react';
import {IndexLink, Link} from "react-router"


class MainTags extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tags: [],
            counts:[]
        }

    }

    componentDidMount() {
        axios.get('/api/v1/tags?page_id=0&page_size=6&filters=status=1,hot=1&sorts=-id')
            .then((res)  => {
                this.setBanners(res.data.result)
            })
            .catch((err) => {
                // console.log(err)
            })

            axios.get('/api/v1/post?filters=status=1&fields=count(*) as cnt')
            .then((res)  => {
                this.setCounts(res.data.result)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    setBanners(tags) {
        this.setState({ tags })
    }

    setCounts(data) {        
        let arr = ('' + data[0]['cnt']).split('').map(function(digit)  {return +digit;});
        let { counts } = this.state
        counts = arr
        this.setState({ counts })
    }

    renderTags() {
        const { tags } = this.state
        if(!tags.length) return (<p className="text-warning">No tags</p>);

        return (<ul className="list">
            {tags.map((tag, index) => {
                return <li key={`tag-${index}`}><Link to={`/searchs?tag=${tag.name}`}>#{tag.name}</Link></li>                                              
            })}
        </ul>);
    }

    render() {
        const { counts } = this.state
        return (
            <div className="block-home3">
                <div className="block-title">
                    <span>반려동물 맞춤 레시피 </span>
                    <strong>어떤 레시피를 찾으세요?</strong>
                </div>
                <div className="box-count">
                    { counts.map((count,index) => {
                        return <span key={`count-${index}`}>{count}</span>
                    }) }
                </div>

                {this.renderTags()}
                
          </div>
        );
    }
}

export default MainTags;