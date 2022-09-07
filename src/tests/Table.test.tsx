import { render, screen } from '@testing-library/react';
import Table from "../components/Table"
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
const queryClient = new QueryClient()

test('Table Renders Spinner', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Table data={[]} isLoading={true} isError={false}/>
    </QueryClientProvider>
  );
  
  expect(screen.getByText("Loading data...")).toBeInTheDocument();

});

test('Table Renders No Connection', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Table data={[]} isLoading={false} isError={true}/>
    </QueryClientProvider>
  );
  
  expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
  expect(screen.getByText("Please try again later.")).toBeInTheDocument();
});

test('Table Renders Emtpy Table', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Table data={[]} isLoading={false} isError={false}/>
    </QueryClientProvider>
  );
  
  expect(screen.getByText("Title")).toBeInTheDocument();
  expect(screen.getByText("Post Id")).toBeInTheDocument();
  expect(screen.getByText("User Name")).toBeInTheDocument();
});
