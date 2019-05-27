import React, { Component } from 'react';

export function LoginRequest(data) {
    axios.post('/api/v3/authenticate_social', data)
    .then(res => {
        if (res.status === 200 || res.status === 201) {
            //set info to stograte
            localStorage.setItem('tokens', res.data['token']); 
            localStorage.setItem('users', JSON.stringify(res.data['user']));
            alert('로그인에 성공했습니다.');

            window.location.href = "/";
        } else {
            console.log(res.message);
            alert("다시 로그인해야합니다!");
            return res;
        }
    }).catch(err => {
        if (err.response.status === 401) {
            console.log(err.response.data.message);
            alert("다시 로그인해야합니다!");
            const errors = err.data
            this.setState({ errors, hasError: true })
        }
    });
}

export function getDateTime() {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
         month = '0'+month;
    }
    if(day.toString().length == 1) {
         day = '0'+day;
    }   
    if(hour.toString().length == 1) {
         hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
         minute = '0'+minute;
    }
    if(second.toString().length == 1) {
         second = '0'+second;
    }   
    var dateTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;   
     return dateTime;
}

export function mydiff(date1,date2,interval) {
    var second=1000, minute=second*60, hour=minute*60, day=hour*24, week=day*7;
    date1 = new Date(date1);
    date2 = new Date(date2);
    var timediff = date2 - date1;
    if (isNaN(timediff)) return NaN;
    switch (interval) {
        case "years": return date2.getFullYear() - date1.getFullYear();
        case "months": return (
            ( date2.getFullYear() * 12 + date2.getMonth() )
            -
            ( date1.getFullYear() * 12 + date1.getMonth() )
        );
        case "weeks"  : return Math.floor(timediff / week);
        case "days"   : return Math.floor(timediff / day); 
        case "hours"  : return Math.floor(timediff / hour); 
        case "minutes": return Math.floor(timediff / minute);
        case "seconds": return Math.floor(timediff / second);
        default: return undefined;
    }
}

export function secondsToDhms(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 3600 % 60);
    
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

export function time_result(date1, date2){

    let msec = Math.round(mydiff(date1, date2, 'seconds'));

    let mins = Math.floor(msec / 60000);
    let hrs = Math.floor(mins / 60);
    let days = Math.floor(hrs / 24);
    let yrs = Math.floor(days / 365);
   
    mins =  mins + "분전";
    mins = mins % 60;
    hrs = hrs + "시간 " + mins + "분전";
    hrs = hrs % 24;
    days =  days + "날짜" + hrs + " 시간 " + mins + "분전";
    days=days%365;
    //append(dl,"In years: ",yrs + " years " + days + " days ");

    // let years = year > 0 ? year + ("년") : "";
    // let months = month > 0 ? month + ("달") : "";
    // let weeks = week > 0 ? week + ("주") : "";
    // let dates = d > 0 ? d + ("날짜") : "";
    // let hourss = h > 0 ? h + ("시간") : "";
    // let minss = m > 0 ? m + ("분전") : "";
    // let seconds = s > 0 ? s + ("초") : "";
    // console.log(date1,date2,months);
    return days + hrs + mins;
}

export function isImage(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
    case 'jpg':
    case 'gif':
    case 'bmp':
    case 'png':
    case 'jpeg':
        //etc
        return true;
    }
    return false;
}

export function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
}