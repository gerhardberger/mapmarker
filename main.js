'use strict'

const $ = s => document.getElementById(s)

const MARKERS = [ 'red', 'blue', 'yellow', 'purple', 'black', 'white', 'green', 'brown' ]

function addMarker (event) {
  var li = document.createElement('li')
  li.classList.add('marker')

  var l = document.createElement('label')
  l.innerHTML = 'Location'
  li.appendChild(l)

  var i = document.createElement('input')
  i.type = 'text'
  i.classList.add('location')
  li.appendChild(i)

  var s = document.createElement('select')
  s.classList.add('color')

  MARKERS.map((m, ix) => {
    var o = document.createElement('option')
    if (ix === 0) o.setAttribute('selected', 'true')
    o.value = m
    o.innerHTML = m.charAt(0).toUpperCase() + m.slice(1)

    s.appendChild(o)
  })

  li.appendChild(s)

  $('markers').appendChild(li)
}

function draw (center, markers) {
  var src = 'http://maps.googleapis.com/maps/api/staticmap?size=1600x1600&sensor=false'

  var qs = o => {
    var s = ''
    for (var k in o) s += `&${k}=${o[k]}`
    return s
  }

  src += qs(center)

  src += '&' + markers.map(m => `markers=color:${m.c}|label:|${m.l}`).join('&')

  $('address').innerHTML = 'Open new window'
  $('address').href = src
  $('mapimg').src = src
}

window.onload = function () {
  document.querySelector('.map-submit').addEventListener('click', event => {
    var center  = $('mapcenter').value
    var zoom    = $('mapzoom').value
    var scale   = $('mapscale').value
    var maptype = $('maptype').value

    var s = []
    var markers = document.querySelectorAll('.marker')
    for (var ix = 0; ix < markers.length; ++ix) {
      s.push({
        c: markers[ix].querySelector('.color').value
        , l: markers[ix].querySelector('.location').value
      })
    }

    draw({ center, zoom, scale, maptype }, s)
  })

  $('addmarker').addEventListener('click', addMarker)

  addMarker()
}
