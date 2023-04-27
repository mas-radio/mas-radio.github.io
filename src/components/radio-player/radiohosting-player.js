const playerTemplate = document.createElement('template');
const stylesheet = document.createElement("link");

const coverDataUrl = "https://tv.radiohosting.online:2020/AudioPlayer/8046/albumCover";
const playerInfoUrl = 'https://tv.radiohosting.online:2020/AudioPlayer/8046/playerInfo';
const default_cover_url = 'https://tv.radiohosting.online:2020/system/theme/Material/images/defaultCover/black-vinyl-record-playing-on-turntable-1389429.jpg';

stylesheet.setAttribute("rel", "stylesheet");
stylesheet.setAttribute("href", "components/radio-player/masradio-player.css");

playerTemplate.innerHTML = `
      <div class="masradio-reproductor-audio">
        <!--REPRODUCTOR -->

        <span class="album_cover">
          <img id="featured_image" src="components/radio-player/assets/listener.svg"/>
        </span>

        <span class="streaming_controls">
          <div class="controls">
            <div class="volume_controls">
              <button
                id="mute_button"
                class="speaker"
                onclick="this.getRootNode().host.toggleMute();">
                </button>
              <input
                onchange="this.getRootNode().host.audioPlayer.volume=this.value/100;"
                type="range"
                id="volume"
                name="volume"
                min="0"
                max="100" />
            </div>

            <div id="player_controls" class="player_controls">
              <button id="play_button" class="control_button play" onclick="this.getRootNode().host.togglePlay();"></button>
              <div class="track_data" >
                <span id="track_artist" class="track_artist"></span>
                <span id="track_title" class="track_title"></span>
              </div>
            </div>
          </div>
        </span>
        <!--FIN REPRODUCTOR -->
      </div>
`;

export default class RadioHostingPlayer extends HTMLElement {
  isOnline;
  playerInfoFetcherId;
  shadowRoot;
  streamUrl;

  constructor() {
    super();
    this.isOnline = false;
    this.streamUrl = this.getAttribute("src");
    this.initializeAudioStream();
    //this.updateMetadata();
  }

  connectedCallback() {
    this.shadowRoot = this.attachShadow({mode: 'closed'});
    this.shadowRoot.appendChild(playerTemplate.content);
    this.shadowRoot.appendChild(stylesheet);
  }

  initializeAudioStream() {
    this.audioPlayer = document.createElement("audio");

    this.audioPlayer.volume = 0.5;
    //  The next condition makes the player to break under Opera and Chrome
    //  if (document.audioPlayer.canPlayType("audio/aacp")) {
    this.audioPlayer.setAttribute("src", this.streamUrl);
    //  }
  }

  togglePlay() {
    if (this.audioPlayer.paused) {
      this.audioPlayer.play()
        .then(() => {
          this.shadowRoot.querySelector(".player_controls .control_button").className = "control_button stop";
        })
        .catch((e) => {
          console.error("Unable to play stream", e)
        });
    } else {
      this.audioPlayer.pause();
      this.shadowRoot.querySelector(".player_controls .control_button").className = "control_button play";
    }
  }
  toggleMute() {
    this.audioPlayer.muted = !this.audioPlayer.muted;
    this.shadowRoot.querySelector("#mute_button").classList.toggle("gray");
  }
  fetchTitle() {
    return fetch(playerInfoUrl)
      .then((data) => data.json())
      .then((json) => {
        json.nowplaying = json.nowplaying === 'Fuera de línea' ? undefined : json.nowplaying;
        return json.nowplaying;
      });
  }


  updateCover() {
    return fetch(coverDataUrl)
      .then(async (resp) => {
        const cover = await resp.json();
        const cover_img = document.querySelector('radiohosting-player').shadowRoot.querySelector("#featured_image");

        if (cover.coverImage !== default_cover_url) {
          cover_img.setAttribute("src", cover.coverImage);
        }
        return cover.coverImage;
      })
  }

  updateMetadata() {
    return this.fetchTitle().then(async (title) => {
      console.log("Resolving title", title);

      if (title != undefined) {
        this.isOnline = true;
        this.shadowRoot.querySelector('#play_button').classList.remove("disabled", "gray");
        this.audioPlayer.setAttribute("title", title);
        let artwork = [{src: default_cover_url}];
        let album = "Album no disponible"
        let artist = 'Más radio';

        if (navigator?.mediaSession?.metadata?.title != title) {
          if (title == '8046') {
            title = "Mucho más que una radio";
            artwork[0].src = default_cover_url;
          } else {
            artwork[0].src = await updateCover();
          }
          navigator.mediaSession.metadata = new MediaMetadata({
            title,
            artist,
            album,
            artwork,
          });
          this.shadowRoot.querySelector('#track_title').innerHTML = title;
          this.shadowRoot.querySelector('#track_artist').innerHTML = artist;
        }
      } else {
        this.isOnline = false;
        this.shadowRoot.querySelector('#track_artist').className = "offline";
        this.shadowRoot.querySelector('#play_button').classList.add("gray", "disabled");
      }
    })
      .catch((e) => {
        console.error("Error while fetching title", e);
      });
  }
}

customElements.define('radiohosting-player', RadioHostingPlayer);
