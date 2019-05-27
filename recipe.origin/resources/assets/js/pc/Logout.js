import React, { Component } from 'react';

class Logout extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            user:{}
        };
    }

    getUrlParameter(name) {
		name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
		var results = regex.exec(location.search);
		return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	}

    componentWillMount(){
        const { user } = this.state
        let redirect_url = this.getUrlParameter('redirect_url')
        refreshToken()
        //delete tokens
        axios.post('/api/v3/logout',{token:TOKENS})
        .then(res => {
            if (res.status === 200) {
                localStorage.removeItem('tokens')
                localStorage.removeItem('users')
                window.location.href = "/login?redirect_url="+redirect_url;
            } else {
                return res;
            }
        })
        .catch(err => {
            if (err.response.status === 401) {
                const errors = err.response.data
                
                this.setState({ errors, hasError: true })
            }

            if (err.response.status === 500) {
                localStorage.removeItem('tokens')
                localStorage.removeItem('users')
                window.location.href = "/login?redirect_url="+redirect_url;
            }
        })
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default Logout;