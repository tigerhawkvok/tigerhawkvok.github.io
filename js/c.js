// Generated by CoffeeScript 1.8.0
var animateLoad, bindEmail, bindEvents, bindIcons, byteCount, delay, isBlank, isBool, isEmpty, isJson, isNull, isNumber, mapNewWindows, openLink, paperTabHandlers, renderTab, root, roundNumber, showPGPKey, stopLoad, stopLoadError, toFloat, toInt, toggleBTCDialog,
  __slice = [].slice;

root = typeof exports !== "undefined" && exports !== null ? exports : this;

isBool = function(str) {
  return str === true || str === false;
};

isEmpty = function(str) {
  return !str || str.length === 0;
};

isBlank = function(str) {
  return !str || /^\s*$/.test(str);
};

isNull = function(str) {
  try {
    if (isEmpty(str) || isBlank(str) || (str == null)) {
      if (!(str === false || str === 0)) {
        return true;
      }
    }
  } catch (_error) {

  }
  return false;
};

isJson = function(str) {
  if (typeof str === 'object') {
    return true;
  }
  try {
    JSON.parse(str);
    return true;
  } catch (_error) {

  }
  return false;
};

isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

toFloat = function(str) {
  if (!isNumber(str) || isNull(str)) {
    return 0;
  }
  return parseFloat(str);
};

toInt = function(str) {
  if (!isNumber(str) || isNull(str)) {
    return 0;
  }
  return parseInt(str);
};

function toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
        if (arr[i] !== undefined) rv[i] = arr[i];
    return rv;
};

String.prototype.toBool = function() {
  return this.toString() === 'true';
};

Boolean.prototype.toBool = function() {
  return this.toString() === 'true';
};

Object.size = function(obj) {
  var key, size;
  size = 0;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      size++;
    }
  }
  return size;
};

delay = function(ms, f) {
  return setTimeout(f, ms);
};

roundNumber = function(number, digits) {
  var multiple;
  if (digits == null) {
    digits = 0;
  }
  multiple = Math.pow(10, digits);
  return Math.round(number * multiple) / multiple;
};

jQuery.fn.exists = function() {
  return jQuery(this).length > 0;
};

byteCount = (function(_this) {
  return function(s) {
    return encodeURI(s).split(/%..|./).length - 1;
  };
})(this);

function shuffle(o) { //v1.0
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

window.debounce_timer = null;

({
  debounce: function(func, threshold, execAsap) {
    if (threshold == null) {
      threshold = 300;
    }
    if (execAsap == null) {
      execAsap = false;
    }
    return function() {
      var args, delayed, obj;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      obj = this;
      delayed = function() {
        if (!execAsap) {
          return func.apply(obj, args);
        }
      };
      if (window.debounce_timer != null) {
        clearTimeout(window.debounce_timer);
      } else if (execAsap) {
        func.apply(obj, args);
      }
      return window.debounce_timer = setTimeout(delayed, threshold);
    };
  }
});

Function.prototype.debounce = function() {
  var args, delayed, e, execAsap, func, threshold, timeout;
  threshold = arguments[0], execAsap = arguments[1], timeout = arguments[2], args = 4 <= arguments.length ? __slice.call(arguments, 3) : [];
  if (threshold == null) {
    threshold = 300;
  }
  if (execAsap == null) {
    execAsap = false;
  }
  if (timeout == null) {
    timeout = window.debounce_timer;
  }
  func = this;
  delayed = function() {
    if (!execAsap) {
      func.apply(func, args);
    }
    return console.log("Debounce applied");
  };
  if (timeout != null) {
    try {
      clearTimeout(timeout);
    } catch (_error) {
      e = _error;
    }
  } else if (execAsap) {
    func.apply(obj, args);
    console.log("Executed immediately");
  }
  return window.debounce_timer = setTimeout(delayed, threshold);
};

mapNewWindows = function() {
  return $(".newwindow").each(function() {
    var curHref, openInNewWindow;
    curHref = $(this).attr("href");
    openInNewWindow = function(url) {
      if (url == null) {
        return false;
      }
      window.open(url);
      return false;
    };
    $(this).click(function() {
      return openInNewWindow(curHref);
    });
    return $(this).keypress(function() {
      return openInNewWindow(curHref);
    });
  });
};

animateLoad = function(d, elId) {
  var big, e, offset, offset2, sm_d, small;
  if (d == null) {
    d = 50;
  }
  if (elId == null) {
    elId = "#status-container";
  }
  try {
    if ($(elId).exists()) {
      sm_d = roundNumber(d * .5);
      big = $(elId).find('.ball');
      small = $(elId).find('.ball1');
      big.removeClass('stop hide');
      big.css({
        width: "" + d + "px",
        height: "" + d + "px"
      });
      offset = roundNumber(d / 2 + sm_d / 2 + 9);
      offset2 = roundNumber((d + 10) / 2 - (sm_d + 6) / 2);
      small.removeClass('stop hide');
      small.css({
        width: "" + sm_d + "px",
        height: "" + sm_d + "px",
        top: "-" + offset + "px",
        'margin-left': "" + offset2 + "px"
      });
      return true;
    }
    return false;
  } catch (_error) {
    e = _error;
    return console.log('Could not animate loader', e.message);
  }
};

stopLoad = function(elId) {
  var big, e, small;
  if (elId == null) {
    elId = "#status-container";
  }
  try {
    if ($(elId).exists()) {
      big = $(elId).find('.ball');
      small = $(elId).find('.ball1');
      big.addClass('bballgood ballgood');
      small.addClass('bballgood ball1good');
      return delay(250, function() {
        big.addClass('stop hide');
        big.removeClass('bballgood ballgood');
        small.addClass('stop hide');
        return small.removeClass('bballgood ball1good');
      });
    }
  } catch (_error) {
    e = _error;
    return console.log('Could not stop load animation', e.message);
  }
};

stopLoadError = function(elId) {
  var big, e, small;
  if (elId == null) {
    elId = "#status-container";
  }
  try {
    if ($(elId).exists()) {
      big = $(elId).find('.ball');
      small = $(elId).find('.ball1');
      big.addClass('bballerror ballerror');
      small.addClass('bballerror ball1error');
      return delay(1500, function() {
        big.addClass('stop hide');
        big.removeClass('bballerror ballerror');
        small.addClass('stop hide');
        return small.removeClass('bballerror ball1error');
      });
    }
  } catch (_error) {
    e = _error;
    return console.log('Could not stop load error animation', e.message);
  }
};

$(function() {
  var e;
  try {
    window.picturefill();
  } catch (_error) {
    e = _error;
    console.log("Could not execute picturefill.");
  }
  return mapNewWindows();
});

toggleBTCDialog = function() {
  var dialog;
  dialog = $("#btc-dialog")[0];
  return dialog.toggle();
};

showPGPKey = function() {
  return $.get("tigerhawkvok_pgp_public_key.txt").done(function(result) {
    var dialog;
    dialog = $("#pgp-dialog");
    $("#pgp-dialog pre").text(result);
    return dialog[0].toggle();
  }).fail(function() {
    return console.error("Could not get PGP key");
  });
};

openLink = function(url) {
  if (url == null) {
    return false;
  }
  window.open(url);
  return false;
};

bindEvents = function() {
  var e;
  bindEmail();
  bindIcons();
  try {
    return window.gapi.person.go();
  } catch (_error) {
    e = _error;
    return console.log("No gapi to call");
  }
};

bindIcons = function() {
  console.log("Binding icons");
  return $("#launchpad div img").each(function() {
    var dialogId;
    dialogId = $(this).attr("data-dialog-id");
    return $(this).click(function() {
      console.log("Clicked for " + dialogId);
      return $("#" + dialogId)[0].toggle();
    });
  });
};

bindEmail = function() {
  $("#send-mail").click(function() {
    return $("#email-form").submit();
  });
  return $("#email-form").submit(function(e) {
    var args, from, fromName, message;
    e.preventDefault();
    from = $("#email");
    fromName = $("#name");
    message = $("#message");
    args = "email=" + from + "&name=" + fromName + "&message=" + (encodeURIComponent(message));
    console.log("stuff");
    return $.post("bob.html", args, "json").done(function(result) {
      return $("#email-status").attr("text", "Email sent");
    }).fail(function(result, failError) {
      var error;
      error = "" + result.status + " - " + result.statusText;
      $("#email-status").attr("text", "Couldn't send the email. Please try again. (The server returned " + error + ")");
      return console.warn(result, failError, error);
    }).always(function() {
      return $("#email-status")[0].show();
    });
  });
};

paperTabHandlers = function() {
  console.log("Binding paper tabs");
  return $("paper-tab").each(function() {
    return $(this).click(function() {
      return renderTab(this);
    });
  });
};

renderTab = function(selector, tabIndex) {
  var dest, e, qualifiedDest, target;
  if (tabIndex == null) {
    tabIndex = 0;
  }
  target = $(selector).text().toLowerCase();
  if (isNull(target)) {
    try {
      target = selector.replace("#", "");
    } catch (_error) {
      e = _error;
      target = null;
    }
    if (isNull(target)) {
      target = "about";
    }
  }
  dest = "" + target + ".html";
  qualifiedDest = "page_contents/" + dest;
  return $.get(qualifiedDest).done(function(result) {
    $("#primary_content").html(result);
    bindEvents();
    return history.pushState({}, $(selector).text(), "#" + target);
  }).fail(function(result, error) {
    console.error("Could not load page", qualifiedDest);
    console.warn(result, error);
    console.warn("Got tab:", tabIndex, target, selector);
    $("#general-status").attr("text", "There was a problem switching tabs. Please try again.");
    $("#general-status")[0].show();
    return $("paper-tabs")[0].selected = tabIndex;
  });
};

$(function() {
  var tab, tabIndex;
  $("primary_content").css("margin-top", $("header").height() + 5);
  if (!isNull(window.location.hash)) {
    tab = window.location.hash;
  }
  if (isNull(tab)) {
    console.log("Rendering default tab");
    tabIndex = $("paper-tabs")[0].selected;
    tab = $("paper-tab")[tabIndex];
  }
  window.thisTab = tab;
  renderTab(tab, tabIndex);
  return paperTabHandlers();
});
