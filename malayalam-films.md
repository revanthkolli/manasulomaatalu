---
layout: film-reviews
---

<h1> Malayalam Film Reviews </h1>

<br>

<div class="posts">
  {% assign posts = (site.categories['Movie Review'] | sort: 'title') %}
  {% for post in posts %}
    {% if post.categories contains "Malayalam Cinema" %}
      <a href="{{ site.baseurl }}{{ post.url }}">
        <div class="post-cover" style="background-image: url('{{ site.baseurl }}/img/{{ post.image }}')">
          <article class="post">

            <h1>{{ post.title }}</h1>

            <div class="entry">
              <b>{{ post.description }}</b>
              <br> <br>
              {{ post.date | date: "%B %-d, %Y" }}
            </div>

            <div class="post-categories">
              {% for category in post.categories %}
                {% if forloop.last %}
                  {{ category }}
                {% else %}
                  {{ category }},
                {% endif %}
              {% endfor  %}
            </div>
          </article>
        </div>
      </a>
    {% endif %}
  {% endfor %}
</div>
<br>
