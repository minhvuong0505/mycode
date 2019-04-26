<?php 
defined('BASEPATH') OR exit('No direct script access allowed');
$this->load->view('header_parts/header');
?>
    <!-- ##### Breadcumb Area Start ##### -->
    <div class="breadcumb-area bg-img" style="background-image: url(img/bg-img/bg-7.jpg);">
        <div class="container h-100">
            <div class="row h-100 align-items-center">
                <div class="col-12 col-md-6">
                    <div class="breadcumb-text">
                        <h5>Say hello</h5>
                        <h2>Contact</h2>
                        <p>Cras iaculis eleifend arcu, non cursus sem. Morbi viverra varius nisl, ac varius mauris interdum sit amet. Aenean ac fermentum neque.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- ##### Breadcumb Area End ##### -->


    <!-- ##### Contact Area Start ##### -->
    <section class="contact-area">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="contact-info-area">
                        <div class="row">
                            <!-- Contact Information -->
                            <div class="col-12 col-lg-6">
                                <div class="contact-information">
                                    <h5>Contact us</h5>
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

                            <!-- Contact Form Area -->
                            <div class="col-12 col-lg-6">
                                <div class="contact-form-area">
                                    <h5>Send us a message</h5>
                                    <form action="#" method="post">
                                        <input type="text" class="form-control" id="name" placeholder="Name">
                                        <input type="email" class="form-control" id="email" placeholder="E-mail">
                                        <textarea name="message" class="form-control" id="message" cols="30" rows="10" placeholder="Message"></textarea>
                                        <button class="btn faith-btn" type="submit">Contact Us</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- ##### Contact Area End ##### -->

    <!-- ##### Google Maps ##### -->
    <div class="map-area">
        <div id="googleMap"></div>
    </div>
    <?php $this->load->view('header_parts/footer');?>