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
<div class='title col-lg-9'>
    <a href="#" ><?= $blog->title; ?></a>
</div>
<div class="post-date">
    <a href="#"><?= $blog->created_date; ?></a>
</div>
            <div class="row">
                <div class="col-12 col-lg-9">
                    <div class="single-blog-area mb-100">
                        <div class="blog-banner">
                            <img src="<?= $blog->pic_content; ?>" alt="">
                            
                        </div>
                        <div class="blog-content">
                            
                            <p><?= $blog->content; ?></p>
                            
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-3">
                    <div class="faith-blog-sidebar-area">

                        <!-- Widget -->
                        <div class="blog-widget-area">
                            <h5>Archives</h5>
                            <ul>
                                <li><a href="#">November 2017</a></li>
                                <li><a href="#">December 2017</a></li>
                                <li><a href="#">January 2018</a></li>
                                <li><a href="#">February 2018</a></li>
                                <li><a href="#">March 2018</a></li>
                                <li><a href="#">April 2018</a></li>
                            </ul>
                        </div>

                        <!-- Widget -->
                        <div class="blog-widget-area">
                            <h5>Categories</h5>
                            <ul>
                                <li><a href="#">Uncategorized</a></li>
                                <li><a href="#">Holy Bible</a></li>
                                <li><a href="#">Sermons</a></li>
                                <li><a href="#">About the Church</a></li>
                                <li><a href="#">Ministries</a></li>
                            </ul>
                        </div>

                        <!-- Widget -->
                        <div class="blog-widget-area">
                            <h5>Latest Posts</h5>
                            
                            <!-- Single Latest Blog Post -->
                            <div class="single-latest-blog-post d-flex mb-30">
                                <div class="latest-blog-post-thumb">
                                    <img src="/public/img/bg-img/ser1.jpg" alt="">
                                </div>
                                <div class="latest-blog-post-content">
                                    <a href="#" class="post-title">Bible studies for kids</a>
                                    <a href="#" class="post-date">April 04, 2018</a>
                                </div>
                            </div>
                            
                            <!-- Single Latest Blog Post -->
                            <div class="single-latest-blog-post d-flex mb-30">
                                <div class="latest-blog-post-thumb">
                                    <img src="/public/img/bg-img/ser2.jpg" alt="">
                                </div>
                                <div class="latest-blog-post-content">
                                    <a href="#" class="post-title">How to teach our childrens</a>
                                    <a href="#" class="post-date">April 04, 2018</a>
                                </div>
                            </div>
                            
                            <!-- Single Latest Blog Post -->
                            <div class="single-latest-blog-post d-flex mb-30">
                                <div class="latest-blog-post-thumb">
                                    <img src="/public/img/bg-img/ser3.jpg" alt="">
                                </div>
                                <div class="latest-blog-post-content">
                                    <a href="#" class="post-title">Learn the 10 commands</a>
                                    <a href="#" class="post-date">April 04, 2018</a>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
           
</div>
<?php $this->load->view('header_parts/footer'); ?>