import { WithChargePipe } from './with-charge.pipe';

describe('WithChargePipe', () => {
  it('create an instance', () => {
    const pipe = new WithChargePipe();
    expect(pipe).toBeTruthy();
  });
});
