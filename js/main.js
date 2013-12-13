			var FrameHeightManager =
{
    FrameId: '',
    getCurrentHeight : function()
    {
          myHeight = 0;
          
          if( typeof( window.innerWidth ) == 'number' ) {
            myHeight = window.innerHeight;
          } else if( document.documentElement && document.documentElement.clientHeight ) {
            myHeight = document.documentElement.clientHeight;
          } else if( document.body && document.body.clientHeight ) {
            myHeight = document.body.clientHeight;
          }
          
          return myHeight;      
    },    
    publishHeight : function()
    {
        if (this.FrameId == '') return;
        if(typeof jQuery === "undefined") {
            var actualHeight = (document.body.scrollHeight > document.body.offsetHeight)?document.body.scrollHeight:document.body.offsetHeight;
            var currentHeight = this.getCurrentHeight();            
        } else {
            var actualHeight = jQuery("body").height();
            var currentHeight = jQuery(window).height();            
        }

        if(Math.abs(actualHeight - currentHeight) > 20)
        {
            pm({
              target: window.parent,
              type: this.FrameId, 
              data: {height:actualHeight, id:this.FrameId}
            });
        }       
    }   

};

pm.bind("register", function(data) {
    FrameHeightManager.FrameId = data.id;
    window.setInterval(function() {FrameHeightManager.publishHeight.call(FrameHeightManager)}, 300);
});

jQuery(document).ready(function($) {

	// Tabs
	$('.su-tabs-nav').delegate('span:not(.su-tabs-current)', 'click', function() {
		$(this).addClass('su-tabs-current').siblings().removeClass('su-tabs-current')
		.parents('.su-tabs').find('.su-tabs-pane').hide().eq($(this).index()).show();
	});
	$('.su-tabs-pane').hide();
	$('.su-tabs-nav span:first-child').addClass('su-tabs-current');
	$('.su-tabs-panes .su-tabs-pane:first-child').show();

	// Tables
	$('.su-table tr:even').addClass('su-even');

});
