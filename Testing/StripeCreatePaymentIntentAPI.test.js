import fetchPaymentIntentClient from '../screens/CourseEnrollmentPayment/fetchPaymentIntentClient';

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

  it('should throw an error for a network error', async () => {
    const amount = 50;

    // Mock a network error
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(fetchPaymentIntentClient(amount)).rejects.toThrow('Network error');
  });

  it('should throw an error for non-OK responses', async () => {
    const amount = 50;

    // Mock a non-OK response
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    await expect(fetchPaymentIntentClient(amount)).rejects.toThrow('Network response was not ok');
  });

});