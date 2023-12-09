import { QueryClient, QueryClientProvider } from 'react-query';
import Router from 'shared/Router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: Infinity //TODO : 서버 접근횟수 때문에 임시로 1회만 호출되도록
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
