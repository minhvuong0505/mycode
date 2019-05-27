import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Difficult from '../recipes/Difficult';
import { Link } from 'react-router/lib';

class NewRecipes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: [],
            cooking_time:[]
        }

    }

   componentDidMount() {
         axios.get('/api/v1/post?page_id=0&page_size=5&sorts=-id&filters=status=1')
            .then((res)  => {
                this.setRecipes(res.data.result)
            })
            .catch((err) => {
                // console.log(err)
            })

            axios.get('/api/v1/options?filters=parent_id=51')
          .then((res)  => {
              this.setOptions1(res.data)
          })
          .catch((err) => {
              // console.log(err)
          })
    }

    setOptions1(cooking_time) {   
        let i = 0
        const new_options = {}
  
        for(i = 0; i < cooking_time['result'].length; i++){
          new_options[cooking_time['result'][i]['id']] = cooking_time['result'][i]['title']     
        }
        // console.log(new_options)
        this.setState({ cooking_time:new_options})      
      }

    setRecipes(recipes) {   
        this.setState({ recipes })        
    }

    render() {
        const { recipes } = this.state
        const { cooking_time } = this.state

        // console.log(recipes);
        if(recipes.length == 0) { 
            return (<div><p className="text-warning">No recipes</p></div>);
        }

        return (
            <div>
                {recipes.map((re,i) => {
                        let img = (<img src="https://freetalk.info/default/images/media/home-img1.jpg" />);
                        if(re.cooking_representation != undefined) {
                          var cooking_representation = $.parseJSON(re.cooking_representation);
                          if(cooking_representation[0] != undefined && cooking_representation[0]['images'] != undefined) {
                            img = (<img src={CDN_URL+`${cooking_representation[0]['images']}`} alt={re.title} />);
                          }
                        }

                        return (<div key={`recipe-${i}`} className="item item-recipes">
                            <div className="img">                            
                            <Link to={`recipe/${re.id}/detail`} style={{display:'block'}}>{img}</Link>
                            </div>
                            <div className="detail" style={{textAlign:'left'}}>
                                <strong className="title">
                                <Link to={`recipe/${re.id}/detail`}>{re.title}</Link>
                                </strong>
                                <div className="info">
                                    <p><label>조리시간</label><span>{cooking_time[re.cooking_time]}분</span></p>
                                    <div>
                                        <label>난이도</label>
                                        <Difficult diff={re.difficulty} />
                                    </div>
                                </div>               
                            </div>
                        </div>);
                    })}
            </div>
        );
    }
}

export default NewRecipes;