import fetchPaymentIntentClient from './fetchPaymentIntentClient';

describe('fetchPaymentIntentClient', () => {
  beforeEach(() => {
    // Mock the fetch function globally
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the client_secret for a successful fetch', async () => {
    const amount = 50;
    const mockClientSecret = 'mock-client-secret';

    // Mock the successful fetch response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ client_secret: mockClientSecret }),
    });

    const result = await fetchPaymentIntentClient(amount);
    expect(result).toBe(mockClientSecret);
  });

 

});