import React, { Component } from 'react';

class Material extends Component {
    constructor(props){
        super(props);

        this.state = {
            todos: [1],
            number: 1,
            index: ''
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleDel = this.handleDel.bind(this);
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
        if(i != -1){
            todos.splice(i, 1);
            number = this.state.number - 1
        }

        this.setState({todos})
        this.setState({number})  
    }

    renderDefault(index){
        return <div key={`todo-${index}`}>
            <div className="form-group">
                <label>재료 {index}</label>
                <div className="control">
                <input type="text" name="meterial[]" value={this.props.material} className="form-control" placeholder />
                </div>
            </div>
            <div className="form-group">
                <label>용량 {index}</label>
                <div className="control">
                <input type="text" name className="form-control" placeholder />
                </div>
            </div>
            <div className="form-group">
                <label>단위 {index}</label>
                <div className="control">
                <select className="form-control">
                    <option>g</option>
                    <option>g</option>
                </select>
                </div>
            </div>
            <hr />
        </div>
    }

    render() {
        return (
                <div className="box-group panel ">
                    <div className="panel-heading">
                        <a role="button" data-toggle="collapse" href="#collapse3" aria-expanded="false">
                            <span className="title">재료 정보</span> <span className="close">닫기</span>
                        </a>
                    </div>
                    <div className="panel-collapse collapse in" id="collapse3">
                    <div className="panel-body">
                        <div className="form-group text-right">
                        <button className="btn btn-outline" onClick={this.handleDel} type="button">삭제</button>
                        <button className="btn btn-default" onClick={this.handleAdd} type="button">추가입력</button>
                        </div>

                        {this.state.todos.map((todo, index) => {
                            return this.renderDefault(todo)
                        })}
                    </div>
                    </div>
                </div>
        );
    }
}

export default Material;