import './App.css';
import {QueryClient, QueryClientProvider} from 'react-query';
import TheFarm from "./TheFarm";

function App() {
    const queryClient = new QueryClient();
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <TheFarm/>
            </QueryClientProvider>
        </div>
    );
}

export default App;
