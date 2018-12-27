chrome.runtime.sendMessage({ todo: 'showPageAction' });
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.status === 'changed') {
    let oldText = '';
    let start = '';
    let store = [];
    let videoStatus = false;
    const getVideoElement = document.querySelector(request.videoCssSelector);
    const durationTime = getVideoElement.duration;

    getSubtitleText = () => {
      if (document.querySelector(`${request.subtitleCssSelector}`) !== null) {
        return document.querySelector(`${request.subtitleCssSelector}`)
          .innerText;
      }
      return null;
    };

    console.log('start');
    getVideoElement.addEventListener('play', () => {
      console.log('play');
      videoStatus = true;
      start = setInterval(() => {
        if (
          durationTime === getVideoElement.currentTime ||
          videoStatus === false
        ) {
          videoStatus = false;
          clearInterval(start);
          console.log('pause');
          return;
        }

        if (oldText !== getSubtitleText() && getSubtitleText() !== null) {
          oldText = getSubtitleText();
          store.push(oldText);
        }
      }, 500);
    });
    getVideoElement.addEventListener('pause', () => {
      console.log('pause');
      clearInterval(start);
      videoStatus = false;
      console.log(JSON.stringify(store));
    });
  }
});
