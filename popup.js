document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('submit').addEventListener('click', () => {
    let getInputValueSubtitle = document.getElementById('subtitle').value;
    let getInputValueVideo = document.getElementById('video').value;
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, {
        status: 'changed',
        subtitleCssSelector: getInputValueSubtitle,
        videoCssSelector: getInputValueVideo
      });
    });
  });
});
