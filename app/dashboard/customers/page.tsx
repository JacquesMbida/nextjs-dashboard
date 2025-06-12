// import Pagination from '@/app/ui/invoices/pagination';
// import Search from '@/app/ui/search';
import Table from '@/app/ui/customers/table';
// import { CreateCustomer } from '@/app/ui/invoices/buttons';
// import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchCustomers } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customers',
};
 
export default async function Page() {
const customers = await fetchCustomers();
// console.log('Fetched customers:', customers);

// Map CustomerField[] to FormattedCustomersTable[]
  const formattedCustomers = customers.map((customer) => ({
    ...customer,
    id: customer.id ?? '',
    email: customer.email ?? '',
    name: customer.name ?? '',
    image_url: customer.image_url ?? '',
    total_invoices: customer.total_invoices ?? 0,
    total_pending: customer.total_pending ?? 0,
    total_paid: customer.total_paid ?? 0,
  }));

  return (
    <div className="w-full">
       <Suspense key="customers" fallback={<InvoicesTableSkeleton />}>
        <Table customers={formattedCustomers} />
        {/* query={query} currentPage={currentPage} */}
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}