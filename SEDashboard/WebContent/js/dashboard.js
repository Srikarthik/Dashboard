/* Copyright (c) 2008 Eksith Rodrigo */

$(window).bind("load",function(){
	$('.main').append('<div id="container1"></div>');
	$('.main').append('<div id="container2"></div>');
	$('.main').append('<div id="container3"></div>');
	$('.main').append('<div style="clear:both;width:100%;"> </div>');
	
	$('.main').find("div").each(function(i) {
		if(this.className == 'segment') {
			var t = '';
			var d = '';
			var c = '';
			
			$(this).find("*").each(function(j) {
				if(this.className == "title") {
					t += $(this).html();
					$(this).remove();
				}
			});
			$(this).find("*").each(function(j) {
				if(this.className == "description") {
					d = $(this).html();
					$(this).remove();
				}
			});
			c = $(this).html();
			var rcol = $(this).attr('rel');
			$('#container'+rcol).append(segBlock(t, d, c));
			$(this).remove();
		}
	});

	$("#container1").sortable({
		handle: 'div.h',
		revert: true,
		scroll: true,
		placeholder: 'hover',
		cursor: 'move',
		revert: true,
		connectWith: ['#container2', '#container3'],
		opacity:0.5
	});

	$("#container2").sortable({
		handle: 'div.h',
		revert: true,
		scroll: true,
		placeholder: 'hover',
		cursor: 'move',
		revert: true,
		connectWith: ['#container1', '#container3'],
		opacity:0.5
	});

	$("#container3").sortable({
		handle: 'div.h',
		revert: true,
		scroll: true,
		placeholder: 'hover',
		cursor: 'move',
		revert: true,
		connectWith: ['#container1', '#container2'],
		opacity:0.5
	});
	
	$("ul.nav").sortable({
		containment: 'parent',
		revert: true,
		opacity:0.5
	});
	
	$('li.na > a').bind('click', addTab);
	$('li.na > a').attr("href", "#");
	
	$('a.toggle').bind('click', toggleContent);
	$('a.toggle').html('<img src=\"img/down.png\" alt=\"minimize\"\/>');
	$('a.ctrl_r').html('<img src=\"img/ctrl_r.png\" alt=\"Refresh\"\/>');
	$('a.ctrl_e').html('<img src=\"img/ctrl_e.png\" alt=\"Edit\"\/>');
	$('a.ctrl_x').html('<img src=\"img/ctrl_x.png\" alt=\"Close\"\/>');
	
	$('a.ctrl_x').bind('click', closeContent);
	
	
	function addTab() {
		$('li.na').remove();
		$('ul.nav').append('<li><a href="">Custom tab</a></li>');
		$('ul.nav').append('<li class="na"><a href=""><img src="img/add_tab.png" alt="Add a tab" /></a></li>');
		$('li.na > a').bind('click', addTab);
		$('li.na > a').attr("href", "#");
	}
	
	function toggleContent(e) {
		var targetContent = $('div.b', this.parentNode.parentNode.parentNode);
		if (targetContent.css('display') == 'none') {
			targetContent.slideDown(400);
			$(this).html('<img src=\"img/down.png\" alt=\"minimize\"\/>');
		}
		else {
			targetContent.slideUp(200);
			$(this).html('<img src=\"img/up.png\" alt=\"restore\"\/>');
		}
	}
	
	function closeContent(e) {
		var cmf = false;
		var targetContent = $(this.parentNode.parentNode.parentNode.parentNode);
		targetContent.fadeOut(400, function() {
			targetContent.remove();
		});
	}
	
	function segBlock(t, d, c)
	{
		var tt = '';
		var html = ''+
		'<div class="block">'+
		'	<div class="h">'+
		'		<ul class="func">'+
		'			<li><a href="#" class="ctrl_r">Refresh</a></li>'+
		'			<li><a href="#" class="ctrl_e">Edit</a>'+
		'				<div class="drop">'+
		'					<ul class="options">'+
		'						<li><input type="text" value="'+t+'" rel="title" /></li>'+
		'						<li><input type="text" value="'+d+'" rel="description" /></li>'+
		'						<li><input type="button" value="Change" onclick="javascript:changeTitle(this);" /></li>'+
		'					</ul>'+
		'				</div>'+
		'			</li>'+
		'			<li><a href="#" class="ctrl_x">Close</a></li>'+
		'		</ul>'+
		'		<p><a href="#" class="toggle">-</a><span>'+t+'<br />'+d+'</span></p>'+
		'	</div><div class="b">'+ c +'</div><div class="f"><p> </p></div></div>';
		
		return(html);
	}
});

function changeTitle(obj) {
	var nt = $("input[@rel='title']", obj.parentNode.parentNode);
	var nd = $("input[@rel='description']", obj.parentNode.parentNode);
	var nb = $("input[@type='button']", obj.parentNode.parentNode);
	nb = $(nb);
	nt = $(nt);
	
	obj = $("span", obj.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
	obj.html(nt.attr("value") + '<br />'+nd.attr("value"));
}