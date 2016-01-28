'use strict'

const $ = s => document.getElementById(s)

const MARKERS = [ 'red', 'blue', 'yellow', 'purple', 'black', 'white', 'green', 'brown' ]

function addMarker (event) {
  let li = document.createElement('li')
  li.classList.add('marker')

  let l = document.createElement('label')
  l.innerText = 'Location'
  li.appendChild(l)

  let i = document.createElement('input')
  i.type = 'text'
  i.classList.add('location')
  li.appendChild(i)

  let s = document.createElement('select')
  s.classList.add('color')

  MARKERS.map((m, ix) => {
    let o = document.createElement('option')
    if (ix === 0) o.setAttribute('selected', 'true')
    o.value = m
    o.innerText = m.charAt(0).toUpperCase() + m.slice(1)

    s.appendChild(o)
  })

  li.appendChild(s)

  $('markers').appendChild(li)
}

function draw (center, markers) {
  var src = 'http://maps.googleapis.com/maps/api/staticmap?size=1600x1600&sensor=false'

  let qs = o => {
    var s = ''
    for (let k in o) s += `&${k}=${o[k]}`
    return s
  }

  src += qs(center)

  src += '&' + markers.map(m => `markers=color:${m.c}|label:|${m.l}`).join('&')

  $('address').innerText = 'Open new window'
  $('address').href = src
  $('mapimg').src = src
}

window.onload = function () {
  document.querySelector('.map-submit').addEventListener('click', event => {
    let center  = $('mapcenter').value
    let zoom    = $('mapzoom').value
    let scale   = $('mapscale').value
    let maptype = $('maptype').value

    let s = []
    let markers = document.querySelectorAll('.marker')
    for (let ix = 0; ix < markers.length; ++ix) {
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
