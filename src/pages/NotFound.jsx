import {Button} from "@/components/ui/button";

const NotFound = () => {
  return (
    <main>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
        <div className="max-w-lg mx-auto text-gray-600">
          <div className="space-y-3 text-center">
            <h3 className="text-primary font-semibold">404 Error</h3>
            <p className="text-gray-800 text-4xl font-semibold sm:text-5xl">
              Page not found
            </p>
            <p>
              Sorry, the page you are looking for could not be found or has been
              removed.
            </p>
          </div>
          <div className="mt-12 flex items-center justify-center gap-x-4">
            <Button variant="outline" size="lg">
              Go back to homepage
            </Button>
            <Button size="lg" onClick={() => window.location.reload()}>
              Reload page
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
