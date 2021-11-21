import { FC, MutableRefObject, useEffect, useRef, useState } from 'react';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';
import 'video.js/dist/video-js.css';

interface Props {
  options: VideoJsPlayerOptions;
}

const Player: FC<Props> = (props: Props) => {
  const { options } = props;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef: MutableRefObject<VideoJsPlayer | null> = useRef(null);
  const [streamIsNotAvailable, setStreamIsNotAvailable] = useState<boolean>(false);

  const onReady = (player: VideoJsPlayer) => {
    playerRef.current = player;

    player.on('waiting', () => {
      console.log('player is waiting');
    });

    player.on('dispose', () => {
      console.log('player will dispose');
    });

    player.on('error', () => {
      player.errorDisplay.close();
      player.hide();
      setStreamIsNotAvailable(true);
    });
  };

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs(videoElement, options, () => {
        console.log('player is ready');
        onReady(player);
      }));
    }
  }, [options]);

  useEffect(
    () => () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    },
    [],
  );

  return (
    <>
      <div data-vjs-player>
        <video ref={videoRef} className="video-js vjs-big-play-centered" />
      </div>
      {streamIsNotAvailable && <div>Stream is not available now!</div>}
    </>
  );
};

export default Player;
