import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import WeddingPage from '@/pages/WeddingPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WeddingPage />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
