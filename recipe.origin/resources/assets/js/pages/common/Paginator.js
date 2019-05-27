import React from 'react'
import { Link } from "react-router"


const Paginator = (props) => {
    return (
        <div>
            <ul className="pagination">
                <li className="prev">
                {
                    props.prev_page_url !== 0 ?
                        (
                            <a href='#' aria-label="Previous" onClick={e => props.pageChange(props.prev_page_url)}
                               ><span aria-hidden="true">&lsaquo; 이전</span></a>
                        ) :
                        (
                            ('')
                        )
                }
                </li>
                <li className="list"><Link to="/event">목록</Link></li>
                <li className="next">
                {
                    props.next_page_url <= props.max ?
                        (
                            <a href="#" onClick={e => props.pageChange(props.next_page_url)}
                            aria-label="Next"><span aria-hidden="true">다음 &rsaquo;</span></a>
                        ) :
                        (
                            ('')
                        )
                }
                </li>
                <a href="#" aria-label="Previous">
							
						</a>
            </ul>
        </div>
    );
};

export default Paginator;