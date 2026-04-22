import { MessageCircle, Users } from "lucide-react";
import { useEnquiryStore } from "@/stores/enquiryStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomersPlaceholder() {
  const enquiries = useEnquiryStore((s) => s.enquiries);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading font-bold text-2xl text-foreground">Customer Enquiries</h2>
        <p className="text-sm text-muted-foreground">All WhatsApp redirect enquiries are listed here.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Enquiry Logs ({enquiries.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {enquiries.length === 0 ? (
            <p className="text-sm text-muted-foreground">No enquiries tracked yet.</p>
          ) : (
            enquiries.map((enquiry) => (
              <div key={enquiry.id} className="border rounded-lg p-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <MessageCircle className="h-3 w-3" />
                  <span>{enquiry.source}</span>
                  <span>•</span>
                  <span>{new Date(enquiry.createdAt).toLocaleString("en-IN")}</span>
                </div>
                <p className="text-sm text-foreground whitespace-pre-wrap">{enquiry.message}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
