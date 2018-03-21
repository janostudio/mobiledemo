export default {
  host: process.env.NODE_ENV === 'production' ? '.' : 'http://127.0.0.1:8080',//'http://192.168.37.104:8080',
  imgs: [
    '/statics/images/control_bg.png',
    '/statics/images/draggable_humidity.png',
    '/statics/images/draggable_rain.png',
    '/statics/images/draggable_wind.png',
    '/statics/images/header_bg.png',
    '/statics/images/humidity.png',
    '/statics/images/main_normal.png',
    '/statics/images/next_btn.png',
    '/statics/images/rain.png',
    '/statics/images/rest_btn.png',
    '/statics/images/wind.png',
  ],
  home_page: `
              <header id="header">
                <img class="header-bg" src="./statics/images/header_bg.png">
              </header>
              <div id="window">
                <div class="animation-header">
                  <img src="./statics/images/header_info.png"/>
                </div>
                <div class="animation-box home-normal"></div>
              </div>
              <div id="control">
                <img id="control-play-btn" class="control-play-btn" src="./statics/images/control_play_btn.png"/>
              </div>`,
  draggable_page: `
                      <header id="header">
                        <img class="header-bg" src="./statics/images/header_bg.png">
                      </header>
                      <div id="window">
                        <div class="animation-box animation-normal"></div>
                      </div>
                      <div id="control">
                        <img class="control-bg" src="./statics/images/control_bg.png" alt="control_bg"/>
                        <div id="dragger">
                          <div class="box dragger1 draggable_rain"></div>
                          <div class="box dragger2 draggable_humidity"></div>
                          <div class="box dragger3 draggable_wind"></div>
                        </div>
                        <div class="target-groups">
                          <div class="guide"></div>
                          <div id="target0" class="target"></div>
                          <div id="target1" class="target"></div>
                          <div id="target2" class="target"></div>
                          <div id="target3" class="target"></div>
                          <div id="target4" class="target"></div>
                          <div id="target5" class="target"></div>
                          <div id="target6" class="target"></div>
                          <div id="target7" class="target"></div>
                        </div>
                        <div class="btn rest-btn fail">
                          <img src="./statics/images/rest_btn.png">
                        </div>
                        <div class="btn next-btn fail">
                          <img src="./statics/images/next_btn.png">
                        </div>
                      </div>`,
  generate_page: `
                  <header id="header">
                    <img class="header-bg" src="./statics/images/header_bg.png">
                  </header>
                  <div id="window">
                    <div class="animation-header">
                      <img src="./statics/images/header_generate_info.png"/>
                    </div>
                    <div class="animation-box animation-normal"></div>
                  </div>
                  <div id="control">
                    <img id="control-play-btn" class="control-play-btn" src="./statics/images/control_again_btn.png"/>
                    <div class="generate_btn">
                      <div id="reload_page"></div>
                      <div id="custome_btn"></div>
                    </div>
                  </div>`
}