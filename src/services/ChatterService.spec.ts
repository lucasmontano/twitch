import ChatterService from './ChatterService';

describe('Testing Chatter Service', () => {
  describe('getViewers method', () => {
    it('should return an empty array or with viewers', async () => {
      const viewers = await ChatterService.getViewers();

      expect(viewers.length).toBeGreaterThanOrEqual(0);
    });
  });
});
