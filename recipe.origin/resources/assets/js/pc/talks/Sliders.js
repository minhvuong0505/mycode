import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

class Sliders extends Component {
    constructor(props) {
        super(props)

        this.state = {
            medias: JSON.parse(this.props.medias)
        }
    }

    componentWillReceiveProps(){
        console.log('ccc')
        this.setState({medias:JSON.parse(this.props.medias)})
    }

    render() {
        let  { medias }= this.state
                
        return (
            <Carousel showArrows={true} showIndicators={false} showStatus={true} autoPlay={true} showThumbs={false}>
                {Object.keys(medias).map((media, index) => {
                    return <div key={`media-${index}`}>
                    <img style={{height:'53vw'}} src={CDN_URL+`${medias[media].images}`} alt="img" />
                    </div>
                })}
            </Carousel>
        );
    }
}

export default Sliders;