---
layout: post
title: Star Trek Warp Calculator
post_on_sidebar: true
comments: true
math: true

tag:
  - calculator
  - scifi

category:
  - tools

summary: Correspondence between time, distance, velocity, and warp factor for “The Original” series and “The Next Gegeration” series.
---

Select warp scale:  
<input type="radio" name="version" value="TOS" > The Original Series (before 2312)  
<input type="radio" name="version" value="TNG" checked> The Next Gegeration (after 2312)

------      |  -----
Warp factor | <input type="number" class="text-align-right" id="warp" step="any" min="0" value="6">
Distance    | <input type="number" class="text-align-right" id="distance" step="any" value="100">    light years

<input type="button" value="Calculate" onclick="cal()">

------                                           | -----
Velocity                                         | <input type="text" class="text-align-right" id="velocity" readonly> <span id="speed_of_light">c</span>
Time to pass that distance                       | <input type="text" class="text-align-right" id="time"     readonly> <span id="measure"></span>
                                                 |
Time to reach the Pluto (33.4 au ≈ 0.0005 ly)    | <input type="text" class="text-align-right" id="time_pl"  readonly> <span id="measure_pl"></span>
Time to reach the Alpha Centauri (4.3 ly)        | <input type="text" class="text-align-right" id="time1"    readonly> <span id="measure1"  ></span>
Time to reach the Ocampa planet (75000 ly)       | <input type="text" class="text-align-right" id="time_oc"  readonly> <span id="measure_oc"></span>
Time to cross the Milky Way (100000 ly)          | <input type="text" class="text-align-right" id="time2"    readonly> <span id="measure2"  ></span>
Time to reach the Andromeda galaxy (2000000 ly)  | <input type="text" class="text-align-right" id="time3"    readonly> <span id="measure3"  ></span>

### Description

#### TOS
For Star Trek: The Original Series, the warp equation is generally accepted to be ($$v$$ — velocity through space,
  $$c$$ — the speed of light ($$3·10^8$$  m/s) and $$w$$ — the warp factor):

{% raw %}
$$v = w^3 c$$
{% endraw %}

#### TNG
For Star Trek: The Next Generation, the warp scale has changed.
Gene Roddenberry stated that he wanted to avoid the ever-increasing warp factors used in the original series
to force added tension to the story, and so imposed the limit of warp 10 as infinite speed.

Scale change occurred in 2312.
Warp factors were established to be based upon the amount of power required to transition from one warp plateau to another.
For example, the power to initially get to warp factor 1 was much more than the power required to maintain it;
likewise warp 2, 3, 4, and so on.
Those transitional power points rather than observed speed were then assigned the integer warp factors.

{% raw %}
$$
v = w^{ \frac{10}{3} + f(w)} c, \\
f(w) =
\begin{cases}
  0,                      & 0 \leqslant w \leqslant 9.0 \\
  -0.5 \log_{10}(10 - w), & 9.0 < w \leqslant 10.0 \\

\end{cases}
$$
{% endraw %}


<script>
  function isCheck(name) {
      return document.querySelector('input[name="' + name + '"]:checked');
  }

  function cal() {
    var w = document.getElementById("warp").value;
    var d = document.getElementById("distance").value;
    var v;

    if (isCheck('version').value === "TOS") {
      v = Math.pow(w, 3);
    } else { // TNG
      if (w>=0 && w<=9)
        v = Math.pow(w, 10 / 3);
      if (w > 9 && w < 10)
        v = Math.pow(w, 10 / 3 + -0.5 * Math.log10(10 - w));
      else if (w == 10)
        v = Infinity;
      else if (w > 10)
      {
        document.getElementById("warp").value = 10;
        alert("Maximal warp factor for TNG series is 10, it's infinite velocity.\
        \nA vessel traveling at warp 10 occupied all points in the universe simultaneously.")
        v = Infinity;
      }

    }

    var t = d / v;
    var t1 = 4.3 / v;
    var t2 = 100000 / v;
    var t3 = 2000000 / v;
    var t_oc = 75000 / v;
    var t_pl = 5.281E-4 * 365 * 24 / v;

    var measure = "years";
    var measure1 = "years";
    var measure2 = "years";
    var measure3 = "years";
    var measure_oc = "years";
    var measure_pl = "hours";
    var speed_of_light = "c";

    if (v == Infinity)
      speed_of_light = "";
    else
      speed_of_light = "c";

    if (t < 0.5) {
      measure = "days";
      t *= 365;
    }

    if (t1 < 0.5) {
      measure1 = "days";
      t1 *= 365;
    }

    if (t2 < 0.5) {
      measure2 = "days";
      t2 *= 365;
    }

    if (t3 < 0.5) {
      measure3 = "days";
      t3 *= 365;
    }

    if (t_oc < 0.5) {
      measure_oc = "days";
      t_oc *= 365;
    }

    if (t_pl < 0.5) {
      measure_pl = "minutes";
      t_pl *= 60;
    }

    if (t_pl < 0.5) {
      measure_pl = "seconds";
      t_pl *= 60;
    }

    document.getElementById("velocity").value = +v.toFixed(2);
    document.getElementById("time").value     = +t.toFixed(2);
    document.getElementById("time1").value    = +t1.toFixed(2);
    document.getElementById("time2").value    = +t2.toFixed(2);
    document.getElementById("time3").value    = +t3.toFixed(2);
    document.getElementById("time_oc").value    = +t_oc.toFixed(2);
    document.getElementById("time_pl").value    = +t_pl.toFixed(2);

    document.getElementById("speed_of_light").innerHTML = speed_of_light;
    document.getElementById("measure").innerHTML = measure;
    document.getElementById("measure1").innerHTML = measure1;
    document.getElementById("measure2").innerHTML = measure2;
    document.getElementById("measure3").innerHTML = measure3;
    document.getElementById("measure_oc").innerHTML = measure_oc;
    document.getElementById("measure_pl").innerHTML = measure_pl;

  }

</script>
