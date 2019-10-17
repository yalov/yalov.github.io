---
layout: post
title: Пример

project: false
post_on_sidebar: false
fullwidth: false
hidden: false

permalink: example  # if don't want /year/

tag:
  - tag1
  - tag2

category: category1


disqus_comments: true
disqus_identifier: 5959e11a-f0e8-5b4e-838d-0302cd6aabd3  # unique for post

#lightbox2:
imgfolder: /images/
images:
  - name: image_name.png
    thumb: image_name_prev.png # unnecessary, then it's use name:
    text: description
    width: 1280 # unnecessary, for json-ld
    height: 800 # unnecessary, for json-ld



summary: "Summary text"
---


This blog post shows a few different types of content: basic typography, images, and code.

-----

<a href="#">Lorem ipsum</a> dolor sit amet, consectetur adipiscing elit. Maecenas non varius augue. Nulla sed est libero. Aenean fermentum massa sed nulla faucibus semper. Sed vel vulputate mi. Nam convallis turpis id augue blandit, et euismod est aliquam. Vestibulum non odio lacus. Nunc pretium mauris vitae ipsum pretium, at scelerisque tellus tempor. Vestibulum nec erat scelerisque, fermentum lectus vitae, finibus magna. Aenean et lacus eros. Vestibulum eu hendrerit magna, nec posuere nibh. Aliquam pulvinar a justo a luctus.

In id nibh at arcu ultricies tempor. Proin hendrerit posuere metus, nec auctor lorem ultrices nec. In ac est at tortor tincidunt feugiat. Donec ac dolor at arcu auctor tincidunt eu id magna. Sed at placerat nunc. Praesent varius tristique mi sollicitudin efficitur. Nam ac porta arcu. Maecenas in rutrum mi. Maecenas eu ullamcorper ligula, et maximus enim. Aliquam placerat sem in nisi commodo, a consequat est congue. Integer quis nulla vel neque lobortis sagittis nec quis nulla.
<!--more-->

``` text
{% raw %}
{% include lightbox.html %}
{% include lightbox.html height='7rem' %}
{% include lightbox.html height='7rem' width='800px'%}
{% include lightbox_text.html image="image-1.jpg" %}
{% endraw %}
```


> Curabitur blandit tempus porttitor. **Nullam quis risus eget urna mollis** ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.

Etiam porta *sem malesuada magna* mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.

## Heading2

Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

### Heading3

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

{% highlight js %}
// Example can be run directly in your JavaScript console

// Create a function that takes two arguments and returns the sum of those arguments
var adder = new Function("a", "b", "return a + b");

// Call the function
adder(2, 6);
// > 8
{% endhighlight %}

Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa.

### Heading3

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.

* Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
* Donec id elit non mi porta gravida at eget metus.
* Nulla vitae elit libero, a pharetra augue.

Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.

1. Vestibulum id ligula porta felis euismod semper.
2. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
3. Maecenas sed diam eget risus varius blandit sit amet non magna.

Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.
