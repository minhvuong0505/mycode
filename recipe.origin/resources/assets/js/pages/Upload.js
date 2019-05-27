import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';
import axios, { post } from 'axios';
const style = {
        width: '20vw',
        height: '10vw',
        opacity: 0,
        overflow: 'hidden',
        position: 'absolute',
        left:'0px'
}
class ImageUpload extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        file: '',
        imagePreviewUrl: {},
        number:1, 
        todos:[1],
        type:'img'
      };

      this.handleDel = this.handleDel.bind(this);
      this.handleAdd = this.handleAdd.bind(this);
      this.update = this.update.bind(this);
      this.deleteImage = this.deleteImage.bind(this)
    }
  
    _handleSubmit(e) {
      e.preventDefault();
      // TODO: do something with -> this.state.file
      console.log('handle uploading-', this.state.file);
    }

    getExtension(filename) {
      var parts = filename.split('.');
      return parts[parts.length - 1];
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

    isVideo(filename) {
        var ext = this.getExtension(filename);
        switch (ext.toLowerCase()) {
        case 'm4v':
        case 'avi':
        case 'mpg':
        case 'mp4':
        case '3gpp':
            // etc
            return true;
        }
        return false;
    }
  
    _handleImageChange(e, index) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
      
      const {type} = this.state  
      if(this.isVideo(file.name)){          
          this.setState({type: 'video'})
      }else{
          this.setState({type: 'img'})
      }

      reader.onloadend = (e) => {
        const {imagePreviewUrl} = this.state
        
        if(this.state.type == 'video'){ 
          imagePreviewUrl[index-1] = e.target.result
          imagePreviewUrl['type'] = 'video'
        }
        else{
          imagePreviewUrl[index-1] = reader.result
          imagePreviewUrl['type'] = 'img'
        }
          
        this.setState({
          file: file,
          imagePreviewUrl:imagePreviewUrl
        }); 
        
        // var data = {'file': reader.result };
        // $.ajax({
        //     type: 'POST',
        //     url: '/api/v2/fileupload',
        //     data: data,
        //     success: function(response) {
                
        //     },
        //     error: function(response) {
                
        //     },
        // });
      }

      reader.readAsDataURL(file)   
      console.log(this.state.imagePreviewUrl);   

    }

    deleteImage(index){
      const { imagePreviewUrl } = this.state;
      delete imagePreviewUrl[index-1]
      this.setState({imagePreviewUrl:imagePreviewUrl})
    }

    handleAdd(){
      let number = this.state.number + 1;
      if(number > 5) return false
      
      const {todos} = this.state
      todos.push(number)

      this.setState({todos})
      this.setState({number})        
  }

  handleDel(){
      const {todos} = this.state
      let number = this.state.number

      let i = todos.indexOf(number);
      if(i != -1 && i != 1){
          todos.splice(i, 1);
          number = this.state.number - 1
      }

      this.setState({todos})
      this.setState({number})  
  }

  renderDefault(index){
      const {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      
      if (imagePreviewUrl[index - 1] && imagePreviewUrl['type'] == 'video') {
        $imagePreview = ( <video controls>
          <source type="video/webm" src="data:video/webm;base64,GkXfowEAAAAAAAAfQoaBAUL3gQFC8......jVOrhB9DtnVTrIMQTPc=" />
          <source type="video/mp4" src="data:video/mp4;base64,AAAAHGZ0eXBtcDQyAAAAAG1wNDJpc29....../l/L+X8v5AAAAMgfDg==" />
        </video>)
        
      }else if(imagePreviewUrl[index - 1] && imagePreviewUrl['type'] == 'img'){
        $imagePreview = (<img style={{'height':'23vw', 'width':'24vw'}} src={imagePreviewUrl[index - 1]} />);
      }else {
        $imagePreview = '';
      }
      return  <div key={`todo-${index}`} className="steps">
      <div className="step-title">STEP {index}</div>
      <div className="step-content">
      <div className="action-photo">
          <a href="#" className="action camera" />
          <a href="#" style={{position:'relative'}} className="action images" >    <input className="action images" 
                  type="file"
                  style={style} 
                  id={`ip-${index}`}
                  onChange={(e)=>this._handleImageChange(e,index)} />                
                  </a>
          <a href="#" className="action video" />
      </div>
      <div className="add-photo">
          <div className="photo">
          <div className="img `todo-${index}`" style={{'height':'23vw'}}>
              {$imagePreview}
          </div>
          <button className="btn btn-outline" onClick={(e) => this.deleteImage(index)} type="button">사진 삭제</button>
          </div>
          <div className="recipe">
          <textarea className="form-control" name="content" onChange={ (e) => this.update(this.props.onChange.bind(this))} placeholder="레시피를 입력해주세요" />
          </div>
      </div>
      
      </div>
  </div>
  }

    update(e){
      const { content } = this.props
      this.props.onChange(e.target.name, e.target.value)
    }
  
    render() {
      const {todos} = this.state
      return <div>
        {todos.map((todo, index) => {
            return this.renderDefault(todo)
        })}
        <div className="actions-add">
          <button className="btn btn-default" type="button" onClick={this.handleAdd}>+ 순서 추가</button>
      </div>
      </div>
    }
  }
    
  export default ImageUpload;