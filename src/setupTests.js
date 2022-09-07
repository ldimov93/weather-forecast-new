const mockGeolocation = {
    getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
      Promise.resolve(
        success({
          coords: {
            latitude: 62.0397,
            longitude: 129.7422,
          },
        }),
      ),
    ),
  };
  
  global.navigator.geolocation = mockGeolocation;  