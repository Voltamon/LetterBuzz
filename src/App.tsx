import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/landing/Navbar";
import Index from "./pages/Index";



import NotFound from "./pages/NotFound";
import Payment from "./pages/Payment";
import HoverReceiver from "@/visual-edits/VisualEditsMessenger";
import AppPage from "./pages/AppPage";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

const AppLayout = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/app";

  return (
    <>
      <ScrollToTop />
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Index />} />


        <Route path="/payment" element={<Payment />} />
        <Route path="/app" element={<AppPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HoverReceiver />
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;