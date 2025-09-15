import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const transactions = [
  {
    id: 1,
    description: "Data Science with Python & R",
    amount: 0,
    currency: "₹",
    status: "completed",
    date: "2024-12-15",
    method: "FREE"
  },
  {
    id: 2,
    description: "Complete Machine Learning & AI Bootcamp",
    amount: 7299,
    currency: "₹",
    status: "completed",
    date: "2024-12-10",
    method: "Google Pay"
  },
  {
    id: 3,
    description: "Cybersecurity Fundamentals & Ethical Hacking",
    amount: 9499,
    currency: "₹",
    status: "completed",
    date: "2024-12-05",
    method: "Paytm"
  },
  {
    id: 4,
    description: "Executive MBA Essentials",
    amount: 22099,
    currency: "₹",
    status: "completed",
    date: "2024-11-28",
    method: "SBI Debit Card"
  }
];

const paymentMethods = [
  {
    id: 1,
    type: "upi",
    name: "Google Pay",
    identifier: "john.doe@okaxis",
    icon: "🔵",
    primary: true
  },
  {
    id: 2,
    type: "upi",
    name: "PhonePe",
    identifier: "john.doe@ybl",
    icon: "🟣",
    primary: false
  },
  {
    id: 3,
    type: "card",
    name: "SBI Debit Card",
    identifier: "**** **** **** 4532",
    icon: "💳",
    primary: false
  },
  {
    id: 4,
    type: "upi",
    name: "Paytm",
    identifier: "9876543210@paytm",
    icon: "🔷",
    primary: false
  }
];

const upiApps = [
  { name: "Google Pay", icon: "🔵", id: "gpay" },
  { name: "PhonePe", icon: "🟣", id: "phonepe" },
  { name: "Paytm", icon: "🔷", id: "paytm" },
  { name: "Amazon Pay", icon: "🟠", id: "amazonpay" },
  { name: "BHIM UPI", icon: "🇮🇳", id: "bhim" },
  { name: "MobiKwik", icon: "🔴", id: "mobikwik" },
  { name: "Freecharge", icon: "🟡", id: "freecharge" },
  { name: "PayZapp", icon: "🔵", id: "payzapp" }
];

const subscriptionPlans = [
  {
    id: "basic",
    name: "Basic Plan",
    price: 999,
    period: "month",
    features: ["Access to 50+ courses", "Basic support", "Mobile app access", "Download for offline"]
  },
  {
    id: "pro",
    name: "Pro Plan",
    price: 1999,
    period: "month",
    features: ["Access to all courses", "Priority support", "Mobile & web access", "Download for offline", "Certificates", "Live sessions"]
  },
  {
    id: "premium",
    name: "Premium Plan",
    price: 14999,
    period: "year",
    features: ["Everything in Pro", "1-on-1 mentoring", "Career guidance", "Project reviews", "Job assistance", "Lifetime updates"]
  }
];

export function Payments() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddUPI, setShowAddUPI] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);
  const [selectedUPI, setSelectedUPI] = useState("");

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Payments & Billing</h1>
        <p className="text-gray-600">Manage your payment methods, view transaction history, and handle subscriptions</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="history">Transaction History</TabsTrigger>
          <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Current Plan</h3>
                <span className="text-2xl">💎</span>
              </div>
              <div className="text-2xl font-semibold text-purple-600 mb-1">Pro Plan</div>
              <p className="text-sm text-gray-600 mb-3">₹1,999/month</p>
              <Badge variant="secondary" className="bg-green-100 text-green-700">Active</Badge>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Total Spent</h3>
                <span className="text-2xl">💰</span>
              </div>
              <div className="text-2xl font-semibold text-blue-600 mb-1">₹38,897</div>
              <p className="text-sm text-gray-600">This year</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Next Billing</h3>
                <span className="text-2xl">📅</span>
              </div>
              <div className="text-2xl font-semibold text-orange-600 mb-1">Jan 15</div>
              <p className="text-sm text-gray-600">₹1,999 via Google Pay</p>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="flex items-center gap-2 p-4 h-auto">
                <span className="text-xl">🔵</span>
                <div className="text-left">
                  <div className="font-medium">Add UPI</div>
                  <div className="text-sm text-gray-600">Link your UPI ID</div>
                </div>
              </Button>
              <Button variant="outline" className="flex items-center gap-2 p-4 h-auto">
                <span className="text-xl">💳</span>
                <div className="text-left">
                  <div className="font-medium">Add Card</div>
                  <div className="text-sm text-gray-600">Credit/Debit card</div>
                </div>
              </Button>
              <Button variant="outline" className="flex items-center gap-2 p-4 h-auto">
                <span className="text-xl">📊</span>
                <div className="text-left">
                  <div className="font-medium">View Invoice</div>
                  <div className="text-sm text-gray-600">Download receipt</div>
                </div>
              </Button>
              <Button variant="outline" className="flex items-center gap-2 p-4 h-auto">
                <span className="text-xl">🔄</span>
                <div className="text-left">
                  <div className="font-medium">Auto-Pay</div>
                  <div className="text-sm text-gray-600">Manage settings</div>
                </div>
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Payment Methods Tab */}
        <TabsContent value="methods" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Your Payment Methods</h2>
            <div className="space-x-2">
              <Dialog open={showAddUPI} onOpenChange={setShowAddUPI}>
                <DialogTrigger asChild>
                  <Button variant="outline">Add UPI</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add UPI Payment Method</DialogTitle>
                    <DialogDescription>
                      Link your UPI ID to make quick and secure payments for courses and subscriptions.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="upi-app">Choose UPI App</Label>
                      <Select value={selectedUPI} onValueChange={setSelectedUPI}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your UPI app" />
                        </SelectTrigger>
                        <SelectContent>
                          {upiApps.map((app) => (
                            <SelectItem key={app.id} value={app.id}>
                              <div className="flex items-center gap-2">
                                <span>{app.icon}</span>
                                <span>{app.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="upi-id">UPI ID</Label>
                      <Input id="upi-id" placeholder="yourname@paytm" />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500">Add UPI Method</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={showAddCard} onOpenChange={setShowAddCard}>
                <DialogTrigger asChild>
                  <Button>Add Card</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Credit/Debit Card</DialogTitle>
                    <DialogDescription>
                      Add your credit or debit card details for secure payments. All card information is encrypted and stored safely.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="card-name">Cardholder Name</Label>
                      <Input id="card-name" placeholder="John Doe" />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500">Add Card</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <Card key={method.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{method.icon}</span>
                    <div>
                      <div className="font-medium text-gray-900">{method.name}</div>
                      <div className="text-sm text-gray-600">{method.identifier}</div>
                    </div>
                    {method.primary && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">Primary</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {!method.primary && (
                      <Button variant="ghost" size="sm">Set as Primary</Button>
                    )}
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">Remove</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Popular UPI Apps */}
          <Card className="p-6">
            <h3 className="font-medium text-gray-900 mb-4">Popular UPI Apps in India</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {upiApps.map((app) => (
                <div key={app.id} className="flex items-center gap-2 p-3 rounded-xl border hover:bg-gray-50 cursor-pointer transition-colors">
                  <span className="text-lg">{app.icon}</span>
                  <span className="text-sm font-medium">{app.name}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Transaction History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card className="p-6">
            <h3 className="font-medium text-gray-900 mb-4">Recent Transactions</h3>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id}>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{transaction.description}</div>
                      <div className="text-sm text-gray-600">
                        {transaction.date} • {transaction.method}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">
                        {transaction.amount === 0 ? 'FREE' : `${transaction.currency}${transaction.amount.toLocaleString('en-IN')}`}
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={transaction.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                  {transaction.id !== transactions[transactions.length - 1].id && <Separator />}
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Subscription Plans Tab */}
        <TabsContent value="plans" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Choose Your Learning Plan</h2>
            <p className="text-gray-600">Unlock premium features and accelerate your learning journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan) => (
              <Card key={plan.id} className={`p-6 ${plan.id === 'pro' ? 'ring-2 ring-purple-500 relative' : ''}`}>
                {plan.id === 'pro' && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-500">
                    Current Plan
                  </Badge>
                )}
                <div className="text-center mb-6">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900">₹{plan.price.toLocaleString('en-IN')}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${plan.id === 'pro' ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-500 to-blue-500'}`}
                  disabled={plan.id === 'pro'}
                >
                  {plan.id === 'pro' ? 'Current Plan' : `Upgrade to ${plan.name}`}
                </Button>
              </Card>
            ))}
          </div>

          {/* Payment Security */}
          <Card className="p-6">
            <h3 className="font-medium text-gray-900 mb-4">Payment Security</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <div className="font-medium text-gray-900">256-bit SSL</div>
                  <div className="text-sm text-gray-600">Encrypted transactions</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏦</span>
                <div>
                  <div className="font-medium text-gray-900">RBI Approved</div>
                  <div className="text-sm text-gray-600">Regulated payments</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📱</span>
                <div>
                  <div className="font-medium text-gray-900">UPI Certified</div>
                  <div className="text-sm text-gray-600">NPCI authorized</div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}