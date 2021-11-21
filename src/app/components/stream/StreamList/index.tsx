import { FC, useEffect, useState } from 'react';
import { Box, Center, Image } from '@chakra-ui/react';
import { get } from '../../../request';
import { API, AVAILABLE_STREAMS, HTTP_STREAM, STREAM_IMAGE } from '../../../constants/api';
import { AvailableStreamsApiData } from '../../../interfaces/stream';

const StreamList: FC = () => {
  const [streams, setStreams] = useState<null | AvailableStreamsApiData>(null);

  useEffect(() => {
    (async () => {
      const availableStreams: AvailableStreamsApiData = (await get(HTTP_STREAM + AVAILABLE_STREAMS))
        ?.data as AvailableStreamsApiData;

      setStreams(availableStreams || null);
    })();
  }, []);

  return (
    <Center height="100%">
      <Box width="90%" height="100%" backgroundColor="rgba(255, 255, 254, 0.5)">
        <Center>
          <Box>
            <h3>Available streams</h3>
          </Box>
          <br />
        </Center>
        <Center>
          <Box display="grid" gridTemplateColumns="repeat(4, max-content)">
            {streams?.live ? (
              Object.values(streams.live).map(({ publisher }) => (
                <Center key={publisher.stream} margin={5}>
                  <a href={`/streams/${publisher.stream}`}>
                    <div>
                      <Image src={API + STREAM_IMAGE.replace(':key', publisher.stream)} alt="123" width={250} />
                      <Center>Test stream</Center>
                    </div>
                  </a>
                </Center>
              ))
            ) : (
              <div>No streams available</div>
            )}
          </Box>
        </Center>
      </Box>
    </Center>
  );
};

export default StreamList;
