$(function() {
  var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  var data = [];
  
  var width = 960,
    height = 500;

  var svg = d3.select("div#canvas").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(32," + (height / 2) + ")");
    
  function pick_color() {
	var colors = ['red', 'blue'];
	return colors[Math.round(Math.random(), 0)]
  }
  
  function redraw() {
	// DATA JOIN 	  
	var text = svg.selectAll('text')
	              .data(data, function(d) { return d; }); // the data are uniquely identified by their data itself and not by their index
	            
	// UPDATE
	text.attr('class', 'update')
	    .attr("x", function(d, i) { return i * 32 }); // I need to calculate the new position on "x" every time I redraw
	
	// ENTER  
    text.enter().append('text')
        .attr("class", "enter")
        .attr("x", function(d, i) { return i * 32 }) // I need to calculate the position on "x" every time I add a new datum
        .text(function(d){return d;});
                
    // EXIT
    text.exit().remove();	 	 
  } // redraw
  //----------
  
  redraw();
  $('button#stop_animation').hide();
  
  function take_out() {
	var position = Math.floor((Math.random() * (data.length - 1)) + 1);
	if ( position >= 1 && position <= data.length ) {
		data.splice(position - 1, 1);
	}
  }
  
  function put_in() {
	var position = Math.floor((Math.random() * 25) + 1);
	var char = alphabet[position - 1];
	var index = data.indexOf(char);
	if ( index < 0 ) {
		data.push(char);  
	}
  }
      
  // install the handler for the update button
  $('button#add').click(function(){
	put_in();
	redraw();
	return false;   
  });  
  
  $('button#remove').click(function(){
	  take_out();
	  redraw();
	  return false;
  });
  
  function animate () {
	  var action = Math.round(Math.random());
	  if ( action == 0 ) {
		  put_in();
	  }
	  else if ( action == 1 ) {
		  take_out();
	  }
	  redraw();
	  return false;
  }
  
  $('button#animate').click(function(){
	  var interval_id = setInterval(animate, 500);
	  $('button#stop_animation').attr('data-interval-id', interval_id).show();
	  $('button#add').hide();
	  $('button#remove').hide();
	  $(this).hide();
	  return false;
  });
  
  $('button#stop_animation').click(function() {
	  window.clearInterval($(this).attr('data-interval-id'));
	  $('button#add').show();
	  $('button#remove').show();
	  $('button#animate').show();
	  $(this).hide();
	  return false;
  });
});
