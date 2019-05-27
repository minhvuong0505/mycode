import React, { Component } from 'react';

class Difficult extends Component {
    constructor(props) {
        super(props)

        this.state = {
            diff:{
                70:['<img src="./html/images/icon/icon2.png" alt="img" />'],
                71:['<img src="./html/images/icon/icon2.png" alt="img" />',
                '<img src="./html/images/icon/icon2.png" alt="img" />'],
                72:[
                    '<img src="./html/images/icon/icon2.png" alt="img" />',
                    '<img src="./html/images/icon/icon2.png" alt="img" />',
                    '<img src="./html/images/icon/icon2.png" alt="img" />'
                ],
                73:[
                    '<img src="./html/images/icon/icon2.png" alt="img" />',
                    '<img src="./html/images/icon/icon2.png" alt="img" />',
                    '<img src="./html/images/icon/icon2.png" alt="img" />',
                    '<img src="./html/images/icon/icon2.png" alt="img" />'   
                ],
                74:[
                    '<img src="./html/images/icon/icon2.png" alt="img" />',
                    '<img src="./html/images/icon/icon2.png" alt="img" />',
                    '<img src="./html/images/icon/icon2.png" alt="img" />',
                    '<img src="./html/images/icon/icon2.png" alt="img" />',
                    '<img src="./html/images/icon/icon2.png" alt="img" />'
                ]
            }
        }

    }


    render() {
        const { diff } = this.state
        return (
            
                <span>
                    {diff[this.props.diff].map((img,index) => {
                        return <img key={`img-${index}`} src="/html/images/icon/icon2.png" alt="img" />
                    })} 
                </span>            
            
        );
    }
}

export default Difficult;