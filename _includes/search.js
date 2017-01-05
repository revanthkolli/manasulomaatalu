function toggleSearch() {
    if ($("#search").is(":hidden")) {
        $("#search").show("fast");
        $("#searchInput").focus();
    }
    else {
        $("#search").hide("fast");
    }
}

function search(keywords) {
    var arr = keywords.split(" ");
    var match = []
    for (i = 0; i < posts.length; i++) {
        var post = posts[i];
        var title = post["title"].toLowerCase();
        var tags = post["tags"].join();
        tags = tags.toLowerCase();
        var add = false;
        for (j = 0; j < arr.length; j++) {
            if (title.includes(arr[j].toLowerCase()) || tags.includes(arr[j].toLowerCase())) {
                add = true;
            } else {
                add = false;
                break;
            }
        }
        if (add) {
            match.push(i);
        }
    }
    window.location.href = "{{ site.url }}/results/?query=" + keywords + "&result=" + match.join();
}

$(document).ready(function() {
    $('.tag').click(function (event) {
        search(event.target.id);
    });
});

function results() {
    if (window.location.pathname.includes("results")) {
        var query = window.location.href.slice(window.location.href.indexOf('?') + 1)
        query = query.split("&");
        var queryString = query[0].slice(query[0].indexOf('=') + 1);
        queryString = queryString.replace(/%20/g, " ");
        queryString = queryString.replace(/%27/g, "'");
        var results = query[1].slice(query[1].indexOf('=') + 1);
        results = results.split(",");
        if (results[0] == '') {
            $("#results").text("0 Search Results for \"" + queryString + "\"");
        } else {
            $("#results").text(results.length + " Search Results for \"" + queryString + "\"");
            for (var i = 0; i < results.length; i++) {
                var post = posts[parseInt(results[i])];
                var url = post["url"];
                var bg = post["bg"];
                var title = post["title"];
                var description = post["description"];
                var date = post["date"];
                var rating = post["rating"];
                var categories = post["categories"];
                var post_html = "<a id=\"new-last\" href=\"" + url + "\"><div class=\"post-cover\" style=\"background-image: url('{{ site.url }}/img/" + bg +"')\"><article class=\"post";
                switch(i % 5) {
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
                    for(var k = 0; k < r; k++) {
                        post_html += "<img class=\"star stars\" src=\"{{ site.url }}/img/star.gif\"></img>"
                    }
                    var mod = rating % 1; 
                    if (mod == .5) {
                        post_html += "<img class=\"star-half stars\" src=\"{{ site.url }}/img/star-half.gif\"></img>"
                    } else if (mod == .25) {
                        post_html += "<img class=\"star-quarter stars\" src=\"{{ site.url }}/img/star-quarter.gif\"></img>"
                    } else if (mod == .75) {
                        post_html += "<img class=\"star-three stars\" src=\"{{ site.url }}/img/star-3.gif\"></img>"
                    }
                    post_html += "<br><br>";
                }
                post_html +="<b>" + description + "</b><br><br>" + date + "</div><div class=\"post-categories\">"
                for (var j = 0; j < categories.length-1; j++) {
                    post_html += categories[j] + ", ";
                }
                post_html += categories[categories.length-1] + "</div></div></article></div></a>"
                if (i == 0) {
                    $(".posts").append(post_html);    
                    $("#new-last").attr("id", "last-post");
                } else { 
                    $(post_html).insertAfter("#last-post");
                    $("#last-post").removeAttr("id");
                    $("#new-last").attr("id", "last-post");
                }
            }
        }
    }
}

window.onload = results


$("#searchInput").keypress(function(event) {
    if (event.which == 13) {
        search($("#searchInput").val())
    }
});
