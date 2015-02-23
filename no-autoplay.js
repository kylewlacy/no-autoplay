(function() {
  var videos = document.getElementsByTagName('video');
  var pausedVideos = [];

  var pauseVideo = function(video) {
    video.pause();
    if(pausedVideos.indexOf(video) < 0) {
      pausedVideos.push(video);
    }
  };

  var unpauseVideo = function(video) {
    var index = pausedVideos.indexOf(video);
    if(index >= 0) {
      pausedVideos.splice(index, 1);
      video.play();
    }
  };

  var unpauseAllVideos = function() {
    pausedVideos.forEach(function(video) {
      unpauseVideo(video);
    });
  };

  var pauseVideoUntilVisible = function(video) {
    video.addEventListener('playing', function(e) {
      if(document.hidden) {
        pauseVideo(video);
      }
      else {
        e.currentTarget.removeEventListener(e.type, arguments.callee);
      }
    });
  };

  if(document.hidden) {
    [].forEach.call(videos, pauseVideoUntilVisible);

    document.addEventListener('visibilitychange', function(e) {
      if(!document.hidden) {
        unpauseAllVideos();
      }
      else {
        e.currentTarget.removeEventListener(e.type, arguments.callee);
      }
    });
  }
})();
