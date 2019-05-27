import React, { Component } from 'react';
import CsCenterPageHeader from './CsCenterPageHeader';

class AnounceWrite extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            qna:{
                title:'',
                content:'',
                images:{},
                object_type: 'Announce'
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
    }


    onChange({name, value}){
      const {qna} = this.state
      qna[name] = value
      this.setState({ qna })
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
        const { qna } = this.state;

        if(!qna['subject']){
            alert('제목 정보 입력해주세요')
            return false
        }

        if(!qna['title']){
            alert('상세 내용 정보 입력해주세요')
            return false
        }

        if(!qna['images']){
            alert('사진첨부 내용 내용 정보 입력해주세요')
            return false
        }

        const con = confirm(' 등록하시겠습니까?')
            if(con !== true) return false
        
        //request new token
        refreshToken()
        axios.post('/api/v3/qna', JSON.stringify(qna), {headers:{
            'Authorization': `Bearer ${TOKENS}`
        }})
            .then(res => {
                if (res.status === 201) {
                    
                    this.setState({ message: '성공적으로 생성됨' })
                    window.location.href = "/qna"
                } else {
                    return res;
                }
            })
            .catch(err => {
                if(err.response.status == 401){
                    alert('다시 로그인해야합니다.')
                    window.location.href = '/logout'
                }

                if (err.response) {
                    const errors = err.response.data
                    this.setState({ errors, hasError: true })
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


        const { qna } = this.state  
        const { images } = this.state     

        reader.onloadend = (e) => {            
            images[index]['url'] = ( <div style={{backgroundImage: `url(${reader.result})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", display: "block", width: "90px", height: "90px"}}></div>)
            this.setState({ images })

            var data = {'file': reader.result };
            $.ajax({
                type: 'POST',
                url: '/api/v2/fileupload',
                data: data,
                success: function(response) {
                    if(response){
                        if(qna['images'][index] != undefined){
                            qna['images'][index]['images'] = 'tmp/'+response.file
                        }else{
                            qna['images'][index] = {}
                            qna['images'][index]['images'] = 'tmp/'+response.file
                        }                        
                    }            
                       
                },
                error: function(response) {
                    
                },
            });
        }

        this.setState({ qna })        
        reader.readAsDataURL(file)   
    }

    handleCLose(){
        window.history.back()
    }

    render() {
        const { images } = this.state;
        let img1 = images[1].url || '';
        let img2 = images[2].url || '';
        let img3 = images[3].url || '';
        return (
            <main className="site-main">
                <div className="container">
                    <CsCenterPageHeader />
                    <div className="block-gird-item">
                        <div className="toobar">
                            <strong className="title pull-left">1:1 상담 <span>고객센터 운영시간 : 오전 9시 ~ 오후 6시 (토/일/공휴일 제외)</span></strong>
                        </div>
                        {this.renderErrors()}
                        {this.renderMessage()}
                        <div className="event-write">
                            <div className="form-group">
                                <label>제목</label>
                                <div className="control">
                                    <input name="subject" onChange={(e) => this.onChange({ name: e.target.name, value: e.target.value })} className="form-control" type="text" />
                                    <input type="hidden" name="object_type" value="Anounce" onChange={(e) => this.onChange({ name: e.target.name, value: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>상세 내용</label>
                                <div className="control">
                                    <textarea className="form-control" name="title" onChange={(e) => this.onChange({ name: e.target.name, value: e.target.value })} defaultValue={""} />
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
                            <div className="actions">
                                <button className="btn btn-white" onClick={this.handleCLose} type="button">취소</button>
                                <button className="btn btn-default" onClick={this.onSubmit} type="button">등록</button>
                            </div>
                        </div>
                    </div>                                                              
                </div>
            </main>
        );
    }
}

export default AnounceWrite;