$(function() {
	//导航栏固定白条
	var cn = document.getElementById("wrapper").className;
	var number = cn.substr(cn.length-1,1)
	var list = $(".nav_list").children(".nav");
	list[number-1].className = "nav on";

	
	//焦点图
	var tabs = document.getElementById("tab").getElementsByTagName("li");
	var imgs = document.getElementById("banner_imgs").getElementsByTagName("li");
	var normal = function(){
		for(var i=0;i<imgs.length;i++) {
			tabs[i].className="";
			imgs[i].className="";
		}
	}
	var current = function(n){
		
		imgs[n].className="bannerimg current";
		tabs[n].className="current";
	}
	var change = function(n) {
		tabs[n].onclick = function(){
			normal();
			current(n);
		}
	}
	for(var n=0;n<tabs.length;n++) {
		change(n);
	}
	//自动循环
	setInterval(function(){autoiFocus();},5000);
	var autoiFocus = function () {
		var atuokey = false;
		document.getElementById("banner").onmouseover = function(){atuokey = true};
		document.getElementById("banner").onmouseout = function(){atuokey = false};
		if(atuokey) return false;
		for(var i=0; i<imgs.length; i++) {
		    if (tabs[i].className == 'current') var currentNum = i;
		}
		if (currentNum == imgs.length-1){
		    normal();current(0);
		}else{
			normal();current(currentNum+1);
		}
	}
})
