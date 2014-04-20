# Basic inits
root = exports ? this

debounce_timer = null

root.isBool = (str) -> str is true or str is false

root.isEmpty = (str) -> not str or str.length is 0

root.isBlank = (str) -> not str or /^\s*$/.test(str)

root.isNull = (str) ->
  try
    if isEmpty(str) or isBlank(str) or str?
      unless str is false or str is 0 then return true
  catch e
    return false
  false

root.isJson = (str) ->
  if typeof str is 'object' then return true
  try
    JSON.parse(str)
    return true
  catch e
    return false
  false

root.isNumber = (n) -> not isNaN(parseFloat(n)) and isFinite(n)

root.toFloat = (str) ->
  if not isNumber(str) or isNull(str) then return 0
  parseFloat(str)

root.toInt = (str) ->
  if not isNumber(str) or isNull(str) then return 0
  parseInt(str)

String::toBool = -> this.toString() is 'true'

Boolean::toBool = -> this is true

Object.size = (obj) ->
  size = 0
  size++ for key of obj when obj.hasOwnProperty(key)
  size

delay = (ms,f) -> setTimeout(f,ms)

root.roundNumber = (number,digits = 0) ->
  multiple = 10 ** digits
  Math.round(number * multiple) / multiple

jQuery.fn.exists = -> jQuery(this).length > 0

root.byteCount = (s) => encodeURI(s).split(/%..|./).length - 1

`function shuffle(o) { //v1.0
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}`


`function toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
        if (arr[i] !== undefined) rv[i] = arr[i];
    return rv;
}`

Function::debounce = (threshold = 300, execAsap = false, timeout = debounce_timer, args...) ->
  # Borrowed from http://coffeescriptcookbook.com/chapters/functions/debounce
  # Only run the prototyped function once per interval.
  func = this
  delayed = ->
    func.apply(func, args) unless execAsap
    console.log("Debounce applied")
  if timeout?
    try
      clearTimeout(timeout)
    catch e
      # just do nothing
  else if execAsap
    func.apply(obj, args)
    console.log("Executed immediately")
  setTimeout(delayed, threshold)

root.randomInt = (lower, upper=0) ->
  start = Math.random()
  if not lower?
    [lower, upper] = [0, lower]
  if lower > upper
    [lower, upper] = [upper, lower]
  return Math.floor(start * (upper - lower + 1) + lower)

# Real functions
root.animateLoad = (d=50,elId="#status-container") ->
  try
    if $(elId).exists()
      sm_d = roundNumber(d * .5)
      big = $(elId).find('.ball')
      small = $(elId).find('.ball1')
      big.removeClass('stop hide')
      big.css
        width:"#{d}px"
        height:"#{d}px"
      offset = roundNumber(d / 2 + sm_d/2 + 9)
      offset2 = roundNumber((d + 10) / 2 - (sm_d+6)/2)
      small.removeClass('stop hide')
      small.css
        width:"#{sm_d}px"
        height:"#{sm_d}px"
        top:"-#{offset}px"
        'margin-left':"#{offset2}px"
      return true
    false
  catch e
    console.log('Could not animate loader', e.message);

root.stopLoad = (elId="#status-container") ->
    try
      if $(elId).exists()
        big = $(elId).find('.ball')
        small = $(elId).find('.ball1')
        big.addClass('bballgood ballgood')
        small.addClass('bballgood ball1good')
        delay 250, ->
          big.addClass('stop hide')
          big.removeClass('bballgood ballgood')
          small.addClass('stop hide')
          small.removeClass('bballgood ballgood')
    catch e
      console.log('Could not stop load animation', e.message);


root.stopLoadError = (elId="#status-container") ->
    try
      if $(elId).exists()
        big = $(elId).find('.ball')
        small = $(elId).find('.ball1')
        big.addClass('bballerror ballerror')
        small.addClass('bballerror ball1error')
        delay 1500, ->
          big.addClass('stop hide')
          big.removeClass('bballerror ballerror')
          small.addClass('stop hide')
          small.removeClass('bballerror ballerror')
    catch e
      console.log('Could not stop load error animation', e.message);
          