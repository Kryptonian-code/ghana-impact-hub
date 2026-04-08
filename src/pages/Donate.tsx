import { useState } from "react";
import { Link } from "react-router-dom";
import { useContent } from "@/contexts/ContentContext";
import { PageHero } from "@/components/shared/PageHero";
import { Heart } from "lucide-react";

export default function Donate() {
  const { campaigns, settings } = useContent();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const amounts = [50, 100, 200, 500, 1000];
  const activeCampaigns = campaigns.filter((c) => c.active);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <PageHero title="Thank You" breadcrumb={[{ label: "Home", href: "/" }, { label: "Donate" }]} />
        <section className="section-padding">
          <div className="container-narrow mx-auto text-center">
            <div className="bg-card rounded-xl border border-border p-12">
              <Heart className="w-12 h-12 text-gold-dark mx-auto mb-4" />
              <h2 className="text-2xl font-heading font-bold text-foreground">Thank You for Your Generosity</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-lg mx-auto">
                Your willingness to support our work means the world to us and to the communities we serve. Please follow the payment instructions below to complete your donation.
              </p>
              <div className="mt-8 text-left max-w-md mx-auto space-y-6">
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">Mobile Money (MoMo)</h3>
                  <p className="text-sm text-muted-foreground">Send your donation via MTN Mobile Money to 024 123 4567 ({settings.orgName}). Include your name as the reference.</p>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">Bank Transfer</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Bank: GCB Bank</p>
                    <p>Account Name: {settings.orgName}</p>
                    <p>Account Number: 1234567890</p>
                    <p>Branch: Independence Avenue, Accra</p>
                  </div>
                </div>
              </div>
              <Link to="/" className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-foreground hover:text-gold-dark">
                Return to Home
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        title="Support Our Work"
        subtitle="Your contribution helps us reach more communities and create lasting change across Ghana."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Donate" }]}
      />

      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Donation Form */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Make a Donation</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Select an amount (GHS)</label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {amounts.map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => { setSelectedAmount(a); setCustomAmount(""); }}
                        className={`py-3 rounded-lg text-sm font-semibold transition-colors ${
                          selectedAmount === a
                            ? "gradient-primary text-primary-foreground"
                            : "bg-card border border-border text-foreground hover:bg-muted"
                        }`}
                      >
                        GHS {a}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3">
                    <input
                      type="number"
                      placeholder="Or enter a custom amount"
                      value={customAmount}
                      onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                      className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Donation Purpose (optional)</label>
                  <input
                    type="text"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder="e.g., Education, Clean Water, General Support"
                    className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold rounded-lg gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  <Heart className="w-5 h-5" />
                  Proceed to Donate
                </button>
              </form>
            </div>

            {/* Campaigns + Info */}
            <div>
              {activeCampaigns.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Active Campaigns</h2>
                  <div className="space-y-6">
                    {activeCampaigns.map((c) => {
                      const progress = Math.min((c.raisedAmount / c.goalAmount) * 100, 100);
                      return (
                        <div key={c.id} className="bg-card rounded-xl border border-border p-6">
                          <h3 className="font-heading font-semibold text-foreground">{c.title}</h3>
                          <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
                          <div className="mt-4">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-foreground font-medium">GHS {c.raisedAmount.toLocaleString()} raised</span>
                              <span className="text-muted-foreground">Goal: GHS {c.goalAmount.toLocaleString()}</span>
                            </div>
                            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full gradient-gold rounded-full transition-all" style={{ width: `${progress}%` }} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="bg-surface-warm rounded-xl p-6">
                <h3 className="font-heading font-semibold text-foreground mb-4">How to Send Your Donation</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Mobile Money (MoMo)</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Send to 024 123 4567 ({settings.orgName}) via MTN Mobile Money. Include your name and purpose as the reference.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Bank Transfer</h4>
                    <div className="text-sm text-muted-foreground mt-1 space-y-0.5">
                      <p>Bank: GCB Bank</p>
                      <p>Account: {settings.orgName}</p>
                      <p>Account No: 1234567890</p>
                      <p>Branch: Independence Avenue, Accra</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
