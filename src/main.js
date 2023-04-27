function updatePlayerStatus() {

  const audioPlayer = document.getElementById("masradio-audio-player");
  const header = document.getElementById("masradio-header");

  audioPlayer.updateMetadata().then(_ => {
    console.log("Updating data...", audioPlayer.isOnline);
    header.setOnlineStatus(audioPlayer.isOnline)
  });
}

export default Promise.all([
  customElements.whenDefined('header-component'),
  customElements.whenDefined('radiohosting-player')
]).then(_ => {
  updatePlayerStatus();
  setInterval(updatePlayerStatus, 5000);
})
