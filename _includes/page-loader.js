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
        post_html += "\"><div class=\"shade\"><h1>" + title + "</h1><div class=\"entry\"><b>" + description + "</b><br><br>" + date + "</div><div class=\"post-categories\">"
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
