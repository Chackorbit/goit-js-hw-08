import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
getThrottleLoader();

player.on('timeupdate', throttle(onThrottle, 1000));

function onThrottle() {
  player
    .getCurrentTime()
    .then(function (seconds) {
      console.log(seconds);

      localStorage.setItem('time', JSON.stringify(seconds));
      // секунды = фактическое время, которое игрок стремился
    })

    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          //время было меньше 0 или больше продолжительности видео
          break;

        default:
          //произошла другая ошибка
          break;
      }
    });
}

function getThrottleLoader() {
  player.setCurrentTime(JSON.parse(localStorage.getItem('time')));
}
