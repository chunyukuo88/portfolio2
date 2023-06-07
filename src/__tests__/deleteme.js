import { setupServer } from 'msw/node';
import { rest } from 'msw';

function getConfirmedWorkDaysURL(providerId) {
  return ${process.env.WORK_DAYS_APIGW_BASE}/providers/${providerId}/confirmedWorkDays;
}

function getPostSaveAvailabilityURL(providerId) {
  return ${process.env.CASE_DAY_CALENDAR_APIGW_BASE}/providers/${providerId}/availableDays;
}

function getPostCancelAvailabilityURL(providerId, availableDayId) {
  return ${process.env.CASE_DAY_CALENDAR_APIGW_BASE}/providers/${providerId}/availableDays/${availableDayId};
}

const providerId = 2313;
const providerIdNoCaseDays = 2000;
const providerIdConflicts = 3100;
const providerIdAddCancel = 3200;
const providerIdDesiredDaysThisMonth = 3400;

const auth = { providerId, accessToken: 'access_token' };
const authNoCaseDays = {
  providerId: providerIdNoCaseDays, accessToken: 'access_token', isLoginComplete: true,
};
const authConflicts = {
  providerId: providerIdConflicts, accessToken: 'access_token', isLoginComplete: true,
};
const authAddCancel = {
  providerId: providerIdAddCancel, accessToken: 'access_token', isLoginComplete: true,
};
const authDesireDaysThisMonth = { providerId: providerIdDesiredDaysThisMonth, accessToken: 'access_token', isLoginComplete: true };

const server = setupServer(
  /* regular tests */
  rest.get(
    getConfirmedWorkDaysURL(providerId),
    (req, res, ctx) => res(ctx.json(testConfirmedCaseDays)),
  ),

  /* Mock no case days */
  rest.get(
    getConfirmedWorkDaysURL(providerIdNoCaseDays),
    (req, res, ctx) => res(ctx.json([])),
  ),

  /* Mock confirmed and available days conflict */
  rest.get(
    getConfirmedWorkDaysURL(providerIdConflicts),
    (req, res, ctx) => res(ctx.json(testConfirmedCaseDaysConflicts)),
  ),

  /* Mock for adding and canceling availability */
  rest.get(
    getConfirmedWorkDaysURL(providerIdAddCancel),
    (req, res, ctx) => res(ctx.json([])),
  ),

  /* Mock for current month has desired days set */
  rest.get(
    getConfirmedWorkDaysURL(providerIdDesiredDaysThisMonth),
    (req, res, ctx) => res(ctx.json([])),
  ),

  /* Mock others */
  rest.post(
    getPostSaveAvailabilityURL(providerIdAddCancel),
    (req, res, ctx) => res(ctx.json(testSaveProviderAvailability)),
  ),
  rest.delete(
    getPostCancelAvailabilityURL(providerIdAddCancel, 123456),
    (req, res, ctx) => res(ctx.json(testCancelProviderAvailability)),
  ),
);

jest.mock('../../../shared/useAuthState');

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

describe('WHEN: No confirmed case days exists for the logged in provider', () => {
  beforeEach(() => {
    useAuthState.mockReturnValue(authNoCaseDays);
  });

  it('THEN: a CALENDAR label appears', async () => {
    render(<CalendarPage />, { wrapper: calendarWrapper() });

    const calendarLabelTextNode = await screen.findByText('CALENDAR');
    expect(calendarLabelTextNode).toBeInTheDocument();
  });
  it('THEN: all default calendar days appear', async () => {
    render(<CalendarPage />, { wrapper: calendarWrapper() });

    await screen.findByText('CALENDAR');

    const calendarDays = screen.queryAllByTestId('calendarCaseDay', { exact: false });
    expect(calendarDays).toHaveLength(31);
  });
  it('THEN: no confirmed case days appear', async () => {
    render(<CalendarPage />, { wrapper: calendarWrapper() });

    await screen.findByText('CALENDAR');

    const calendarContainer = screen.getByTestId('calendarContainer');
    const confirmedWorkDays = within(calendarContainer).queryAllByText('done');

    expect(confirmedWorkDays).toHaveLength(0);
  });
});
