import React, { Component } from 'react';
import Paginator from '../common/Paginator';
import Comments from '../Comments';


class Detail extends Component {
    constructor(props) {
		super(props);
		
		this.state = {
            event:{},
            eventId: props.routeParams.id,
            prev:'',
            next:'',
            max:'',
            object_type:'Event',
            sort:'id'
		};

        this.getEvent();
        this.pageChange = this.pageChange.bind(this)
    }
    
    getEvent() {
        const { eventId } = this.state;

        //get max id
        axios.get(`/api/v1/events?filters=status=1&sorts=-id&page_size=1`)
            .then(response => {
                this.setMax(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        axios.get(`/api/v1/events?filters=status=1,id=${eventId}`)
            .then(response => {
                this.setEvents(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }


	componentDidMount(){
        const { eventId } = this.state
        let prev = eventId > 0 ? parseInt(eventId) - 1 : 0
        let next = eventId > 0 ? parseInt(eventId) + 1 : 0

        this.setState({ prev, next })
	}
	
    setEvents(event) {   
        if(typeof event['result'][0].media != 'object')
            event['result'][0].media = JSON.parse(event['result'][0].media)
        this.setState({ event:event['result'][0]}); 
    }

    setMax(event) {   
        this.setState({ max:event['result'][0].id}); 
    }

    pageChange(eventId) {
        let prev = eventId > 0 ? parseInt(eventId) - 1 : 0
        let next = eventId > 0 ? parseInt(eventId) + 1 : 0

        this.setState({ prev, next })
        axios.get(`/api/v1/events?filters=status=1,id=${eventId}`)
            .then(response => {
                this.setEvents(response.data);  
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const { event } = this.state
        const { prev } = this.state
        const { next } = this.state
        const { max } = this.state
        const {eventId} = this.state
        const { sort } = this.state


        let img
        let deadline
        if(event.deadline != undefined){
            deadline = event.deadline.toString().substr(0,11)
        }

        
        let medias = [];
        if(event.media){
            medias = event.media;  
        }

        return (
            <main className="site-main">
                <div className="page-title">
                    <h1 className="title">이벤트</h1>
                </div>
                <div className="event-detail">
                    <h1 className="title">{event.title}</h1>
                    <span className="subtitle">{event.desc}</span>
                    <div className="date">~ {deadline}</div>
                    {medias.map((img, index) => {
								return <p key={`img-${index}`}>
                                    <img src={CDN_URL+img} alt="img" />
                                    </p>
						})}	
                                      <p dangerouslySetInnerHTML={{__html: event.content}}></p>

                    </div>
                    <Comments object_type={this.state.object_type} total={event.total_cmt} object_id={event.id} sort={sort} redirect_url={`/event/${eventId}/detail`}/>

                <nav aria-label="Page navigation">
                <Paginator prev_page_url={prev} max={max} next_page_url={next}
                                pageChange={this.pageChange}/>
                </nav>
            </main>
        );
    }
}

export default Detail;