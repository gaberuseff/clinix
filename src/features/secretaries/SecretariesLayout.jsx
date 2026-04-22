import CreateSecretary from "./CreateSecretary";
import SecretariesTable from "./SecretariesTable";

function SecretariesLayout() {
  return (
    <div className="space-y-8">
      <CreateSecretary />
      <SecretariesTable />
    </div>
  );
}

export default SecretariesLayout;
