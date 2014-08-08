toggleBTCDialog = ->
  dialog = $("#btc-dialog")[0]
  dialog.toggle()

showPGPKey = ->
  $.get("tigerhawkvok_pgp_public_key.txt")
  .done (result) ->
    dialog = $("#pgp-dialog")
    dialog_text = $("#pgp-dialog pre")
    dialog.text(result)
    dialog[0].toggle()
  .fail ->
    console.error("Could not get PGP key")  

openLink = (url) ->
  if not url? then return false
  window.open(url)
  false
