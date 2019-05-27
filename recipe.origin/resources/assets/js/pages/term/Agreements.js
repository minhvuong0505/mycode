import React, { Component } from 'react';
import { browserHistory } from 'react-router/lib';

class Agreements extends Component {
    constructor(props){
      super(props)

      this.state = {
          terms:[1,2,3],
      }
    }

    componentDidMount(){
        this.loadData()
    }

    loadData(){      
      axios.get('/api/v1/qna?filters=status=1,object_type=Agreement')
      .then((res)  => {
          this.setTerms(res.data)
      })
      .catch((err) => {
          console.log(err)
      })
   }

  setTerms(terms){
    this.setState({ terms: terms['result'] })
  }

  handleClose(){
    window.history.go(-1);
  }
  

  handleShow(id){
    $('.block-content').hide()
    $('#cl-'+id).show()
  }

  render() {
        const {terms} = this.state
        
        return (
            <main className="site-main">
            <div className="block-about">
              <div className="block-title mypage-heading">
                <a href="#" className="back" onClick={this.handleClose} />
                <span className="title">이용약관</span>
              </div>
              <ul className="bock-links">
                {terms.map((term,index) => {
                  return <li key={`term-${index}`}><a href="#" onClick={ e => this.handleShow(term.id)} >{index + 1}. {term.title} </a></li> 
                })}
                
                
              </ul>
              {terms.map((term, index) => {
                return <div key={`con-${index}`} className="block-content color-gray" style={{display:'none'}} id={`cl-${term.id}`}>
                <p>{term.content}</p>
              </div>
              })}
              
            </div>
          </main>
        );
    }
}

export default Agreements;