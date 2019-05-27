<?php $this->load->view('header_parts/header'); ?>
<script src="/public/js/jquery/jquery-2.2.4.min.js"></script>
<div class="container">
<div class='title col-lg-9'>
    <input type='text' placeholder='Đặt tiêu đề'>
</div>
<div class="post-date">
    <input type='text' value='<?=date('Y/m/d H:i:s')?>'>
</div>
            <div class="row">
                <div class="col-12 col-lg-9">
                    <div class="single-blog-area mb-100">
                        <div class="blog-banner">
                           
                            
                        </div>
                        <div class="blog-content">
                          
                                
                                <textarea style="width:100%" line='1' name ='row-1' onkeyup="newLine(event)" ></textarea>
                                <div class='tools'>
                                    <a onclick="deleteRow(1)" line = '1' href='#'>X</a>
                                    <a onclick="addImg(1)" line = '1' href='#'>X</a>
                                </div>
                                

                        </div>
                    </div>
                </div>
                
            </div>
           
</div>
<script>
    function newLine(event)
    {
        if(event.which==13){
                var numLine = ($('.blog-content textarea').last().attr('line') * 1) + 1;
                var newLine = '<textarea style="width:100%" line="'+numLine+'"name="row-'+numLine+'" onkeyup="newLine(event)"></textarea> <a href="#" line = "'+numLine+'" onclick="deleteRow('+numLine+')" >X</a>';
                $('.blog-content').append(newLine);
                $('textarea[line='+numLine+']').focus();
            }
    }

    function deleteRow(row)
    {
        if (row == 1 &&  $('.blog-content a[line=2]').length == 0) return false;
        var numLine = row;
        $('.blog-content textarea[line='+numLine+']').remove();
        $('.blog-content a[line='+numLine+']').remove();

        $('.blog-content textarea').each(function(){ 
            if($(this).attr('line') > numLine)
            {
                line = $(this).attr('line')*1 - 1;
                $(this).attr('line',line);
                $(this).attr('name','row-'+line);
                $('.blog-content a[line='+(line+1)+']').attr('onclick','deleteRow('+line+')');
                $('.blog-content a[line='+(line+1)+']').attr('line',line);
            }
            
        })
    }
    function addImg()
    {

    }

    function showTool()
    {

    }

    $('textarea').focus(function(){
        $(this).css('background-color','red');
    })
    

    
</script>
<?php $this->load->view('header_parts/footer'); ?>