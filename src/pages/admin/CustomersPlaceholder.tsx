import { Users } from "lucide-react";

export default function CustomersPlaceholder() {
  return (
    <div className="text-center py-20">
      <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <h2 className="font-heading font-bold text-xl text-foreground">Customer Management</h2>
      <p className="text-sm text-muted-foreground mt-2">Coming soon — customer data will appear here once connected to a backend.</p>
    </div>
  );
}
