<?php 
defined('BASEPATH') OR exit('No direct script access allowed');
$this->load->view('header_parts/header');
?>   

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

    <!-- ##### Blog Area Start ##### -->
    <div class="blog-area section-padding-100">
        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-8">
                    <div class="faith-blog-posts">
                        <div class="row">
                        <?php foreach($blog_min as $k =>$v): ?>
                            <!-- Single Blog Area --> 
                            <div class="col-12 col-lg-4">
                                <div class="single-blog-area mb-100">
                                    <div class="blog-thumbnail">
                                        <img href="view/<?= $v['id'].'-'.$v['link'];?>" src="<?= $v['pic_content']; ?>" alt="">
                                        <div class="post-date">
                                            <a href="#"><?= $v['created_date']; ?></a>
                                        </div>
                                    </div>
                                    <div class="blog-content">
                                        <a href="view/<?= $v['id'].'-'. $v['link'];?>" class="blog-title"><?= $v['title']; ?></a>
                                        
                                        
                                    </div>
                                </div>
                            </div>
                            <?php endforeach;?>
                        </div>
                    </div>

                    <!-- Pagination Area -->
                    <div class="pagination-area">
                        <nav aria-label="Page navigation">
                            <ul class="pagination">
                                <li class="page-item"><a class="page-link" href="#">01</a></li>
                                <li class="page-item"><a class="page-link" href="#">02</a></li>
                                <li class="page-item"><a class="page-link" href="#">03</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div class="col-12 col-lg-4">
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
    </div>
    <!-- ##### Blog Area End ##### -->

 <?php $this->load->view('header_parts/footer'); ?>