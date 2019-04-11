import { PingController } from './ping.controller';
describe('PING UNIT TEST', () => {
  const pingController = new PingController();
  it('should return successful response', async () => {
    const response = generateMockResponse();
    const ping = await pingController.ping(response);
    expect(ping).toBeDefined();
    expect(ping.status).toBeDefined();
    expect(ping.status).toBe('success');
    expect(ping.message).toBe('Ping Successful');
  });

});

function generateMockResponse() {
  return {
    status: () => {},
  };
}
