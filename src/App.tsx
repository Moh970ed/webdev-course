import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import ChapterLesson from "@/pages/ChapterLesson";
import QuizPage from "@/pages/QuizPage";
import ChallengesPage from "@/pages/ChallengesPage";
import ExamPage from "@/pages/ExamPage";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/chapter/:slug/quiz" component={QuizPage} />
        <Route path="/chapter/:slug/challenges" component={ChallengesPage} />
        <Route path="/chapter/:slug/exam" component={ExamPage} />
        <Route path="/chapter/:slug" component={ChapterLesson} />
        <Route>
          <div className="flex items-center justify-center min-h-[60vh] text-center px-4">
            <div>
              <div className="text-6xl mb-4">404</div>
              <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
              <p className="text-muted-foreground mb-4">The page you're looking for doesn't exist.</p>
              <a href="/" className="text-primary hover:underline font-medium">Go to Course Overview →</a>
            </div>
          </div>
        </Route>
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
