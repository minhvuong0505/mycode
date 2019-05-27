//import libs
import React, {Component} from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router/lib';
import { getDateTime, mydiff, isImage } from '../../helpers/Helpers';



class Events extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			events:[],
			offset:0,
			limit: 5,
			pageCount:0,
			sort:"id"
		};

		this.loadData = this.loadData.bind(this)
		this.handlePageClick = this.handlePageClick.bind(this)
	}

	componentDidMount(){
		this.loadData()
	}

	
	loadData(curr_date = '', value = ''){
		const {limit} = this.state
		const {offset} = this.state
		const {sort} = this.state
		if(value == 3){
			curr_date = 'deadline<' + curr_date; //view closed events
		}else if(value == 2){
			curr_date = 'deadline>=' + curr_date; //progress events
		}

		axios.get('/api/v1/events?page_id='+offset+'&page_size='+limit+'&sorts=-'+sort+'&filters=status=1,' + curr_date)
		.then((res)  => {
			this.setEvents(res.data)
		})
		.catch((err) => {
			console.log(err)
		})
	}

	setEvents(events) {   
        const {limit} = this.state 
        this.setState({ events:events['result'], total:events.meta.total_count, pageCount: Math.ceil(events.meta.total_count / limit)}); 
    }

	handlePageClick(data){
		let selected = data.selected;
		const { limit } = this.state
		let offset = Math.ceil(selected);

		this.setState({offset: offset}, () => {
			this.loadData();
		});
		$('html, body').animate({
			scrollTop: 0
		  }, 0);
	};

	 mydiff(date1,date2,interval) {
		var second=1000, minute=second*60, hour=minute*60, day=hour*24, week=day*7;
		date1 = new Date(date1);
		date2 = new Date(date2);
		var timediff = date2 - date1;
		if (isNaN(timediff)) return NaN;
		switch (interval) {
			case "years": return date2.getFullYear() - date1.getFullYear();
			case "months": return (
				( date2.getFullYear() * 12 + date2.getMonth() )
				-
				( date1.getFullYear() * 12 + date1.getMonth() )
			);
			case "weeks"  : return Math.floor(timediff / week);
			case "days"   : return Math.floor(timediff / day); 
			case "hours"  : return Math.floor(timediff / hour); 
			case "minutes": return Math.floor(timediff / minute);
			case "seconds": return Math.floor(timediff / second);
			default: return undefined;
		}
	}

	convertDateForIos(date) {
		var arr = date.split(/[- :]/);
		date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
		return date;
	}

	
	onChange({name, value}){
		let curr_date = getDateTime().slice(0,10);
		console.log(curr_date);
		if(value == 3) { // view events closed
			this.loadData(curr_date, value);
		}else if(value == 2){
			this.loadData(curr_date, value);
		}else{
			this.loadData();
		}
	}

    render() {
		const { events } = this.state

		var curday = function(sp){
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //As January is 0.
			var yyyy = today.getFullYear();
			
			if(dd<10) dd='0'+dd;
			if(mm<10) mm='0'+mm;
			return (yyyy+sp+mm+sp+dd);
		};
		

		let curr_date = curday('-')

        return (<main className="site-main">
			<div className="container">
			  <div className="block-gird-item">
				<div className="toobar">
				  <div className="title pull-left">
					이벤트
				  </div>
				  <select className="form-control _md pull-right" name="sort" onChange={(e) => this.onChange({ name: e.target.name, value: e.target.value })} >
						<option value="1">이벤트 전체보기</option>
						<option value="2">진행중 이벤트 보기</option>
						<option value="3">종료된 이벤트 보기</option>
				  </select>
				</div>
				<div className="items">
				{events.map((event,index) => {
				let deadline = event.deadline
				let date = this.mydiff(curr_date,deadline,'days')
				let medias = [];
				if(event.media){
						medias = JSON.parse(event.media);  
				}
				
				let _unCalcDay = moment().diff(event.deadline, "days");
				let _dayTo = "NOW";
				if(_unCalcDay > 0) {
					_dayTo = "END";
				} else if (_unCalcDay < 0) {
					_dayTo = "D-" + Math.abs(_unCalcDay);
				}

				return <div key={`event-${index}`} className="col-sm-6 item ">
					<div className="item-event">
					  <div className="photo">			
						<Link key={`img-${index}`} to={`/event/${event.id}/detail`}><img style={{height:'350px'}} src={CDN_URL+medias[0]} alt="img" /><br/></Link>		
					  </div>
					  <div className="detail">
						<strong className="title"><Link key={`img-${index}`} to={`/event/${event.id}/detail`}>{event.title}</Link></strong>
						<p> {event.desc}</p>
						<span className="label">{_dayTo}</span>
					  </div>
					</div>
				  </div>
				})}  
				</div>
				<nav aria-label="Page navigation">
				<ReactPaginate previousLabel={"<"}
                       nextLabel={">"}
                       pageCount={this.state.pageCount}
                       marginPagesDisplayed={0}
                       pageRangeDisplayed={3}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />   
				</nav>
			  </div>                                                          
			</div>
		  </main>
        );
    }
}

export default Events;