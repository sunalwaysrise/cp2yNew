
define(["jquery"],function($){
    var head ={
	     init:function(){
		       $("#header #lotts .subcon").hover(
		      function(){
				  $(".ex").show();
				  $(".exsub").hide();
				  $(this).find(".ex").hide();
				  $(this).siblings(".exsub").show();
			  },
		      function(){
				  $(this).find(".ex").show();
				  $(this).siblings(".exsub").hide();
		  });
		  
		  $("#header #lotts .sub").hover(
		       function(){
				   $(this).find(".ex").hide();
				   $(this).find(".exsub").show();
			   },function(){
				   $(this).find(".ex").show();
				   $(this).find(".exsub").hide();
		   });
		  
		  $("#lotts").hover(
		       function(){
			        $("#lotts_con").show();
					$("#lotts_p").removeClass("up").addClass("down");
			   },
			   function(){
		            $("#lotts_con").hide();
					$("#lotts_p").removeClass("down").addClass("up");
		  });
		  
		  $("#banclose").on("click",function(){
		       $("#banner").hide();
			   $("#banopen").show();
		  });
		  $("#banopen").on("click",function(){
		       $("#banner").show();
			   $(this).hide();
		  });
		  
		  $("#nav li").hover(
		      function(){
			       $(this).find(".sub_nav").show();
			  },function(){
		           $(".sub_nav").hide();
		  });
		  $("#app").hover(
		       function(){
				   $("#appcon").show();
			   },
			   function(){
		           $("#appcon").hide();
		  });
		  $("#othersin").hover(
		      function(){
			      $("#otheropts").show();
			  },function(){
		          $("#otheropts").hide();
		  });
		  //$("#lotts").unbind("hover");
		 } 
	};
	
	return head;
});
	    
	 