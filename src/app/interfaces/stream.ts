export interface Audio {
  channels: number;
  codec: string;
  profile: string;
  samplerate: number;
}

export interface Video {
  height: number;
  width: number;
  codec: string;
  fps: number;
  level: number;
  profile: string;
}

export interface User {
  app: string;
  bytes: number;
  ip: string;
  stream: string;
  clientId: string;
  connectCreated: string;
}

export interface Publisher extends User {
  video: Video;
  audio: Audio;
}

export interface Subscriber extends User {
  protocol: string;
}

export interface Stream {
  publisher: Publisher;
  subscribers: Subscriber[];
}

export interface AvailableStreamsApiData {
  live: { [key: string]: Stream };
}
