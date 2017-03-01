<?php
add_action( 'wp_enqueue_scripts', function(){
   wp_enqueue_script('fg-script',get_stylesheet_directory_uri() . '/assets/js/wp-theme-fg.js');
   wp_enqueue_style('theme',get_stylesheet_directory_uri().'/assets/css/style.css');    
}, 20);

add_filter('the_content',function($content){
	// don't want this annoying p tag wrap and br tag. except for blog posts.
	if ((get_post_type() === 'page') and ( in_array( get_the_ID(), array(2) )) ){		
		remove_filter( 'the_content', 'wpautop' );
	}
	return $content;
},2);

?>