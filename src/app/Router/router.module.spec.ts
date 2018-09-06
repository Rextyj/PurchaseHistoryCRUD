import { AppRouterModule } from './router.module';

describe('RouterModule', () => {
  let routerModule: AppRouterModule;

  beforeEach(() => {
    routerModule = new AppRouterModule();
  });

  it('should create an instance', () => {
    expect(routerModule).toBeTruthy();
  });
});
