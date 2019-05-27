import React, { Component } from 'react';
import { browserHistory } from 'react-router/lib';

class About extends Component {
    handleClose(){
        window.history.go(-1);
    }
    render() {
        return (
            <main className="site-main">
                <div className="block-about">
                    <div className="block-title mypage-heading">
                        <a href="#" className="back" onClick={this.handleClose} />
                        <span className="title">레시피봄 소개</span>
                    </div>
                    <div className="block-content text-center">
                        <p><img src="./html/images/icon/about.png" alt="img" className="iconbout" /></p>
                        <p className="title">국내 최고의 반려동물 요리 전문 앱 “레시피봄”</p>
                        <p>레시피봄은 반려동물의 다양한 기능개선에 맞춘 맞춤 레시피를 제공 레시피봄은 반려동물의 다양한 기능개선에 맞춘 맞춤 레시피를 제공 레시피봄은 반려동물의 다양한 기능개선에 맞춘 맞춤 레시피를 제공</p>
                        <p>레시피봄은 반려동물의 다양한 기능개선에 맞춘 맞춤 레시피를 제공 레시피봄은 반려동물의 다양한 기능개선에 맞춘 맞춤 레시피를 제공 레시피봄은 반려동물의 다양한 기능개선에 맞춘 맞춤 레시피를 제공</p>
                        <p>레시피봄은 반려동물의 다양한 기능개선에 맞춘 맞춤 레시피를 제공 레시피봄은 반려동물의 다양한 기능개선에 맞춘 맞춤 레시피를 제공 레시피봄은 반려동물의 다양한 기능개선에 맞춘 맞춤 레시피를 제공</p>
                    </div>
                </div>
            </main>
        );
    }
}

export default About;