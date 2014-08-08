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

bindEvents = ->
  # Bind event handlers for pages
  bindEmail()
  try
    window.gapi.person.go()
  catch e
    console.log("No gapi to call")

bindEmail = ->
  $("#send-mail").click ->
    $("#email-form").submit()
  $("#email-form").submit (e) ->
    e.preventDefault()
    from = $("#email")
    fromName = $("#name")
    message = $("#message")
    args = "email=#{from}&name=#{fromName}&message=#{encodeURIComponent(message)}"
    console.log("stuff")
    # Post to my server
    $.post("bob.html",args,"json")
    .done (result) ->
      # Clear
      $("#email-status").attr("text","Email sent")
    .fail (result,failError) ->
      error = "#{result.status} - #{result.statusText}"
      $("#email-status").attr("text","Couldn't send the email. Please try again. (The server returned #{error})")
      console.warn(result,failError,error)
    .always ->
      $("#email-status")[0].show()

paperTabHandlers = ->
  console.log("Binding paper tabs")
  $("paper-tab").each ->
    dest = $(this).text().toLowerCase() + ".html"
    qualifiedDest = "page_contents/#{dest}"
    $(this).click ->
      $.get(qualifiedDest)
      .done (result) ->
        $("#primary_content").html(result)
        bindEvents()
      .fail (result,error) ->
        console.error("Could not load page",qualifiedDest)
        console.warn(result,error)
        $("#general-status").attr("text","There was a problem switching tabs. Please try again.")

$ ->
  paperTabHandlers()
