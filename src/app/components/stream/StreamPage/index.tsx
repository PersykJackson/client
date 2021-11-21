import { FC } from 'react';
import { useParams } from 'react-router';
import { VideoJsPlayerOptions } from 'video.js';
import { Box, Center } from '@chakra-ui/react';
import Player from '../Player';
import { HTTP_STREAM } from '../../../constants/api';

interface Params {
  id: string;
}

const StreamPage: FC = () => {
  const { id } = useParams<Params>();

  const playerOptions: VideoJsPlayerOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    liveui: true,
    sources: [
      {
        src: `${HTTP_STREAM}/live/${id}/index.m3u8`,
        type: 'application/x-mpegURL',
      },
    ],
  };

  return (
    <Center height="100%">
      <Box
        display="grid"
        gridTemplateColumns="70% 30%"
        width="90%"
        height="100%"
        backgroundColor="rgba(255, 255, 254, 0.5)"
      >
        <Center padding={10}>
          <Player options={playerOptions} />
        </Center>
        <Center backgroundColor="yellow">
          <div>Chat</div>
        </Center>
      </Box>
    </Center>
  );
};

export default StreamPage;
