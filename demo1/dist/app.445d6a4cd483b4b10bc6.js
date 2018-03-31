webpackJsonp([1],{19:function(module,exports,__webpack_require__){"use strict";eval("\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _dragula = __webpack_require__(20);\n\nvar _dragula2 = _interopRequireDefault(_dragula);\n\nvar _data = __webpack_require__(32);\n\nvar _data2 = _interopRequireDefault(_data);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nif (true) {\n  module.hot.accept();\n}\n\n(function () {\n  document.body.addEventListener('touchmove', function (event) {\n    event.preventDefault();\n  }, { passive: false });\n\n  var rate = document.body.clientWidth / 640;\n  var sheet = document.styleSheets[0];\n  sheet.insertRule('.animation-box { transform: matrix(' + rate + ', 0, 0, ' + rate + ', 0, 0);}', sheet.cssRules.length);\n\n  _data2.default.general_module(render_draggable_page);\n})();\n\nfunction render_draggable_page() {\n  var loading = document.querySelector('.loading');\n  var content = document.getElementById('content');\n\n  lazy_load(_data2.default.imgs, function () {\n    loading.style.opacity = 0;\n    setTimeout(function () {\n      audioPlay('bgm');\n      home_anime();\n    }, 1000);\n  });\n}\n\nfunction home_anime() {\n  content.innerHTML = _data2.default.home_page();\n  var control_play_btn = document.getElementById('control-play-btn');\n  control_play_btn.addEventListener('click', main_anime, false);\n}\n\nfunction main_anime() {\n  content.innerHTML = _data2.default.draggable_page();\n  var boxes = document.querySelectorAll('.box');\n  var targets = document.querySelectorAll('.target');\n  var guide = document.querySelector('.guide');\n  var groups = document.querySelector('.target-groups');\n  var anime_window = document.querySelector('.animation-box');\n  var btn = document.querySelectorAll('.btn');\n  var audio = {\n    'animation-draggable_rain': \"sound1\",\n    'animation-draggable_humidity': \"sound2\",\n    'animation-draggable_wind': \"sound3\"\n  };\n  var target_width = parseFloat(getComputedStyle(targets[0], 'width'));\n  var groups_width = parseFloat(getComputedStyle(groups, 'width'));\n  var animation_image = Array(8).fill('animation-normal');\n  var start = void 0;\n  var animationFrame = getAnimationFrame();\n  var cancelAnimation = cancelAnimationFrame();\n  var animation = void 0;\n  var content_bg = document.getElementById(\"content-bg\");\n  var tutorial = document.querySelector(\".tutorial\");\n  setTimeout(function () {\n    tutorial.className = 'tutorial hide';\n  }, 4000);\n\n  (0, _dragula2.default)([document.getElementById('dragger'), groups], {\n    copy: true,\n    accepts: function accepts(el, target_groups, source, target) {\n      return target && target_groups === groups && target.id;\n    }\n  }).on('drop', function (el, target_groups, source, target) {\n    if (el.className.indexOf('box') > -1 && target && target.id) {\n      var bg = el.className.split(' ')[2];\n      var index = target.id.charAt(target.id.length - 1);\n\n      target.className = 'target noline ' + bg;\n      animation_image[index] = 'animation-' + bg;\n      btn_class();\n    }\n  }).on('out', function (el, container, source) {\n    if (el.className.indexOf('noline') > -1) {\n      var index = el.id.charAt(el.id.length - 1);\n      var ele = document.getElementById(el.id);\n      ele.className = 'target';\n      animation_image[index] = 'animation-normal';\n      btn_class();\n    }\n  });\n\n  function guideAnimation(timestamp) {\n    if (!start) start = timestamp;\n    var progress = (timestamp - start) * groups_width / 8000;\n    guide.style.transform = 'translateX(' + (progress - 60) + 'px)';\n\n    var isRestart = Math.floor(progress / target_width);\n    if (isRestart >= 8) {\n      start = timestamp;\n    } else {\n      content_bg.className = animation_image[isRestart].split('_')[1] || '';\n      anime_window.className = 'animation-box ' + animation_image[isRestart];\n      animation_image[isRestart] !== 'animation-normal' && audioPlay(audio[animation_image[isRestart]]);\n    }\n    animation = animationFrame(guideAnimation);\n  }\n\n  function btn_class() {\n    var addClass = false;\n    animation_image.forEach(function (item) {\n      if (item !== 'animation-normal') {\n        addClass = true;\n      }\n    });\n    btn.forEach(function (item) {\n      if (addClass) {\n        item.className.indexOf('fail') > -1 && (item.className = item.className.split(' ').splice(0, 2).join(' '));\n      } else {\n        item.className.indexOf('fail') === -1 && (item.className += ' fail');\n      }\n    });\n  }\n\n  btn.forEach(function (item) {\n    if (item.className.indexOf('rest-btn') > 0) {\n      item.addEventListener('click', function () {\n        if (item.className.indexOf('fail') < 0) {\n          for (var i = 0; i < 8; i++) {\n            animation_image[i] = 'animation-normal';\n            targets[i].className = 'target';\n          }\n        }\n      }, false);\n    } else {\n      item.addEventListener('click', function () {\n        if (item.className.indexOf('fail') < 0) {\n          cancelAnimation(animation);\n          generate_page(animation_image);\n        }\n      }, false);\n    }\n  });\n\n  animationFrame(guideAnimation);\n}\n\nfunction generate_page(animation_image) {\n  var index = 0;\n  var root_url = \"./statics/images/\";\n  var content_bg = document.getElementById(\"content-bg\");\n  content.innerHTML = _data2.default.generate_page(animation_image[index++], root_url + \"title_.png\");\n  content_bg.className = animation_image[index].split('_')[1];\n  var title = document.getElementById(\"title\");\n  var anime_window = document.querySelector('.animation-box');\n  var audio = {\n    'animation-draggable_rain': document.getElementById(\"sound1\"),\n    'animation-draggable_humidity': document.getElementById(\"sound2\"),\n    'animation-draggable_wind': document.getElementById(\"sound3\")\n  };\n  var reload_page = document.getElementById(\"reload_page\");\n  var custome_btn = document.getElementById(\"custome_btn\");\n  var modal_wrapper = document.getElementById(\"modal_wrapper\");\n  var close_btn = document.getElementById(\"close_btn\");\n\n  setTimeout(loop_animation, 1000);\n  reload_page.addEventListener('click', function () {\n    location.reload();\n  }, false);\n  custome_btn.addEventListener('click', function () {\n    modal_wrapper.className = 'modal-wrapper';\n  }, false);\n  close_btn.addEventListener('click', function () {\n    modal_wrapper.className = 'modal-wrapper hide';\n  }, false);\n\n  function loop_animation() {\n    var animeType = animation_image[index].split('_')[1] || '';\n    title.src = root_url + \"title_\" + animeType + \".png\";\n    content_bg.className = animeType;\n    anime_window.className = 'animation-box ' + animation_image[index];\n    animation_image[index] !== 'animation-normal' && audio[animation_image[index]].play();\n    index === 7 ? index = 0 : index++;\n    setTimeout(loop_animation, 1000);\n  }\n}\n\nfunction lazy_load(imgs, callback) {\n  var count = 0;\n  var len = imgs.length;\n  var host = _data2.default.host;\n\n  imgs.forEach(function (item) {\n    var imgObj = new Image();\n    imgObj.onload = function () {\n      if (++count === len) {\n        callback();\n      }\n    };\n    imgObj.onerror = function () {\n      console.log(imgObj.src + ': can\\'t be loaded.');\n    };\n    imgObj.src = host + item;\n  });\n}\n\nfunction getComputedStyle(ele, style) {\n  if (ele.currentStyle) {\n    return ele.currentStyle[style];\n  } else {\n    return window.getComputedStyle(ele)[style];\n  }\n}\n\nfunction audioPlay(el) {\n  var bgm = document.getElementById(el);\n\n  if ((typeof WeixinJSBridge === 'undefined' ? 'undefined' : _typeof(WeixinJSBridge)) == \"object\" && typeof WeixinJSBridge.invoke == \"function\") {\n    WeixinJSBridge.invoke('getNetworkType', {}, function (res) {\n      bgm.play();\n    });\n  } else {\n    bgm.play();\n  }\n}\n\nfunction getAnimationFrame() {\n  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {\n    window.setTimeout(callback, 1000 / 60);\n  };\n}\nfunction cancelAnimationFrame() {\n  return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame;\n}\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTkuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZGVtbzEvc3RhdGljcy9qcy9pbmRleC5qcz8yNDIwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkcmFndWxhIGZyb20gJ2RyYWd1bGEnXG5pbXBvcnQgZGF0YSBmcm9tICcuL2RhdGEnXG5cbi8vIGZvciBob3QgdXBkYXRlXG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG59XG5cbihmdW5jdGlvbiAoKSB7XG4gIC8vIFRvIHByZXZlbnQgU2Nyb2xsIGV2ZW50IGluIG1vYmlsZS5cbiAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gIH0sIHtwYXNzaXZlOiBmYWxzZX0pXG5cbiAgLy8gb3BlcmF0ZSBzdHlsZXNoZWV0LCB0byBhZGFwdCBzY3JlZW5cbiAgY29uc3QgcmF0ZSA9IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggLyA2NDBcbiAgY29uc3Qgc2hlZXQgPSBkb2N1bWVudC5zdHlsZVNoZWV0c1swXVxuICBzaGVldC5pbnNlcnRSdWxlKGAuYW5pbWF0aW9uLWJveCB7IHRyYW5zZm9ybTogbWF0cml4KCR7cmF0ZX0sIDAsIDAsICR7cmF0ZX0sIDAsIDApO31gLCBzaGVldC5jc3NSdWxlcy5sZW5ndGgpXG5cbiAgLyoqXG4gICAqIHRvIHNob3cgYW5pbWF0ZSBwYWdlXG4gICAqL1xuICBkYXRhLmdlbmVyYWxfbW9kdWxlKHJlbmRlcl9kcmFnZ2FibGVfcGFnZSlcbn0pKCk7XG5cbi8qKlxuICogZHJhZ2dhYmxlX3BhZ2VcbiAqL1xuZnVuY3Rpb24gcmVuZGVyX2RyYWdnYWJsZV9wYWdlICgpIHtcbiAgY29uc3QgbG9hZGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2FkaW5nJylcbiAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50JylcbiAgLy8gY29uc3QgYmdtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JnbScpXG4gIGxhenlfbG9hZChkYXRhLmltZ3MsICgpID0+IHtcbiAgICBsb2FkaW5nLnN0eWxlLm9wYWNpdHkgPSAwXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgLyoqXG4gICAgICAgKiBsb2FkIGhvbWUgcGFnZVxuICAgICAgICovIFxuICAgICAgYXVkaW9QbGF5KCdiZ20nKTtcbiAgICAgIGhvbWVfYW5pbWUoKTtcbiAgICB9LCAxMDAwKVxuICB9KVxufVxuXG4vKipcbiAqIGhvbWVfcGFnZSBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBob21lX2FuaW1lICgpIHtcbiAgY29udGVudC5pbm5lckhUTUwgPSBkYXRhLmhvbWVfcGFnZSgpXG4gIGNvbnN0IGNvbnRyb2xfcGxheV9idG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbC1wbGF5LWJ0bicpXG4gIGNvbnRyb2xfcGxheV9idG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBtYWluX2FuaW1lLCBmYWxzZSlcbn1cblxuLyoqXG4gKiBkYWdnYWJsZV9wYWdlIGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIG1haW5fYW5pbWUgKCkge1xuICBjb250ZW50LmlubmVySFRNTCA9IGRhdGEuZHJhZ2dhYmxlX3BhZ2UoKVxuICBjb25zdCBib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib3gnKVxuICBjb25zdCB0YXJnZXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhcmdldCcpXG4gIGNvbnN0IGd1aWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmd1aWRlJylcbiAgY29uc3QgZ3JvdXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhcmdldC1ncm91cHMnKVxuICBjb25zdCBhbmltZV93aW5kb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYW5pbWF0aW9uLWJveCcpXG4gIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4nKVxuICBjb25zdCBhdWRpbyA9IHtcbiAgICAnYW5pbWF0aW9uLWRyYWdnYWJsZV9yYWluJzogXCJzb3VuZDFcIixcbiAgICAnYW5pbWF0aW9uLWRyYWdnYWJsZV9odW1pZGl0eSc6IFwic291bmQyXCIsXG4gICAgJ2FuaW1hdGlvbi1kcmFnZ2FibGVfd2luZCc6IFwic291bmQzXCJcbiAgfVxuICBjb25zdCB0YXJnZXRfd2lkdGggPSBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUodGFyZ2V0c1swXSwgJ3dpZHRoJykpXG4gIGNvbnN0IGdyb3Vwc193aWR0aCA9IHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShncm91cHMsICd3aWR0aCcpKVxuICBjb25zdCBhbmltYXRpb25faW1hZ2UgPSBBcnJheSg4KS5maWxsKCdhbmltYXRpb24tbm9ybWFsJylcbiAgbGV0IHN0YXJ0XG4gIGNvbnN0IGFuaW1hdGlvbkZyYW1lID0gZ2V0QW5pbWF0aW9uRnJhbWUoKSBcbiAgY29uc3QgY2FuY2VsQW5pbWF0aW9uID0gY2FuY2VsQW5pbWF0aW9uRnJhbWUoKVxuICBsZXQgYW5pbWF0aW9uXG4gIGNvbnN0IGNvbnRlbnRfYmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnQtYmdcIikgXG4gIGNvbnN0IHR1dG9yaWFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50dXRvcmlhbFwiKVxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICB0dXRvcmlhbC5jbGFzc05hbWUgPSAndHV0b3JpYWwgaGlkZSdcbiAgfSwgNDAwMClcblxuICAvLyBib3hlcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAvLyAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAvLyAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIC8vICAgfSlcbiAgLy8gfSlcblxuICAvKipcbiAgICogZHJhZ2dhYmxlIHdpdGggaHRtbDUgb3JpZ2luIEFQSVxuICAgKiBidXQgdGhlIEFQSSBpc24ndCB2YWxpZCBpbiBtb2JpbGUuXG4gICAqIHNvLCBJIHNlbGVjdCBkcmFnZ2JsZShodHRwczovL2dpdGh1Yi5jb20vU2hvcGlmeS9kcmFnZ2FibGUvdHJlZS9tYXN0ZXIvc3JjL0RyYWdnYWJsZSkuXG4gICAqICpvbmRyYWdzdGFydCBvbmRyYWcgKm9uZHJhZ2VuZCBlLmRhdGFUcmFuc2ZlciBvbmRyYWdlbnRlciAqb25kcmFnb3ZlciBvbmRyYWdsZWF2ZSAqb25kcm9wXG4gICAqL1xuICAvLyBib3hlcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAvLyAgIGl0ZW0ub25kcmFnc3RhcnQgPSBmdW5jdGlvbiAoZSkge1xuICAvLyAgICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgnYmcnLCBlLnRhcmdldC5jbGFzc05hbWUuc3BsaXQoJyAnKVsyXSlcbiAgLy8gICB9XG4gIC8vIH0pXG4gIC8vIHRhcmdldHMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgLy8gICBpdGVtLm9uZHJhZ292ZXIgPSBmdW5jdGlvbiAoZSkge1xuICAvLyAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAvLyAgIH1cbiAgLy8gfSlcbiAgLy8gdGFyZ2V0cy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAvLyAgIGl0ZW0ub25kcm9wID0gZnVuY3Rpb24gKGUpIHtcbiAgLy8gICAgIGNvbnN0IGJnID0gZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgnYmcnKVxuICAvLyAgICAgZS50YXJnZXQuY2xhc3NOYW1lICs9ICcgbm9saW5lICcgKyBiZ1xuICAvLyAgICAgZS50YXJnZXQuZHJhZ2dhYmxlID0gdHJ1ZVxuICAvLyAgICAgYW5pbWF0aW9uX2ltYWdlW2luZGV4XSA9ICdhbmltYXRpb24tJyArIGJnXG4gIC8vICAgICBidG5fY2xhc3MoKVxuICAvLyAgIH1cbiAgLy8gfSlcbiAgLy8gdGFyZ2V0cy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAvLyAgIGl0ZW0ub25kcmFnZW5kID0gZnVuY3Rpb24gKGUpIHtcbiAgLy8gICAgIGUudGFyZ2V0LmNsYXNzTmFtZSA9ICd0YXJnZXQnXG4gIC8vICAgICBlLnRhcmdldC5kcmFnZ2FibGUgPSBudWxsXG4gIC8vICAgICBhbmltYXRpb25faW1hZ2VbaW5kZXhdID0gJ2FuaW1hdGlvbi1ub3JtYWwnXG4gIC8vICAgICBidG5fY2xhc3MoKVxuICAvLyAgIH1cbiAgLy8gfSlcblxuICAvKipcbiAgICogdXNlIGRyYWd1bGEuanNcbiAgICovXG4gIGRyYWd1bGEoW2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkcmFnZ2VyJyksIGdyb3Vwc10sIHtcbiAgICBjb3B5OiB0cnVlLFxuICAgIGFjY2VwdHM6IGZ1bmN0aW9uIChlbCwgdGFyZ2V0X2dyb3Vwcywgc291cmNlLCB0YXJnZXQpIHtcbiAgICAgIHJldHVybiB0YXJnZXQgJiYgdGFyZ2V0X2dyb3VwcyA9PT0gZ3JvdXBzICYmICB0YXJnZXQuaWRcbiAgICB9XG4gIH0pLm9uKCdkcm9wJywgZnVuY3Rpb24gKGVsLCB0YXJnZXRfZ3JvdXBzLCBzb3VyY2UsIHRhcmdldCkge1xuICAgIGlmIChlbC5jbGFzc05hbWUuaW5kZXhPZignYm94JykgPiAtMSAmJiB0YXJnZXQgJiYgIHRhcmdldC5pZCkge1xuICAgICAgY29uc3QgYmcgPSBlbC5jbGFzc05hbWUuc3BsaXQoJyAnKVsyXVxuICAgICAgY29uc3QgaW5kZXggPSB0YXJnZXQuaWQuY2hhckF0KHRhcmdldC5pZC5sZW5ndGggLSAxKVxuICAgICAgLy8gY29uc29sZS5sb2coW10uaW5kZXhPZi5jYWxsKHRhcmdldC5wYXJlbnROb2RlLmNoaWxkTm9kZXMsIHRhcmdldCkpXG4gICAgICB0YXJnZXQuY2xhc3NOYW1lID0gJ3RhcmdldCBub2xpbmUgJyArIGJnXG4gICAgICBhbmltYXRpb25faW1hZ2VbaW5kZXhdID0gJ2FuaW1hdGlvbi0nICsgYmdcbiAgICAgIGJ0bl9jbGFzcygpXG4gICAgfVxuICB9KS5vbignb3V0JywgZnVuY3Rpb24gKGVsLCBjb250YWluZXIsIHNvdXJjZSkge1xuICAgIGlmIChlbC5jbGFzc05hbWUuaW5kZXhPZignbm9saW5lJykgPiAtMSkge1xuICAgICAgY29uc3QgaW5kZXggPSBlbC5pZC5jaGFyQXQoZWwuaWQubGVuZ3RoIC0gMSlcbiAgICAgIGNvbnN0IGVsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsLmlkKVxuICAgICAgZWxlLmNsYXNzTmFtZSA9ICd0YXJnZXQnXG4gICAgICBhbmltYXRpb25faW1hZ2VbaW5kZXhdID0gJ2FuaW1hdGlvbi1ub3JtYWwnXG4gICAgICBidG5fY2xhc3MoKVxuICAgIH1cbiAgfSlcblxuXG4gIGZ1bmN0aW9uIGd1aWRlQW5pbWF0aW9uICh0aW1lc3RhbXApIHtcbiAgICBpZiAoIXN0YXJ0KSBzdGFydCA9IHRpbWVzdGFtcFxuICAgIHZhciBwcm9ncmVzcyA9ICh0aW1lc3RhbXAgLSBzdGFydCkgKiBncm91cHNfd2lkdGggLyA4MDAwXG4gICAgZ3VpZGUuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoJyArIChwcm9ncmVzcyAtIDYwKSArICdweCknXG4gICAgLyoqXG4gICAgICogZ3JvdXBzX3dpZHRoIC8gdGFyZ2V0X3dpZHRoID0gOCwgYW5kIHdlIGV4Y2VwdCB0aGUgdG90YWwgYW5pbWF0aW9uIGxlbmd0aCBpcyA4IHNlY29uZHMuXG4gICAgICogc28gd2UgY2FuIGluZGljYXRlIHdoZW4gcHJvZ3Jlc3MgPSA4MDAwIHdlIHNob3VsZCByZXNldCB0aW1lc3RhbXAuXG4gICAgICogc3BlZWQgPSBncm91cHNfd2lkdGggLyA4MDAwXG4gICAgICovIFxuICAgIGNvbnN0IGlzUmVzdGFydCA9IE1hdGguZmxvb3IocHJvZ3Jlc3MgLyB0YXJnZXRfd2lkdGgpXG4gICAgaWYgKGlzUmVzdGFydCA+PSA4KSB7XG4gICAgICBzdGFydCA9IHRpbWVzdGFtcFxuICAgIH0gZWxzZSB7XG4gICAgICBjb250ZW50X2JnLmNsYXNzTmFtZSA9IGFuaW1hdGlvbl9pbWFnZVtpc1Jlc3RhcnRdLnNwbGl0KCdfJylbMV0gfHwgJydcbiAgICAgIGFuaW1lX3dpbmRvdy5jbGFzc05hbWUgPSAnYW5pbWF0aW9uLWJveCAnICsgYW5pbWF0aW9uX2ltYWdlW2lzUmVzdGFydF1cbiAgICAgIGFuaW1hdGlvbl9pbWFnZVtpc1Jlc3RhcnRdICE9PSAnYW5pbWF0aW9uLW5vcm1hbCcgJiYgYXVkaW9QbGF5KGF1ZGlvW2FuaW1hdGlvbl9pbWFnZVtpc1Jlc3RhcnRdXSlcbiAgICB9XG4gICAgYW5pbWF0aW9uID0gYW5pbWF0aW9uRnJhbWUoZ3VpZGVBbmltYXRpb24pXG4gIH1cblxuICBmdW5jdGlvbiBidG5fY2xhc3MgKCkge1xuICAgIC8vIGZhc2xlIG1lYW5zIHRoZXJlIGFyZSBhbGwgJ2FuaW1hdGlvbi1ub3JtYWwnLCBhbmQgdGhlIGNsYXNzTmFtZSBzaG91bGQgaGF2ZSAnZmFpbCcuXG4gICAgbGV0IGFkZENsYXNzID0gZmFsc2VcbiAgICBhbmltYXRpb25faW1hZ2UuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0gIT09ICdhbmltYXRpb24tbm9ybWFsJykge1xuICAgICAgICBhZGRDbGFzcyA9IHRydWVcbiAgICAgIH1cbiAgICB9KVxuICAgIGJ0bi5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZiAoYWRkQ2xhc3MpIHtcbiAgICAgICAgaXRlbS5jbGFzc05hbWUuaW5kZXhPZignZmFpbCcpID4gLTEgJiYgKGl0ZW0uY2xhc3NOYW1lID0gaXRlbS5jbGFzc05hbWUuc3BsaXQoJyAnKS5zcGxpY2UoMCwgMikuam9pbignICcpKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbS5jbGFzc05hbWUuaW5kZXhPZignZmFpbCcpID09PSAtMSAmJiAoaXRlbS5jbGFzc05hbWUgKz0gJyBmYWlsJylcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgYnRuLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICBpZiAoaXRlbS5jbGFzc05hbWUuaW5kZXhPZigncmVzdC1idG4nKSA+IDApIHtcbiAgICAgIC8vIHJlc2V0IEFuaW1hdGVcbiAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChpdGVtLmNsYXNzTmFtZS5pbmRleE9mKCdmYWlsJykgPCAwKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbl9pbWFnZVtpXSA9ICdhbmltYXRpb24tbm9ybWFsJ1xuICAgICAgICAgICAgdGFyZ2V0c1tpXS5jbGFzc05hbWUgPSAndGFyZ2V0J1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgZmFsc2UpXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGdlbmVyYXRlIEFuaW1hdGVcbiAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChpdGVtLmNsYXNzTmFtZS5pbmRleE9mKCdmYWlsJykgPCAwKSB7XG4gICAgICAgICAgY2FuY2VsQW5pbWF0aW9uKGFuaW1hdGlvbilcbiAgICAgICAgICBnZW5lcmF0ZV9wYWdlKGFuaW1hdGlvbl9pbWFnZSlcbiAgICAgICAgfVxuICAgICAgfSwgZmFsc2UpXG4gICAgfVxuICB9KVxuXG4gIGFuaW1hdGlvbkZyYW1lKGd1aWRlQW5pbWF0aW9uKVxufVxuXG4vKipcbiAqIGxvYWQgZ2VuZXJhdGVfcGFnZVxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZV9wYWdlIChhbmltYXRpb25faW1hZ2UpIHtcbiAgbGV0IGluZGV4ID0gMFxuICBjb25zdCByb290X3VybCA9IFwiLi9zdGF0aWNzL2ltYWdlcy9cIlxuICBjb25zdCBjb250ZW50X2JnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50LWJnXCIpXG4gIGNvbnRlbnQuaW5uZXJIVE1MID0gZGF0YS5nZW5lcmF0ZV9wYWdlKGFuaW1hdGlvbl9pbWFnZVtpbmRleCsrXSwgcm9vdF91cmwgKyBcInRpdGxlXy5wbmdcIilcbiAgY29udGVudF9iZy5jbGFzc05hbWUgPSBhbmltYXRpb25faW1hZ2VbaW5kZXhdLnNwbGl0KCdfJylbMV1cbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpdGxlXCIpXG4gIGNvbnN0IGFuaW1lX3dpbmRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbmltYXRpb24tYm94JylcbiAgY29uc3QgYXVkaW8gPSB7XG4gICAgJ2FuaW1hdGlvbi1kcmFnZ2FibGVfcmFpbic6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic291bmQxXCIpLFxuICAgICdhbmltYXRpb24tZHJhZ2dhYmxlX2h1bWlkaXR5JzogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzb3VuZDJcIiksXG4gICAgJ2FuaW1hdGlvbi1kcmFnZ2FibGVfd2luZCc6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic291bmQzXCIpXG4gIH1cbiAgY29uc3QgcmVsb2FkX3BhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlbG9hZF9wYWdlXCIpXG4gIGNvbnN0IGN1c3RvbWVfYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjdXN0b21lX2J0blwiKVxuICBjb25zdCBtb2RhbF93cmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbF93cmFwcGVyXCIpXG4gIGNvbnN0IGNsb3NlX2J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2VfYnRuXCIpXG5cbiAgc2V0VGltZW91dChsb29wX2FuaW1hdGlvbiwgMTAwMClcbiAgcmVsb2FkX3BhZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgbG9jYXRpb24ucmVsb2FkKClcbiAgfSwgZmFsc2UpXG4gIGN1c3RvbWVfYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIG1vZGFsX3dyYXBwZXIuY2xhc3NOYW1lID0gJ21vZGFsLXdyYXBwZXInXG4gIH0sIGZhbHNlKVxuICBjbG9zZV9idG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgbW9kYWxfd3JhcHBlci5jbGFzc05hbWUgPSAnbW9kYWwtd3JhcHBlciBoaWRlJ1xuICB9LCBmYWxzZSlcblxuICBmdW5jdGlvbiBsb29wX2FuaW1hdGlvbiAoKSB7XG4gICAgbGV0IGFuaW1lVHlwZSA9IGFuaW1hdGlvbl9pbWFnZVtpbmRleF0uc3BsaXQoJ18nKVsxXSB8fCAnJ1xuICAgIHRpdGxlLnNyYyA9IHJvb3RfdXJsICsgXCJ0aXRsZV9cIiArIGFuaW1lVHlwZSArXCIucG5nXCJcbiAgICBjb250ZW50X2JnLmNsYXNzTmFtZSA9IGFuaW1lVHlwZVxuICAgIGFuaW1lX3dpbmRvdy5jbGFzc05hbWUgPSAnYW5pbWF0aW9uLWJveCAnICsgYW5pbWF0aW9uX2ltYWdlW2luZGV4XVxuICAgIGFuaW1hdGlvbl9pbWFnZVtpbmRleF0gIT09ICdhbmltYXRpb24tbm9ybWFsJyAmJiBhdWRpb1thbmltYXRpb25faW1hZ2VbaW5kZXhdXS5wbGF5KClcbiAgICBpbmRleCA9PT0gNyA/IGluZGV4ID0gMCA6IGluZGV4KytcbiAgICBzZXRUaW1lb3V0KGxvb3BfYW5pbWF0aW9uLCAxMDAwKVxuICB9XG59XG5cbi8qKlxuICogVW5vcmRlcmVkIGxhenkgbG9hZCBpbWFnZXNcbiAqIFVudGlsIGxvYWQgYWxsIG5lZWRlZCBpbWFnZXMsIGluc2VydCBtYWluIGh0bWwuXG4gKi9cbmZ1bmN0aW9uIGxhenlfbG9hZCAoaW1ncywgY2FsbGJhY2spIHtcbiAgbGV0IGNvdW50ID0gMFxuICBjb25zdCBsZW4gPSBpbWdzLmxlbmd0aFxuICBjb25zdCBob3N0ID0gZGF0YS5ob3N0ICBcblxuICBpbWdzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICBjb25zdCBpbWdPYmogPSBuZXcgSW1hZ2UoKVxuICAgIGltZ09iai5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoKytjb3VudCA9PT0gbGVuKSB7XG4gICAgICAgIGNhbGxiYWNrKClcbiAgICAgIH1cbiAgICB9XG4gICAgaW1nT2JqLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zb2xlLmxvZyhpbWdPYmouc3JjICsgJzogY2FuXFwndCBiZSBsb2FkZWQuJylcbiAgICB9XG4gICAgaW1nT2JqLnNyYyA9IGhvc3QgKyBpdGVtXG4gIH0pXG59XG5cbi8qKlxuICogZ2V0IG9uLXJlYWwgdGltZSBzdHlsZSBhYm91dCBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIGdldENvbXB1dGVkU3R5bGUoZWxlLCBzdHlsZSkge1xuICBpZiAoZWxlLmN1cnJlbnRTdHlsZSkge1xuICAgIHJldHVybiBlbGUuY3VycmVudFN0eWxlW3N0eWxlXVxuICB9IGVsc2Uge1xuICAgIHJldHVybiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGUpW3N0eWxlXVxuICB9XG59XG5cbi8qKlxuICogcGxheSBhdWRpbyBpbiBXd2NoYXRcbiAqL1xuZnVuY3Rpb24gYXVkaW9QbGF5KGVsKXtcbiAgY29uc3QgYmdtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWwpO1xuICAvLyBjb25zdCBwbGF5ID0gZnVuY3Rpb24oKXtcbiAgLy8gICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiV2VpeGluSlNCcmlkZ2VSZWFkeVwiLCBwbGF5KTtcbiAgLy8gICBiZ20ucGxheSgpO1xuICAvLyB9O1xuICAvLyBiZ20ucGxheSgpO1xuICAvLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiV2VpeGluSlNCcmlkZ2VSZWFkeVwiLCBwbGF5LCBmYWxzZSk7XG4gIC8vIGJnbS5hZGRFdmVudExpc3RlbmVyKCd0aW1ldXBkYXRlJywgZnVuY3Rpb24gc2hvd1RpbWUoKXtcbiAgLy8gICBjb25zb2xlLmxvZyhiZ20uZHVyYXRpb24sJyAgJywgYmdtLmN1cnJlbnRUaW1lKTtcbiAgLy8gfSwgZmFsc2UpO1xuICBpZiAodHlwZW9mIFdlaXhpbkpTQnJpZGdlID09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFdlaXhpbkpTQnJpZGdlLmludm9rZSA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBXZWl4aW5KU0JyaWRnZS5pbnZva2UoJ2dldE5ldHdvcmtUeXBlJywge30sIGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgIGJnbS5wbGF5KCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgYmdtLnBsYXkoKTtcbiAgfVxufVxuXG4vKipcbiAqIFxuICovXG5mdW5jdGlvbiBnZXRBbmltYXRpb25GcmFtZSAoKSB7XG4gIHJldHVybiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCAgXG4gICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCAgXG4gICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSAgICB8fCAgXG4gICAgZnVuY3Rpb24oIGNhbGxiYWNrICl7ICBcbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApIFxuICAgIH1cbn1cbmZ1bmN0aW9uIGNhbmNlbEFuaW1hdGlvbkZyYW1lICgpIHtcbiAgcmV0dXJuIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fCBcbiAgICB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgIFxuICAgIHdpbmRvdy5tb3pDYW5jZWxBbmltYXRpb25GcmFtZSAgICBcbiAgICAvLyB8fCAgXG4gICAgLy8gZnVuY3Rpb24oIGNhbGxiYWNrICl7XG4gICAgLy8gICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKSBcbiAgICAvLyB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gZGVtbzEvc3RhdGljcy9qcy9pbmRleC5qcyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBT0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///19\n")},3:function(g,I,n){n(4),g.exports=n(19)},32:function(module,exports,__webpack_require__){"use strict";eval('\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.default = {\n  host:  true ? \'/mobiledemo/demo1/dist\' : \'http://192.168.96.12:8200\',\n  imgs: [\'/statics/images/tutorial_bg.png\', \'/statics/images/home_normal.png\', \'/statics/images/main_normal.png\', \'/statics/images/draggable_rain.png\', \'/statics/images/draggable_humidity.png\', \'/statics/images/draggable_wind.png\'],\n  general_module: function general_module(callback) {\n    var modal_wrapper = document.getElementById(\'modal_wrapper\');\n    modal_wrapper.innerHTML = \'\\n        <div class="generate-modal">\\n          <img src="\' + this.host + \'/statics/images/generate_modal.png" />\\n          <a class="goXpro" href="http://xpro.91ctf.com"></a>\\n          <span id="close_btn" class="close-btn">X</span>\\n        </div>\\n        <audio id="sound1" preload="auto">\\n          <source src="\' + this.host + \'/statics/audio/sound1.mp3" type="audio/mp3">\\n        </audio>\\n        <audio id="sound2" preload="auto">\\n          <source src="\' + this.host + \'/statics/audio/sound2.mp3" type="audio/mp3">\\n        </audio>\\n        <audio id="sound3" preload="auto">\\n          <source src="\' + this.host + \'/statics/audio/sound3.mp3" type="audio/mp3">\\n        </audio>\\n        <audio id="bgm" preload="auto" loop="loop">\\n          <source src="\' + this.host + \'/statics/audio/bgm.mp3" type="audio/mp3">\\n        </audio>\\n    \';\n    setTimeout(function () {\n      callback();\n    }, 0);\n  },\n  home_page: function home_page() {\n    return \'\\n              <header id="header">\\n                <div class="animation-header">\\n                  <img src="\' + this.host + \'/statics/images/header_info.png"/>\\n                </div>\\n              </header>\\n              <div id="window">\\n                <div class="animation-box home-normal"></div>\\n              </div>\\n              <div id="control">\\n                <img id="control-play-btn" class="control-play-btn" src="\' + this.host + \'/statics/images/control_play_btn.png"/>\\n              </div>\';\n  },\n  draggable_page: function draggable_page() {\n    return \'\\n                      <header id="header">\\n                        <img class="header-bg" src="\' + this.host + \'/statics/images/header_bg.png">\\n                      </header>\\n                      <div class="tutorial">\\n                        <div class="tutorial-finger"></div>\\n                      </div>\\n                      <div id="window">\\n                        <div class="animation-box animation-normal"></div>\\n                      </div>\\n                      <div id="control">\\n                        <img class="control-bg" src="\' + this.host + \'/statics/images/control_bg.png" alt="control_bg"/>\\n                        <div id="dragger">\\n                          <div class="box dragger1 draggable_rain"></div>\\n                          <div class="box dragger2 draggable_humidity"></div>\\n                          <div class="box dragger3 draggable_wind"></div>\\n                        </div>\\n                        <div class="target-groups">\\n                          <div class="guide"></div>\\n                          <div id="target0" class="target"></div>\\n                          <div id="target1" class="target"></div>\\n                          <div id="target2" class="target"></div>\\n                          <div id="target3" class="target"></div>\\n                          <div id="target4" class="target"></div>\\n                          <div id="target5" class="target"></div>\\n                          <div id="target6" class="target"></div>\\n                          <div id="target7" class="target"></div>\\n                        </div>\\n                        <div class="btn rest-btn fail">\\n                          <img src="\' + this.host + \'/statics/images/rest_btn.png">\\n                        </div>\\n                        <div class="btn next-btn fail">\\n                          <img src="\' + this.host + \'/statics/images/next_btn.png">\\n                        </div>\\n                      </div>\';\n  },\n  generate_page: function generate_page(firstImg, firstTitle) {\n    return \'\\n                  <header id="header">\\n                    <div class="animation-header">\\n                      <img id="title" src="\' + firstTitle + \'"/>\\n                    </div>\\n                  </header>\\n                  <div id="window">\\n                    <div class="animation-box \' + firstImg + \'"></div>\\n                  </div>\\n                  <div id="control">\\n                    <img id="control-play-btn" class="control-play-btn" src="\' + this.host + \'/statics/images/control_again_btn.png"/>\\n                    <div class="generate_btn">\\n                      <div id="reload_page"></div>\\n                      <div id="custome_btn"></div>\\n                    </div>\\n                  </div>\';\n  }\n};\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMzIuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZGVtbzEvc3RhdGljcy9qcy9kYXRhLmpzPzYyN2IiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICAvLyBob3N0OiAnaHR0cDovLzE5Mi4xNjguMC4xMDM6ODA4MCcsXG4gIGhvc3Q6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicgPyAnL21vYmlsZWRlbW8vZGVtbzEvZGlzdCcgOiAnaHR0cDovLzE5Mi4xNjguOTYuMTI6ODIwMCcsXG4gIGltZ3M6IFtcbiAgICAnL3N0YXRpY3MvaW1hZ2VzL3R1dG9yaWFsX2JnLnBuZycsXG4gICAgJy9zdGF0aWNzL2ltYWdlcy9ob21lX25vcm1hbC5wbmcnLFxuICAgICcvc3RhdGljcy9pbWFnZXMvbWFpbl9ub3JtYWwucG5nJyxcbiAgICAnL3N0YXRpY3MvaW1hZ2VzL2RyYWdnYWJsZV9yYWluLnBuZycsXG4gICAgJy9zdGF0aWNzL2ltYWdlcy9kcmFnZ2FibGVfaHVtaWRpdHkucG5nJyxcbiAgICAnL3N0YXRpY3MvaW1hZ2VzL2RyYWdnYWJsZV93aW5kLnBuZydcbiAgXSxcbiAgZ2VuZXJhbF9tb2R1bGU6IGZ1bmN0aW9uKGNhbGxiYWNrKXtcbiAgICBjb25zdCBtb2RhbF93cmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsX3dyYXBwZXInKTtcbiAgICBtb2RhbF93cmFwcGVyLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImdlbmVyYXRlLW1vZGFsXCI+XG4gICAgICAgICAgPGltZyBzcmM9XCIke3RoaXMuaG9zdH0vc3RhdGljcy9pbWFnZXMvZ2VuZXJhdGVfbW9kYWwucG5nXCIgLz5cbiAgICAgICAgICA8YSBjbGFzcz1cImdvWHByb1wiIGhyZWY9XCJodHRwOi8veHByby45MWN0Zi5jb21cIj48L2E+XG4gICAgICAgICAgPHNwYW4gaWQ9XCJjbG9zZV9idG5cIiBjbGFzcz1cImNsb3NlLWJ0blwiPlg8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8YXVkaW8gaWQ9XCJzb3VuZDFcIiBwcmVsb2FkPVwiYXV0b1wiPlxuICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHt0aGlzLmhvc3R9L3N0YXRpY3MvYXVkaW8vc291bmQxLm1wM1wiIHR5cGU9XCJhdWRpby9tcDNcIj5cbiAgICAgICAgPC9hdWRpbz5cbiAgICAgICAgPGF1ZGlvIGlkPVwic291bmQyXCIgcHJlbG9hZD1cImF1dG9cIj5cbiAgICAgICAgICA8c291cmNlIHNyYz1cIiR7dGhpcy5ob3N0fS9zdGF0aWNzL2F1ZGlvL3NvdW5kMi5tcDNcIiB0eXBlPVwiYXVkaW8vbXAzXCI+XG4gICAgICAgIDwvYXVkaW8+XG4gICAgICAgIDxhdWRpbyBpZD1cInNvdW5kM1wiIHByZWxvYWQ9XCJhdXRvXCI+XG4gICAgICAgICAgPHNvdXJjZSBzcmM9XCIke3RoaXMuaG9zdH0vc3RhdGljcy9hdWRpby9zb3VuZDMubXAzXCIgdHlwZT1cImF1ZGlvL21wM1wiPlxuICAgICAgICA8L2F1ZGlvPlxuICAgICAgICA8YXVkaW8gaWQ9XCJiZ21cIiBwcmVsb2FkPVwiYXV0b1wiIGxvb3A9XCJsb29wXCI+XG4gICAgICAgICAgPHNvdXJjZSBzcmM9XCIke3RoaXMuaG9zdH0vc3RhdGljcy9hdWRpby9iZ20ubXAzXCIgdHlwZT1cImF1ZGlvL21wM1wiPlxuICAgICAgICA8L2F1ZGlvPlxuICAgIGA7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe2NhbGxiYWNrKCl9LCAwKTtcbiAgfSxcbiAgaG9tZV9wYWdlOiBmdW5jdGlvbigpe1xuICAgICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICAgIDxoZWFkZXIgaWQ9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW5pbWF0aW9uLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3RoaXMuaG9zdH0vc3RhdGljcy9pbWFnZXMvaGVhZGVyX2luZm8ucG5nXCIvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgICAgICAgPGRpdiBpZD1cIndpbmRvd1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbmltYXRpb24tYm94IGhvbWUtbm9ybWFsXCI+PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGlkPVwiY29udHJvbFwiPlxuICAgICAgICAgICAgICAgIDxpbWcgaWQ9XCJjb250cm9sLXBsYXktYnRuXCIgY2xhc3M9XCJjb250cm9sLXBsYXktYnRuXCIgc3JjPVwiJHt0aGlzLmhvc3R9L3N0YXRpY3MvaW1hZ2VzL2NvbnRyb2xfcGxheV9idG4ucG5nXCIvPlxuICAgICAgICAgICAgICA8L2Rpdj5gXG4gIH0sXG4gIGRyYWdnYWJsZV9wYWdlOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgICAgICAgICAgIDxoZWFkZXIgaWQ9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJoZWFkZXItYmdcIiBzcmM9XCIke3RoaXMuaG9zdH0vc3RhdGljcy9pbWFnZXMvaGVhZGVyX2JnLnBuZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0dXRvcmlhbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInR1dG9yaWFsLWZpbmdlclwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJ3aW5kb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbmltYXRpb24tYm94IGFuaW1hdGlvbi1ub3JtYWxcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiY29udHJvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cImNvbnRyb2wtYmdcIiBzcmM9XCIke3RoaXMuaG9zdH0vc3RhdGljcy9pbWFnZXMvY29udHJvbF9iZy5wbmdcIiBhbHQ9XCJjb250cm9sX2JnXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cImRyYWdnZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJveCBkcmFnZ2VyMSBkcmFnZ2FibGVfcmFpblwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm94IGRyYWdnZXIyIGRyYWdnYWJsZV9odW1pZGl0eVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm94IGRyYWdnZXIzIGRyYWdnYWJsZV93aW5kXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YXJnZXQtZ3JvdXBzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJndWlkZVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwidGFyZ2V0MFwiIGNsYXNzPVwidGFyZ2V0XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJ0YXJnZXQxXCIgY2xhc3M9XCJ0YXJnZXRcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cInRhcmdldDJcIiBjbGFzcz1cInRhcmdldFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwidGFyZ2V0M1wiIGNsYXNzPVwidGFyZ2V0XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJ0YXJnZXQ0XCIgY2xhc3M9XCJ0YXJnZXRcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cInRhcmdldDVcIiBjbGFzcz1cInRhcmdldFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwidGFyZ2V0NlwiIGNsYXNzPVwidGFyZ2V0XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJ0YXJnZXQ3XCIgY2xhc3M9XCJ0YXJnZXRcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ0biByZXN0LWJ0biBmYWlsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHt0aGlzLmhvc3R9L3N0YXRpY3MvaW1hZ2VzL3Jlc3RfYnRuLnBuZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuIG5leHQtYnRuIGZhaWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3RoaXMuaG9zdH0vc3RhdGljcy9pbWFnZXMvbmV4dF9idG4ucG5nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gXG4gIH0sXG4gIGdlbmVyYXRlX3BhZ2U6IGZ1bmN0aW9uIChmaXJzdEltZywgZmlyc3RUaXRsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICAgICAgICA8aGVhZGVyIGlkPVwiaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbmltYXRpb24taGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGltZyBpZD1cInRpdGxlXCIgc3JjPVwiJHtmaXJzdFRpdGxlfVwiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJ3aW5kb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFuaW1hdGlvbi1ib3ggJHtmaXJzdEltZ31cIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cImNvbnRyb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBpZD1cImNvbnRyb2wtcGxheS1idG5cIiBjbGFzcz1cImNvbnRyb2wtcGxheS1idG5cIiBzcmM9XCIke3RoaXMuaG9zdH0vc3RhdGljcy9pbWFnZXMvY29udHJvbF9hZ2Fpbl9idG4ucG5nXCIvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2VuZXJhdGVfYnRuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cInJlbG9hZF9wYWdlXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cImN1c3RvbWVfYnRuXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+YFxuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGRlbW8xL3N0YXRpY3MvanMvZGF0YS5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUVBO0FBQ0E7QUFRQTtBQUNBO0FBQ0E7QUFtQkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBWUE7QUFDQTtBQUNBO0FBbUNBO0FBQ0E7QUFDQTtBQWdCQTtBQXRHQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///32\n')},4:function(module,exports,__webpack_require__){eval('// removed by extract-text-webpack-plugin\n    if(true) {\n      // 1522462758695\n      var cssReload = __webpack_require__(6)(module.i, {"fileMap":"{fileName}"});\n      module.hot.dispose(cssReload);\n      module.hot.accept(undefined, cssReload);\n    }\n  \n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2RlbW8xL3N0YXRpY3MvY3NzL2luZGV4LnN0eWw/MGE1YSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE1MjI0NjI3NTg2OTVcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1ob3QtbG9hZGVyL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wiZmlsZU1hcFwiOlwie2ZpbGVOYW1lfVwifSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZGVtbzEvc3RhdGljcy9jc3MvaW5kZXguc3R5bFxuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///4\n')}},[3]);