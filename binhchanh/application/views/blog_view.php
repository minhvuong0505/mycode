<?php $this->load->view('header_parts/header'); ?>

 <!-- ##### Breadcumb Area Start ##### -->
 <div class="breadcumb-area bg-img" style="background-image: url(/public/img/bg-img/bg-8.jpg);">
        <div class="container h-100">
            <div class="row h-100 align-items-center">
                <div class="col-12 col-md-6">
                    <div class="breadcumb-text">
                        <h5>What’s new</h5>
                        <h2>News</h2>
                        <p>Cras iaculis eleifend arcu, non cursus sem. Morbi viverra varius nisl, ac varius mauris interdum sit amet. Aenean ac fermentum neque.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- ##### Breadcumb Area End ##### -->

<div class="container">
            <div class="row">
                <div class="col-12 col-lg-8">
                    <div class="single-blog-area mb-100">
                        <div class="blog-thumbnail">
                            <img src="<?= $blog->pic_content; ?>" alt="">
                            <div class="post-date">
                                <a href="#"><?= $blog->created_date; ?></a>
                            </div>
                        </div>
                        <div class="blog-content">
                            <a href="#" class="blog-title"><?= $blog->title; ?></a>
                            <p><?= $blog->content; ?></p>
                            
                        </div>
                    </div>
                </div>
            </div>
</div>
<?php $this->load->view('header_parts/footer'); ?>