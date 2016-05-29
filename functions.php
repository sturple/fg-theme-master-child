<?php
add_action( 'wp_enqueue_scripts', function(){
   wp_enqueue_script('fg-script',get_stylesheet_directory_uri() . '/assets/js/wp-theme-fg.js');
   wp_enqueue_style('theme',get_stylesheet_directory_uri().'/assets/css/style.css');    
}, 20);

?>