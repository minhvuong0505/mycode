import React, { Component } from 'react';
import Dates from '../common/Dates';

class EventAdd extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            event:{
                title:'',
                desc:'',
                content:'',
                media:{},
                deadline:'',
            },
            images:{
                1:{url:''},
                2:{url:''},
                3:{url:''}
            },
            errors: {},
            hasError: false,
            message: null,
        };
        
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.thumbImages = this.thumbImages.bind(this)

        if(PROFILES == undefined){
            window.location.href = "/login?redirect_url=event_add"
        }
    }

    componentDidMount(){
    }

    onChange({name, value}){
      const {event} = this.state
      event[name] = value
      this.setState({ event })
    }

    resetErrors() {
        this.setState({
            errors: {},
            hasError: false,
        })
    }

    resetMessage() {
        this.setState({ message: null })
    }

    renderErrors() {
        const { errors, hasError } = this.state

        if (!hasError) return null
        return (
            <div className="alert alert-danger alert-dismissible" role="alert">
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>                
                <p>{this.state.errors.message}</p>
            </div>
        )
    }

    renderMessage() {
        const { message } = this.state
        
        if (message) {
            return (
                <div className="alert alert-success alert-dismissible" role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <p><strong>Success!</strong> { message }</p>
                </div>
            )
        }
    }

    onSubmit(e){
        e.preventDefault();
        const { event } = this.state;

        if(!event['title']){
            alert('제목 정보 입력해주세요')
            return false
        }

        if(!event['desc']){
            alert('간략 내용 정보 입력해주세요')
            return false
        }

        if(!event['content']){
            alert('상세 내용 내용 정보 입력해주세요')
            return false
        }

        if(!event['media']){
            alert('사진첨부 내용 내용 정보 입력해주세요')
            return false
        }

        if(!event['year'] || !event['month'] || !event['date']){
            alert('마감일 내용 내용 정보 입력해주세요')
            return false
        }else{

            event['deadline'] = event['year']+'-'+event['month']+'-'+event['date']
            // Return today's date and time
            var currentTime = new Date()
            var date2 = new Date(event['deadline'])

            if(date2 > currentTime) {
                console.log('true')
            }else{
                alert('마감일 > 오픈 데이');
                return false
            }

        }

        const con = confirm(' 등록하시겠습니까?')
            if(con !== true) return false
        
        //request new token
        refreshToken()
        axios.post('/api/v3/events', event, {headers:{
            'Authorization': `Bearer ${TOKENS}`
        }})
            .then(res => {
                if (res.status === 201) {
                    
                    this.setState({ message: '성공적으로 생성됨' })
                    window.location.href = "/event"
                } else {
                    return res;
                }
            })
            .catch(err => {
                if (err.response) {
                    const errors = err.response.data
                    this.setState({ errors, hasError: true })
                }

                if(err.response.data.status_code == 401){
                    alert('다시 로그인해야합니다.')
                    window.location.href = '/logout?redirect_url=event_add'
                }
            })
    }

    isImage(filename) {
        var ext = this.getExtension(filename);
        switch (ext.toLowerCase()) {
        case 'jpg':
        case 'gif':
        case 'bmp':
        case 'png':
            //etc
            return true;
        }
        return false;
    }

    //upload
    getExtension(filename) {
        var parts = filename.split('.');
        return parts[parts.length - 1];
    }

    thumbImages(e, index) {
        let reader = new FileReader();
        let file = e.target.files[0];
        //valid 
        if(this.isImage(file.name) !== true){
            alert('이미지 업로드하기');   
            return false;
        }
        //valid size
        if(file.size > 1024*1024*2){
            alert('파일 크기는 2MB를 초과 할 수 없습니다.');
            return false;
        }


        const { event } = this.state  
        const { images } = this.state     

        reader.onloadend = (e) => {            
            images[index]['url'] = (<img style={{height:'90px', width:'90px'}} src={reader.result} />)
            this.setState({ images })

            var data = {'file': reader.result };
            $.ajax({
                type: 'POST',
                url: '/api/v2/fileupload',
                data: data,
                success: function(response) {
                    if(response){
                        if(event['media'][index] != undefined){
                            event['media'][index]['images'] = 'tmp/'+response.file
                        }else{
                            event['media'][index] = {}
                            event['media'][index]['images'] = 'tmp/'+response.file
                        }                        
                    }            
                       
                },
                error: function(response) {
                    
                },
            });
        }

        console.log(images)     
        this.setState({ event })        
        reader.readAsDataURL(file)   
    }

    handleClose(){
        window.history.back()
    }

    render() {
        const { images } = this.state
        let img1 = images[1].url || ''
        let img2 = images[2].url || ''
        let img3 = images[3].url || ''
        
        return (<main className="site-main">
        <div className="container">
          <div className="block-gird-item">
          {this.renderErrors()}
            {this.renderMessage()}
            <div className="toobar">
              <div className="title pull-left">
                이벤트
              </div>
              <select className="form-control _md pull-right">
                <option>이벤트 전체보기</option>
                <option>이벤트 전체보기</option>
              </select>
            </div>
            <div className="event-write">
              <div className="form-group">
                <label>제목</label>
                <div className="control">
                <input type="text" name="title" onChange={(e) => this.onChange({ name: e.target.name, value: e.target.value })} className="form-control" />
                </div>
              </div>
              <div className="form-group">
                <label>간략 내용</label>
                <div className="control">
                <input type="text" name="desc" onChange={(e) => this.onChange({ name: e.target.name, value: e.target.value })}  className="form-control" />
                </div>
              </div>
              <div className="form-group">
                <label>상세 내용</label>
                <div className="control">
                <textarea className="form-control" name="content" onChange={(e) => this.onChange({ name: e.target.name, value: e.target.value })} defaultValue={""} />
                </div>
              </div>
              <div className="form-group">
                <label>사진첨부</label>
                <div className="control">
                <div className="file"> <input style={{height:'90px',width:'90px',opacity:0,position:'absolute'}}  type="file" onChange={(e)=>this.thumbImages(e,1)} /> {img1}</div> 
              <div className="file"> <input style={{height:'90px',width:'90px',opacity:0,position:'absolute'}}  type="file" onChange={(e)=>this.thumbImages(e,2)} /> {img2}</div> 
               <div className="file"> <input style={{height:'90px',width:'90px',opacity:0,position:'absolute'}}  type="file" onChange={(e)=>this.thumbImages(e,3)} /> {img3}</div> 
                </div>
              </div>
              <div className="form-group">
                <label>마감일</label>
                <div className="control ">
                <Dates onChange={this.onChange} />
                </div>
              </div>
              <div className="actions">
              <button className="btn btn-white" onClick={this.handleClose} type="button">취소</button>
            <button className="btn btn-default" onClick={this.onSubmit} type="button">등록</button>
              </div>
            </div>
          </div>                                                          
        </div>
      </main>
        );
    }
}

export default EventAdd;