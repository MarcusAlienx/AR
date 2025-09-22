import React, { Suspense, lazy } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/UI/toaster.tsx";
import { TooltipProvider } from "@/components/UI/tooltip";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

const Home = lazy(() => import("@/pages/Home"));
const Collections = lazy(() => import("@/pages/Collections"));
const CollectionPage = lazy(() => import("@/pages/CollectionPage"));
const RedCarpetPage = lazy(() => import("@/pages/RedCarpetPage"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/collections/:slug">{params => <CollectionPage slug={params.slug} />}</Route>
      <Route path="/collections" component={Collections} />
      <Route path="/red-carpet/:slug">{params => <RedCarpetPage slug={params.slug} />}</Route>
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Suspense fallback={<div>Loading...</div>}>
              <Router />
            </Suspense>
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
