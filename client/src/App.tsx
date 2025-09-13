import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/UI/toaster.tsx";
import { TooltipProvider } from "@/components/UI/tooltip";
import Home from "@/pages/Home";
import Collections from "@/pages/Collections";
import CollectionPage from "@/pages/CollectionPage";
import RedCarpetPage from "@/pages/RedCarpetPage"; // Importar la nueva página
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      {/* La ruta dinámica ahora usa un render prop para pasar el slug */}
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
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
