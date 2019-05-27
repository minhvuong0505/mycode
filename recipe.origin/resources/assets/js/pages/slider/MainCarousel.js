import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router/lib';

class MainCarousel extends Component {
    constructor(props) {
        super(props)

        this.state = {
            banners: [],
        }

    }

    async componentDidMount() {
        await axios.get('/api/v2/banner')
            .then((res)  => {
                this.setBanners(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    setBanners(banners) {
        this.setState({ banners })
    }

    render() {
        const { banners } = this.state
        if (!banners.length) {
            return (<p className="text-warning">No banners</p>);
        }
        return (
            <Carousel showArrows={false} showStatus={false} autoPlay={true} showThumbs={false} infiniteLoop={true}>
                {banners.map((banner, index) => {
                    return <div key={`banner-${index}`} className="item">
                    <Link to={`${banner.link}`}>
                    <img src={CDN_URL+`${banner.picture}`} alt="img" />
                    </Link>
                    </div>
                })}
            </Carousel>
        );
    }
}

export default MainCarousel;