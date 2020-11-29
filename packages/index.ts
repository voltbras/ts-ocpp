export * from './cs';
import WebsocketsOCPPServer from './cs/ws/server';

const server = new WebsocketsOCPPServer(8080, '0.0.0.0', (req, cpId) => {
  console.log({ req, cpId })
  return [{}, undefined]
});

