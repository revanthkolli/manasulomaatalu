 $.getJSON('{{ site.url }}/all-posts.json', function(data) {
        posts = data["posts"];
});

var load = 10;
var incr = 5;

function loadMore() {
    temp = load;
    while (load < temp + incr && load < posts.length) {
        var post = posts[load];
        var url = post["url"];
        var bg = post["bg"];
        var title = post["title"];
        var description = post["description"];
        var date = post["date"];
        var rating = post["rating"];
        var categories = post["categories"];
        var post_html = "<a id=\"new-last\" href=\"" + url + "\"><div class=\"post-cover\" style=\"background-image: url('img/" + bg +"')\"><article class=\"post";
        switch(load - temp) {
            case 0:
                post_html += " blue";
                break;
            case 1:
                post_html += " yellow";
                break;
            case 2:
                post_html += " purple";
                break;
            case 3:
                post_html += " orange";
                break;
            case 4:
                post_html += " green";
                break;
            default:
                post_html += "";
        }
         post_html += "\"><div class=\"shade\"><h1>" + title + "</h1><div class=\"entry\">"
         if (rating != null) {
             var r = parseInt(rating); 
             for(var i = 0; i < r; i++) {
                 post_html += "<img class=\"star stars\" src=\"http://manasulomaatalu.com/img/star.gif\"></img>"
             }
             var mod = rating % 1; 
             if (mod == .5) {
                 post_html += "<img class=\"star-half stars\" src=\"http://manasulomaatalu.com/img/star-half.gif\"></img>"
             } else if (mod == .25) {
                 post_html += "<img class=\"star-quarter stars\" src=\"http://manasulomaatalu.com/img/star-quarter.gif\"></img>"
             } else if (mod == .75) {
                 post_html += "<img class=\"star-three stars\" src=\"http://manasulomaatalu.com/img/star-3.gif\"></img>"
             }
             post_html += "<br><br>";
        }
        post_html +="<b>" + description + "</b><br><br>" + date + "</div><div class=\"post-categories\">"
        for (i = 0; i < categories.length-1; i++) {
            post_html += categories[i] + ", ";
        }
        post_html += categories[categories.length-1] + "</div></div></article></div></a>"
        $(post_html).insertAfter("#last-post");
        $("#last-post").removeAttr("id");
        $("#new-last").attr("id", "last-post");
        load++;
    }
    if (load == posts.length) {
        $(".load").attr("style", "display: none;");
    }
}
