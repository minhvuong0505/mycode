<!DOCTYPE html>
<html>
<head>
    <title><?php echo e(config('app.name', 'RECIPES')); ?></title>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no">
    <meta name="gg:client_id" content="<?php echo e(env('GOOGLE_APP_CLIENT_ID')); ?>"/>
    <meta name="description" content="<?php echo e(config('app.name', 'RECIPES')); ?>"/>
    <meta name="keywords" content="<?php echo e(config('app.name', 'RECIPES')); ?>, dog, cat, ..."/>

    <link rel='shortcut icon' type="image/x-icon" href='/favicon.ico'>
    <link rel="stylesheet" type="text/css" href="<?php echo e(env('CDN_URL')); ?>/default/css/style.css?v=<?php echo e(rand(1000, 50000000)); ?>">
    <script>
        window.Laravel = <?php echo json_encode([
            'csrfToken' => csrf_token(),
        ]); ?>;

        var CDN_URL = '<?php echo env('CDN_URL'); ?>/uploads/';
        var TOKENS = localStorage.getItem('tokens');

        var PROFILES = '';
        if(localStorage.getItem('users') != undefined){
            PROFILES = JSON.parse(localStorage.getItem('users'));
        }

        var device_env = <?php echo DEVICE_ENV; ?>;
    </script>

    <script type="text/javascript">
        
        //setInterval(refreshToken, 3600000); // 1 hour 

         function refreshToken(){
            if(TOKENS){
                TOKENS = localStorage.getItem('tokens');
                $.ajax({
                    url : "/api/v3/token",
                    type : "get",
                    async: false,
                    data:{ 'token': ` ${TOKENS}` },
                    //beforeSend: function(xhr){xhr.setRequestHeader('token', ` ${TOKENS}`)},
                    success : function(data) {
                        console.log(data)
                        //register new tokens
                        localStorage.setItem('tokens',data.token)
                        localStorage.setItem('newTokens',data.token)

                        //make new token
                        TOKENS = localStorage.getItem('tokens');

                    },
                    error: function(data) {
                        alert(data.message); // or whatever
                    }
                });
            }
        }

    </script>

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-124581700-1"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){
        dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'UA-124581700-1');
    </script>
    
</head>
<body>

    <div id="app"></div>
    <!-- Scripts -->
    <script type="text/javascript" src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js" charset="utf-8"></script>
    <script src="<?php echo e(env('APP_URL')); ?>/js/app.js?v=<?php echo e(rand(1000, 50000000)); ?>"></script>
    
    <script>
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.1";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    </script>
    <script type="text/javascript" src="<?php echo e(env('CDN_URL')); ?>/default/js/jquery.min.js"></script>
    <script type="text/javascript" src="<?php echo e(env('CDN_URL')); ?>/default/js/owl.carousel.min.js"></script>
    <script type="text/javascript" src="<?php echo e(env('CDN_URL')); ?>/default/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="<?php echo e(env('CDN_URL')); ?>/default/js/jquery.fancybox.min.js"></script>
    <script type="text/javascript" src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
    <script type="text/javascript" src="https://apis.google.com/js/api:client.js"></script>
    <script type="text/javascript" src="<?php echo e(env('CDN_URL')); ?>/default/js/moment-with-locales.js"></script>
    <script type="text/javascript" src="<?php echo e(env('CDN_URL')); ?>/default/js/main.js"></script>
    <script tyle="text/javascript">
        gapi.load('auth2', function(){
            // Retrieve the singleton for the GoogleAuth library and set up the client.
            auth2 = gapi.auth2.init({
                client_id: $('meta[name="gg:client_id"]').attr('content'),
                cookiepolicy: 'single_host_origin',
                // Request scopes in addition to 'profile' and 'email'
                //scope: 'additional_scope'
            });
        });

        // Google tracking
        var observeTarget = document.getElementsByTagName('body')[0];
        var observeConfig = { attributes: true, childList: true, subtree: true };
        var callback = function(mutationsList, observer) {
            for(var mutation of mutationsList) {
                if (mutation.type == 'childList') {
                    // Reactjs onUpdate
                    ga('send', {
                        hitType: 'pageview',
                        page: location.pathname
                    });
                    // Check is login
                    if(location.pathname == "/login") 
                    {
                        // Check if is login page, init SVG Animation
                        if(typeof initSVGAnimation === "function") {
                            initSVGAnimation();
                        }
                    }
                }
            }
        };
        var observer = new MutationObserver(callback);
        observer.observe(observeTarget, observeConfig);
    </script>
</body>
</html>