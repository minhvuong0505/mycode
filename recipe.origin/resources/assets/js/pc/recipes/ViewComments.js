import React, { Component } from 'react';

class ViewComents extends Component {
    render() {
        return (
            <main className="site-main">
        <div className="block-top1">
          <div className="img">
            <img src="images/media/img1.jpg" alt="img" />
          </div>
          <a href="#" className="back" />
          <a href="#" className="close" />
          <a href="#" className="messenger" />
          <div className="title">
            <span>동영상</span>
          </div>
          <div className="pagination">2/5</div>
        </div>
        <div className="block-view2">
          <div className="img">
            <img src="images/media/img2.jpg" alt="img" />
          </div>
          <div className="content">
            <div className="title">
              <span>셰프</span>
              <strong>레시피봄</strong>
            </div>
            <div className="info">
              <span className="view">12654</span>
              <span className="wishlist">256</span>
            </div>
          </div>
        </div>
        <div className="block-view3">
          <h2 className="title">Easy-On-The-Stomach</h2>
          <div className="des">
            Turkey is high in zinc, B vitamins, phosphorus, tryptophan, se Turkey is high in zinc, B vitamins, phosphorus, tryptophan, se Turkey is high in zinc, B vitamins, phosphorus, tryptophan, se
          </div>
        </div>
        <div className="block-view4">
          <ul>
            <li>
              <div className="info">
                강아지
              </div>
            </li>
            <li>
              <div className="info">
                모질개선
              </div>
            </li>
            <li>
              <div className="info">
                <span className="icon"><img src="images/icon/icon1.png" alt="img" /></span>5
              </div>
            </li>
            <li>
              <div className="info">
                준비시간 15분
              </div>
            </li>
            <li>
              <div className="info">
                조리시간 40분
              </div>
            </li>
          </ul>
        </div>
        <div className="block-fix-bottom">
          <div className="block-view5">
            <span className="gird" />
            <div className="info">
              <span className="view">12654</span>
              <span className="wishlist">256</span>
              <span className="comment">12654</span>
            </div>
            <span className="share" />
          </div>
        </div>
      </main>
        );
    }
}

export default ViewComents;