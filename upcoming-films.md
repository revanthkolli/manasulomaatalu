---
layout: articles
title: Manasulo Maatalu - Upcoming Films
type: Upcoming Films
section: Articles
---

<div class="posts block-first">
  {% assign color = 0 %}
  {% assign posts = (site.categories['Upcoming Films'] | sort: 'title') %}
  {% for post in posts %}
    <a href="{{ site.url }}{{ post.url }}">
      <div class="post-cover" style="background-image: url('{{ site.url }}/img/{{ post.image }}')">
        {% if color == 0 %}
          <article class="post blue">
        {% elsif color == 1 %}
          <article class="post yellow">
        {% elsif color == 2 %}
          <article class="post purple">
        {% elsif color == 3 %}
          <article class="post orange">
        {% else %}
          <article class="post green">
        {% endif %}
        {% assign color = color | plus:1 %}
        {% assign color = color | modulo:5 %}
          <div class="shade">
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
          </div>
        </article>
      </div>
    </a>
  {% endfor %}
</div>
