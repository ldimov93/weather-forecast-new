import { ReactNode } from 'react';
import { render, renderHook } from '@testing-library/react';
import { screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@testing-library/jest-dom';
import Home from '../pages/index';
import { useForecast } from '../modules/weather/weather.store';
import { location } from '../mocks/geoLocation';

type WrapperProps = {
  children: ReactNode;
};

const queryClient = new QueryClient();
const wrapper = (props: WrapperProps) => (
  <QueryClientProvider client={queryClient}>
    {props.children}
  </QueryClientProvider>
);

describe('<Home />', () => {
  it('renders initial content', () => {
    render(wrapper({ children: <Home /> }));
    const weather = screen.queryByTestId('weather-wrapper');
    expect(weather).toBeInTheDocument();
  });

  it('gets api weather data', async () => {
    const { result } = renderHook(() => useForecast(location), { wrapper });
    await waitFor(() => result.current.isSuccess);
    expect(result.current.isSuccess).toBeTruthy();
  });
});
