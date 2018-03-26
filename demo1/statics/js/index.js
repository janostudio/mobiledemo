import dragula from 'dragula'
import data from './data'

// for hot update
if (module.hot) {
  module.hot.accept()
}


(function () {
  // To prevent Scroll event in mobile.
  document.body.addEventListener('touchmove', function (event) {
    event.preventDefault()
  }, {passive: false})

  /**
   * to show animate page
   */
  render_draggable_page()

})()

/**
 * draggable_page
 */
function render_draggable_page () {
  const loading = document.querySelector('.loading')
  const content = document.getElementById('content')
  const bgm = document.getElementById('bgm')

  lazy_load(data.imgs, () => {
    loading.style.opacity = 0
    setTimeout(function(){
      /**
       * load home page
       */
      home_anime()
      bgm.play()
    }, 1000)
  })
}

/**
 * home_page function
 */
function home_anime () {
  content.innerHTML = data.home_page()
  const control_play_btn = document.getElementById('control-play-btn')
  control_play_btn.addEventListener('click', main_anime, false)
}

/**
 * daggable_page function
 */
function main_anime () {
  content.innerHTML = data.draggable_page()
  const boxes = document.querySelectorAll('.box')
  const targets = document.querySelectorAll('.target')
  const guide = document.querySelector('.guide')
  const groups = document.querySelector('.target-groups')
  const anime_window = document.querySelector('.animation-box')
  const btn = document.querySelectorAll('.btn')
  const audio = {
    'animation-draggable_rain': document.getElementById("sound1"),
    'animation-draggable_humidity': document.getElementById("sound2"),
    'animation-draggable_wind': document.getElementById("sound3")
  }
  const target_width = parseFloat(getComputedStyle(targets[0], 'width'))
  const groups_width = parseFloat(getComputedStyle(groups, 'width'))
  const animation_image = Array(8).fill('animation-normal')
  let start
  const animationFrame = getAnimationFrame() 
  const cancelAnimation = cancelAnimationFrame()
  let animation
  const content_bg = document.getElementById("content-bg") 
  const tutorial = document.querySelector(".tutorial")
  setTimeout(function () {
    tutorial.className = 'tutorial hide'
  }, 4000)

  // boxes.forEach((item, index) => {
  //   item.addEventListener('touchstart', function (event) {
  //     event.stopPropagation();
  //   })
  // })

  /**
   * draggable with html5 origin API
   * but the API isn't valid in mobile.
   * so, I select draggble(https://github.com/Shopify/draggable/tree/master/src/Draggable).
   * *ondragstart ondrag *ondragend e.dataTransfer ondragenter *ondragover ondragleave *ondrop
   */
  // boxes.forEach((item, index) => {
  //   item.ondragstart = function (e) {
  //     e.dataTransfer.setData('bg', e.target.className.split(' ')[2])
  //   }
  // })
  // targets.forEach((item, index) => {
  //   item.ondragover = function (e) {
  //     event.preventDefault()
  //   }
  // })
  // targets.forEach((item, index) => {
  //   item.ondrop = function (e) {
  //     const bg = e.dataTransfer.getData('bg')
  //     e.target.className += ' noline ' + bg
  //     e.target.draggable = true
  //     animation_image[index] = 'animation-' + bg
  //     btn_class()
  //   }
  // })
  // targets.forEach((item, index) => {
  //   item.ondragend = function (e) {
  //     e.target.className = 'target'
  //     e.target.draggable = null
  //     animation_image[index] = 'animation-normal'
  //     btn_class()
  //   }
  // })

  /**
   * use dragula.js
   */
  dragula([document.getElementById('dragger'), groups], {
    copy: true,
    accepts: function (el, target_groups, source, target) {
      return target && target_groups === groups &&  target.id
    }
  }).on('drop', function (el, target_groups, source, target) {
    if (el.className.indexOf('box') > -1 && target &&  target.id) {
      const bg = el.className.split(' ')[2]
      const index = target.id.charAt(target.id.length - 1)
      // console.log([].indexOf.call(target.parentNode.childNodes, target))
      target.className = 'target noline ' + bg
      animation_image[index] = 'animation-' + bg
      btn_class()
    }
  }).on('out', function (el, container, source) {
    if (el.className.indexOf('noline') > -1) {
      const index = el.id.charAt(el.id.length - 1)
      const ele = document.getElementById(el.id)
      ele.className = 'target'
      animation_image[index] = 'animation-normal'
      btn_class()
    }
  })


  function guideAnimation (timestamp) {
    if (!start) start = timestamp
    var progress = (timestamp - start) * groups_width / 8000
    guide.style.transform = 'translateX(' + (progress - 60) + 'px)'
    /**
     * groups_width / target_width = 8, and we except the total animation length is 8 seconds.
     * so we can indicate when progress = 8000 we should reset timestamp.
     * speed = groups_width / 8000
     */ 
    const isRestart = Math.floor(progress / target_width)
    if (isRestart >= 8) {
      start = timestamp
    } else {
      content_bg.className = animation_image[isRestart].split('_')[1] || ''
      anime_window.className = 'animation-box ' + animation_image[isRestart]
      animation_image[isRestart] !== 'animation-normal' && audio[animation_image[isRestart]].play()
    }
    animation = animationFrame(guideAnimation)
  }

  function btn_class () {
    // fasle means there are all 'animation-normal', and the className should have 'fail'.
    let addClass = false
    animation_image.forEach((item) => {
      if (item !== 'animation-normal') {
        addClass = true
      }
    })
    btn.forEach((item) => {
      if (addClass) {
        item.className.indexOf('fail') > -1 && (item.className = item.className.split(' ').splice(0, 2).join(' '))
      } else {
        item.className.indexOf('fail') === -1 && (item.className += ' fail')
      }
    })
  }

  btn.forEach((item) => {
    if (item.className.indexOf('rest-btn') > 0) {
      // reset Animate
      item.addEventListener('click', function () {
        if (item.className.indexOf('fail') < 0) {
          for (let i = 0; i < 8; i++) {
            animation_image[i] = 'animation-normal'
            targets[i].className = 'target'
          }
        }
      }, false)
    } else {
      // generate Animate
      item.addEventListener('click', function () {
        if (item.className.indexOf('fail') < 0) {
          cancelAnimation(animation)
          generate_page(animation_image)
        }
      }, false)
    }
  })

  animationFrame(guideAnimation)
}

/**
 * load generate_page
 */
function generate_page (animation_image) {
  let index = 0
  const root_url = "./statics/images/"
  const content_bg = document.getElementById("content-bg")
  content.innerHTML = data.generate_page(animation_image[index++], root_url + "title_.png")
  content_bg.className = animation_image[index].split('_')[1]
  const title = document.getElementById("title")
  const anime_window = document.querySelector('.animation-box')
  const audio = {
    'animation-draggable_rain': document.getElementById("sound1"),
    'animation-draggable_humidity': document.getElementById("sound2"),
    'animation-draggable_wind': document.getElementById("sound3")
  }
  const reload_page = document.getElementById("reload_page")
  const custome_btn = document.getElementById("custome_btn")
  const modal_wrapper = document.getElementById("modal_wrapper")
  const close_btn = document.getElementById("close_btn")

  setTimeout(loop_animation, 1000)
  reload_page.addEventListener('click', function () {
    location.reload()
  }, false)
  custome_btn.addEventListener('click', function () {
    modal_wrapper.className = 'modal-wrapper'
  }, false)
  close_btn.addEventListener('click', function () {
    modal_wrapper.className = 'modal-wrapper hide'
  }, false)

  function loop_animation () {
    let animeType = animation_image[index].split('_')[1] || ''
    title.src = root_url + "title_" + animeType +".png"
    content_bg.className = animeType
    anime_window.className = 'animation-box ' + animation_image[index]
    animation_image[index] !== 'animation-normal' && audio[animation_image[index]].play()
    index === 7 ? index = 0 : index++
    setTimeout(loop_animation, 1000)
  }
}

/**
 * Unordered lazy load images
 * Until load all needed images, insert main html.
 */
function lazy_load (imgs, callback) {
  let count = 0
  const len = imgs.length
  const host = data.host  

  imgs.forEach((item) => {
    const imgObj = new Image()
    imgObj.onload = function () {
      if (++count === len) {
        callback()
      }
    }
    imgObj.onerror = function () {
      console.log(imgObj.src + ': can\'t be loaded.')
    }
    imgObj.src = host + item
  })
}

/**
 * get on-real time style about element
 */
function getComputedStyle(ele, style) {
  if (ele.currentStyle) {
    return ele.currentStyle[style]
  } else {
    return window.getComputedStyle(ele)[style]
  }
}

/**
 * 
 */
function getAnimationFrame () {
  return  window.requestAnimationFrame ||  
    window.webkitRequestAnimationFrame ||  
    window.mozRequestAnimationFrame    ||  
    function( callback ){  
      window.setTimeout(callback, 1000 / 60) 
    }
}
function cancelAnimationFrame () {
  return window.cancelAnimationFrame || 
    window.webkitCancelAnimationFrame ||  
    window.mozCancelAnimationFrame    
    // ||  
    // function( callback ){
    //   window.setTimeout(callback, 1000 / 60) 
    // }
}
