$(document).ready(
	function nav_status () {
	var as=$(".icon_w");
	for(i=0;i<as.length;i++){
		if (window.location.href.indexOf(as.eq(i).attr("title"))>=0) {
			as.eq(i).parent().addClass("index3_nav_xiahuaxian");
		};
	}
}
)