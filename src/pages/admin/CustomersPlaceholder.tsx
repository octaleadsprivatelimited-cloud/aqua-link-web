import { useEffect, useState } from "react";
import { Loader2, Mail, MessageCircle, Phone, User } from "lucide-react";
import { subscribeEnquiries, type EnquiryRecord } from "@/lib/enquiries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CustomersPlaceholder() {
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const unsub = subscribeEnquiries(
      (items) => {
        setEnquiries(items);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading font-bold text-2xl text-foreground">Customer enquiries</h2>
        <p className="text-sm text-muted-foreground">
          Contact form submissions and WhatsApp intents from the site (saved to Firestore).
        </p>
      </div>

      {error && (
        <p className="text-sm text-destructive rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2">
          {error}
        </p>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Enquiry log
            {!loading && <span className="text-muted-foreground font-normal">({enquiries.length})</span>}
            {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {loading && enquiries.length === 0 ? (
            <p className="text-sm text-muted-foreground">Loading enquiries…</p>
          ) : enquiries.length === 0 ? (
            <p className="text-sm text-muted-foreground">No enquiries yet.</p>
          ) : (
            enquiries.map((enquiry) => (
              <div key={enquiry.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant={enquiry.kind === "contact_form" ? "default" : "secondary"}>
                    {enquiry.kind === "contact_form" ? "Contact form" : "WhatsApp"}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    {enquiry.source || "—"}
                  </span>
                  <span>•</span>
                  <span>
                    {enquiry.createdAt
                      ? enquiry.createdAt.toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : "—"}
                  </span>
                </div>

                {enquiry.kind === "contact_form" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    {enquiry.name && (
                      <div className="flex items-start gap-2">
                        <User className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Name</p>
                          <p className="font-medium text-foreground">{enquiry.name}</p>
                        </div>
                      </div>
                    )}
                    {enquiry.email && (
                      <div className="flex items-start gap-2">
                        <Mail className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Email</p>
                          <a href={`mailto:${enquiry.email}`} className="font-medium text-primary hover:underline break-all">
                            {enquiry.email}
                          </a>
                        </div>
                      </div>
                    )}
                    {enquiry.phone && (
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Phone</p>
                          <p className="font-medium text-foreground">{enquiry.phone}</p>
                        </div>
                      </div>
                    )}
                    {enquiry.subject && (
                      <div className="sm:col-span-2">
                        <p className="text-xs text-muted-foreground">Subject</p>
                        <p className="font-medium text-foreground">{enquiry.subject}</p>
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {enquiry.kind === "contact_form" ? "Message" : "Draft / intent"}
                  </p>
                  <p className="text-sm text-foreground whitespace-pre-wrap break-words">{enquiry.message}</p>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
