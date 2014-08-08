toggleBTCDialog = ->
  dialog = $("paper-dialog")[0]
  dialog.toggle()

openLink = (url) ->
  if not url? then return false
  window.open(url)
  false
