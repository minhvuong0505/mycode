<script
  src="https://code.jquery.com/jquery-1.12.4.min.js"
  integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
  crossorigin="anonymous"></script>
<script type="text/javascript">

        

            function receiveMessage(e){
            if (e.origin !== "http://store.bom.co.kr" && e.origin !== "http://m.store.bom.co.kr")
            return;
            
            $.ajax({
                url: '/api/v3/loginstore',
                data: {
                    accessToken : e.data['accessToken']   
                },
                success: function(res) {
                    localStorage.setItem('tokens',res['token']);
                    localStorage.setItem('users', JSON.stringify(res['user']));
                    console.log(res);
                },
                error: function(res) {
                    console.log(res);
                },
                type: "post"
            });
        }
        window.addEventListener('message', receiveMessage);
</script>
<a href= 'https://store.bom.co.kr/member/login.php'> login </a>