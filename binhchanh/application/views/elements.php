<?php 
defined('BASEPATH') OR exit('No direct script access allowed');
$this->load->view('header');
?>
    <!-- ##### Breadcumb Area Start ##### -->
    <div class="breadcumb-area bg-img" style="background-image: url(img/bg-img/bg-3.jpg);">
        <div class="container h-100">
            <div class="row h-100 align-items-center">
                <div class="col-12 col-md-6">
                    <div class="breadcumb-text">
                        <h5>All you need</h5>
                        <h2>Elements</h2>
                        <p>Cras iaculis eleifend arcu, non cursus sem. Morbi viverra varius nisl, ac varius mauris interdum sit amet. Aenean ac fermentum neque.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- ##### Breadcumb Area End ##### -->

    <!-- ##### Elements Area Start ##### -->
    <section class="elements-area mt-50 section-padding-100-0">
        <div class="container">
            <div class="row">

                <!-- ##### Buttons ##### -->
                <div class="col-12">
                    <div class="elements-title">
                        <h2>Buttons</h2>
                    </div>
                    <!-- Buttons -->
                    <div class="faith-buttons-area mb-100">
                        <a href="#" class="btn faith-btn m-1">Send</a>
                        <a href="#" class="btn faith-btn active m-1">Send</a>
                        <a href="#" class="btn faith-btn btn-2 m-1">Send</a>
                        <a href="#" class="btn faith-btn btn-3 m-1">Send</a>
                    </div>
                </div>

                <!-- ##### Progress Bars & Accordions ##### -->
                <div class="col-12">
                    <div class="elements-title">
                        <h2>Accordians &amp; Tabs</h2>
                    </div>
                </div>

                <!-- ##### Accordians ##### -->
                <div class="col-12 col-lg-6">
                    <div class="accordions mb-100" id="accordion" role="tablist" aria-multiselectable="true">

                        <!-- Single Accordian Area -->
                        <div class="panel single-accordion">
                            <h6><a role="button" class="" aria-expanded="true" aria-controls="collapseOne" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">Donec ipsum metus, pharetr a quis nunc sit amet, maximus.
                                    <span class="accor-open"><i class="fa fa-plus" aria-hidden="true"></i></span>
                                    <span class="accor-close"><i class="fa fa-minus" aria-hidden="true"></i></span>
                                    </a></h6>
                            <div id="collapseOne" class="accordion-content collapse show">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lectus eu felis semper finibus ac eget ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vulputate id justo quis facilisis.</p>
                            </div>
                        </div>

                        <!-- Single Accordian Area -->
                        <div class="panel single-accordion">
                            <h6>
                                <a role="button" class="collapsed" aria-expanded="true" aria-controls="collapseTwo" data-parent="#accordion" data-toggle="collapse" href="#collapseTwo">Maximus vehicula nibh. Prae sent pulvinar porta.
                                        <span class="accor-open"><i class="fa fa-plus" aria-hidden="true"></i></span>
                                        <span class="accor-close"><i class="fa fa-minus" aria-hidden="true"></i></span>
                                        </a>
                            </h6>
                            <div id="collapseTwo" class="accordion-content collapse">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lectus eu felis semper finibus ac eget ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vulputate id justo quis facilisis.</p>
                            </div>
                        </div>

                        <!-- Single Accordian Area -->
                        <div class="panel single-accordion">
                            <h6>
                                <a role="button" aria-expanded="true" aria-controls="collapseThree" class="collapsed" data-parent="#accordion" data-toggle="collapse" href="#collapseThree">Pharetr a quis nunc sit amet, maximus vehicula nibh.
                                        <span class="accor-open"><i class="fa fa-plus" aria-hidden="true"></i></span>
                                        <span class="accor-close"><i class="fa fa-minus" aria-hidden="true"></i></span>
                                    </a>
                            </h6>
                            <div id="collapseThree" class="accordion-content collapse">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lectus eu felis semper finibus ac eget ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vulputate id justo quis facilisis.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ##### Tabs ##### -->
                <div class="col-12 col-lg-6">
                    <div class="faith-tabs-content">
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link" id="tab--1" data-toggle="tab" href="#tab1" role="tab" aria-controls="tab1" aria-selected="false">Morbi vel arcu</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" id="tab--2" data-toggle="tab" href="#tab2" role="tab" aria-controls="tab2" aria-selected="false">Sed faucibus</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="tab--3" data-toggle="tab" href="#tab3" role="tab" aria-controls="tab3" aria-selected="true">Sed faucibus mau</a>
                            </li>
                        </ul>

                        <div class="tab-content mb-100" id="myTabContent">
                            <div class="tab-pane fade" id="tab1" role="tabpanel" aria-labelledby="tab--1">
                                <div class="faith-tab-content">
                                    <!-- Tab Text -->
                                    <div class="faith-tab-text d-flex">
                                        <div class="tab-thumb">
                                            <img src="img/bg-img/bg-1.jpg" alt="">
                                        </div>
                                        <p>Integer nec bibendum lacus. Praesent malesuada congue, Suspendisse dictum enim sit amet libero malesu ada feugiat. Praesent malesuada congue magna at finibus.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade show active" id="tab2" role="tabpanel" aria-labelledby="tab--2">
                                <div class="faith-tab-content">
                                    <!-- Tab Text -->
                                    <div class="faith-tab-text d-flex">
                                        <div class="tab-thumb">
                                            <img src="img/bg-img/bg-2.jpg" alt="">
                                        </div>
                                        <p>Integer nec bibendum lacus. Praesent malesuada congue, Suspendisse dictum enim sit amet libero malesu ada feugiat. Praesent malesuada congue magna at finibus.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="tab--3">
                                <div class="faith-tab-content">
                                    <!-- Tab Text -->
                                    <div class="faith-tab-text d-flex">
                                        <div class="tab-thumb">
                                            <img src="img/bg-img/bg-3.jpg" alt="">
                                        </div>
                                        <p>Integer nec bibendum lacus. Praesent malesuada congue, Suspendisse dictum enim sit amet libero malesu ada feugiat. Praesent malesuada congue magna at finibus.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ##### Milestones ##### -->
                <div class="col-12">
                    <div class="elements-title">
                        <h2>Milestone</h2>
                    </div>
                </div>

                <div class="col-12">
                    <div class="faith-cool-facts-area">
                        <div class="row">

                            <!-- Single Cool Fact -->
                            <div class="col-12 col-sm-6 col-md-3">
                                <div class="single-cool-fact text-center mb-100">
                                    <h3><span class="counter">1265</span></h3>
                                    <h6>Community members</h6>
                                </div>
                            </div>

                            <!-- Single Cool Fact -->
                            <div class="col-12 col-sm-6 col-md-3">
                                <div class="single-cool-fact text-center mb-100">
                                    <h3><span class="counter">7</span></h3>
                                    <h6>Priests</h6>
                                </div>
                            </div>

                            <!-- Single Cool Fact -->
                            <div class="col-12 col-sm-6 col-md-3">
                                <div class="single-cool-fact text-center mb-100">
                                    <h3><span class="counter">281</span></h3>
                                    <div class="line"></div>
                                    <h6>Sermons held</h6>
                                </div>
                            </div>

                            <!-- Single Cool Fact -->
                            <div class="col-12 col-sm-6 col-md-3">
                                <div class="single-cool-fact text-center mb-100">
                                    <h3><span class="counter">35</span></h3>
                                    <div class="line"></div>
                                    <h6>Community ministies</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ##### Loaders ##### -->
                <div class="col-12">
                    <div class="elements-title">
                        <h2>Loaders</h2>
                    </div>
                </div>

                <div class="col-12">
                    <!-- Loaders Area Start -->
                    <div class="our-skills-area text-center">
                        <div class="row">
                            <div class="col-12 col-sm-6 col-md-3">
                                <div class="single-pie-bar mb-100" data-percent="90">
                                    <canvas class="bar-circle" width="70" height="70"></canvas>
                                    <h6>Hard Work</h6>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-md-3">
                                <div class="single-pie-bar mb-100" data-percent="75">
                                    <canvas class="bar-circle" width="70" height="70"></canvas>
                                    <h6>Helping</h6>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-md-3">
                                <div class="single-pie-bar mb-100" data-percent="59">
                                    <canvas class="bar-circle" width="70" height="70"></canvas>
                                    <h6>Donations</h6>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-md-3">
                                <div class="single-pie-bar mb-100" data-percent="100">
                                    <canvas class="bar-circle" width="70" height="70"></canvas>
                                    <h6>Real Faith</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ##### Icon Boxes ##### -->
                <div class="col-12">
                    <div class="elements-title">
                        <h2>Icon Boxes</h2>
                    </div>
                </div>

                <div class="col-12">
                    <div class="row">

                        <!-- Single Course Area -->
                        <div class="col-12 col-sm-6 col-lg-4">
                            <div class="single-feature-area mb-100">
                                <div class="title d-flex align-items-end">
                                    <img src="img/core-img/crown-of-thorns.png" alt="">
                                    <h3>Our Sermons</h3>
                                </div>
                                <p>Praesent malesuada congue magna at finibus. In hac habitasse platea dic tumst malesuada congue magna at finibus. In hac habitasse platea.</p>
                            </div>
                        </div>

                        <!-- Single Course Area -->
                        <div class="col-12 col-sm-6 col-lg-4">
                            <div class="single-feature-area mb-100">
                                <div class="title d-flex align-items-end">
                                    <img src="img/core-img/bible.png" alt="">
                                    <h3>Our Bible studies</h3>
                                </div>
                                <p>Praesent malesuada congue magna at finibus. In hac habitasse platea dic tumst malesuada congue magna at finibus. In hac habitasse platea.</p>
                            </div>
                        </div>

                        <!-- Single Course Area -->
                        <div class="col-12 col-sm-6 col-lg-4">
                            <div class="single-feature-area mb-100">
                                <div class="title d-flex align-items-end">
                                    <img src="img/core-img/cross-2.png" alt="">
                                    <h3>Our Ministries</h3>
                                </div>
                                <p>Praesent malesuada congue magna at finibus. In hac habitasse platea dic tumst malesuada congue magna at finibus. In hac habitasse platea.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- ***** Elements Area End ***** -->

    <!-- ##### Footer Area Start ##### -->
    <footer class="footer-area">
        <!-- Main Footer Area -->
        <div class="main-footer-area section-padding-100-0 bg-img foo-bg-overlay" style="background-image: url(img/bg-img/bg-1.jpg);">
            <div class="container">
                <div class="row">

                    <!-- Footer Widget Area -->
                    <div class="col-12 col-sm-6 col-xl-3">
                        <div class="d-flex flex-wrap mb-100">
                            <div class="footer-widget">
                                <div class="widget-title">
                                    <a href="#"><img src="img/core-img/logo2.png" alt=""></a>
                                </div>
                                <div class="footer-social-info">
                                    <a href="#"><i class="fa fa-google-plus"></i></a>
                                    <a href="#"><i class="fa fa-pinterest"></i></a>
                                    <a href="#"><i class="fa fa-facebook"></i></a>
                                    <a href="#"><i class="fa fa-twitter"></i></a>
                                </div>
                            </div>
                            <div class="copywrite-text">
                                <p><!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
<!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --></p>
                            </div>
                        </div>
                    </div>

                    <!-- Footer Widget Area -->
                    <div class="col-12 col-sm-6 col-xl-3">
                        <div class="footer-widget mb-100">
                            <div class="widget-title">
                                <h6>Contact Us</h6>
                            </div>

                            <!-- Single Contact Area -->
                            <div class="single-contact-area mb-30">
                                <p>Address:</p>
                                <span>1481 Creekside Lane Avila <br>Beach, CA 93424 </span>
                            </div>

                            <!-- Single Contact Area -->
                            <div class="single-contact-area mb-30">
                                <p>Phone:</p>
                                <span>+53 345 7953 32453 <br>+53 345 7557 822112</span>
                            </div>

                            <!-- Single Contact Area -->
                            <div class="single-contact-area mb-30">
                                <p>Email:</p>
                                <span>yourmail@gmail.com</span>
                            </div>
                        </div>
                    </div>

                    <!-- Footer Widget Area -->
                    <div class="col-12 col-sm-6 col-xl-3">
                        <div class="footer-widget mb-100">
                            <div class="widget-title">
                                <h6>Usefull Links</h6>
                            </div>
                            <nav>
                                <ul class="useful-links">
                                    <li><a href="#">Home</a></li>
                                    <li><a href="#">About Us</a></li>
                                    <li><a href="#">Sermons</a></li>
                                    <li><a href="#">Ministries</a></li>
                                    <li><a href="#">Causes</a></li>
                                    <li><a href="#">Testimonials</a></li>
                                    <li><a href="#">Quotes</a></li>
                                    <li><a href="#">News</a></li>
                                    <li><a href="#">Contact</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <!-- Footer Widget Area -->
                    <div class="col-12 col-sm-6 col-xl-3">
                        <div class="footer-widget mb-100">
                            <div class="widget-title">
                                <h6>Why Choose us?</h6>
                            </div>
                            <p>Fusce nec ante vitae lacus aliquet vulputate. Donec scelerisque accumsan molestie. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Cras sed accumsan neque.</p>
                            <a href="#" class="btn faith-btn mt-70">Sunday Workship: 10:30 AM</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <!-- ##### Footer Area Start ##### -->

    <!-- ##### All Javascript Script ##### -->
    <!-- jQuery-2.2.4 js -->
    <script src="js/jquery/jquery-2.2.4.min.js"></script>
    <!-- Popper js -->
    <script src="js/bootstrap/popper.min.js"></script>
    <!-- Bootstrap js -->
    <script src="js/bootstrap/bootstrap.min.js"></script>
    <!-- All Plugins js -->
    <script src="js/plugins/plugins.js"></script>
    <script src="js/plugins/audioplayer.js"></script>
    <!-- Active js -->
    <script src="js/active.js"></script>
</body>

</html>