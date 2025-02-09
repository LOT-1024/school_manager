'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AppSidebar } from '@/components/homeComponent/app-sidebar';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import LoadingPage from '@/components/LoadingPage';

// Sample data array for students
const students = [
  { studentId: 1, firstName: 'John', lastName: 'Doe', status: 'Active' },
  { studentId: 2, firstName: 'Jane', lastName: 'Smith', status: 'Inactive' },
  { studentId: 3, firstName: 'Alice', lastName: 'Johnson', status: 'Active' },
];

export default function SecurePage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Wait until the session status is determined.
    if (status === 'loading') return;
    if (!session) {
      router.replace('/login');
    }
  }, [session, status, router]);

  if (status === 'loading' || !session) {
    // While checking for the session, render a loading state.
    return <LoadingPage/>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h2 className="font-medium">Dashboard</h2>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
