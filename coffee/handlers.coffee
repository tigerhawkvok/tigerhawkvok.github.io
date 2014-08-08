toggleBTCDialog = ->
  dialog = $("#btc-dialog")[0]
  dialog.toggle()

showPGPKey = ->
  $.get("tigerhawkvok_pgp_public_key.txt")
  .done (result) ->
    dialog = $("#pgp-dialog")
    $("#pgp-dialog pre").text(result)
    dialog[0].toggle()
  .fail ->
    console.error("Could not get PGP key")  

openLink = (url) ->
  if not url? then return false
  window.open(url)
  false


paperTabHandlers = ->
  $("paper-tab").each ->
    dest = $(this).text().toLowerCase() + ".html"
    qualifiedDest = "page_contents/#{dest}"
    $(this).onclick ->
      $.get(qualifiedDest)
      .done (result) ->
        $("#primary_content").html(result)
      .fail (result,error) ->
        console.error("Could not load page",qualifiedDest)
        console.warn(result,error)

$ ->
  paperTabHandlers()
