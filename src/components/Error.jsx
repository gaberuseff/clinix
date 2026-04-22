import {Button} from "./ui/button";

function Error({message = "An error occurred while fetching data."}) {
  return (
    <div className="flex w-full items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm">
      <span className="font-semibold text-destructive">Error:</span>
      <p className="flex-1 text-muted-foreground">{message}</p>
      <Button
        size="sm"
        variant="outline"
        onClick={() => window.location.reload()}>
        Retry
      </Button>
    </div>
  );
}

export default Error;
