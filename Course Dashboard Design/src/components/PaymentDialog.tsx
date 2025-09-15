import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { toast } from 'sonner@2.0.3';

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  price: number;
  originalPrice?: number;
  onSuccess: () => void;
}

const upiApps = [
  { name: "Google Pay", icon: "🔵", id: "gpay" },
  { name: "PhonePe", icon: "🟣", id: "phonepe" },
  { name: "Paytm", icon: "🔷", id: "paytm" },
  { name: "Amazon Pay", icon: "🟠", id: "amazonpay" },
  { name: "BHIM UPI", icon: "🇮🇳", id: "bhim" },
  { name: "MobiKwik", icon: "🔴", id: "mobikwik" }
];

export function PaymentDialog({ isOpen, onClose, courseTitle, price, originalPrice, onSuccess }: PaymentDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [selectedUPI, setSelectedUPI] = useState("gpay");
  const [isProcessing, setIsProcessing] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");

  const savings = originalPrice ? originalPrice - price : 0;
  const savingsPercentage = originalPrice ? Math.round((savings / originalPrice) * 100) : 0;

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onClose();
      onSuccess();
      toast.success("Payment successful! Welcome to the course!");
      
      // Reset form
      setUpiId("");
      setCardNumber("");
      setExpiryDate("");
      setCvv("");
      setCardholderName("");
    }, 2000);
  };

  const isFormValid = () => {
    if (paymentMethod === "upi") {
      return upiId.length > 0;
    } else if (paymentMethod === "card") {
      return cardNumber.length >= 16 && expiryDate.length >= 5 && cvv.length >= 3 && cardholderName.length > 0;
    }
    return false;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>Complete Your Purchase</DialogTitle>
          <DialogDescription>
            Choose your preferred payment method to enroll in this course.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Course Summary */}
          <Card className="p-4 bg-gray-50">
            <h4 className="font-medium text-gray-900 mb-2">{courseTitle}</h4>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">₹{price?.toLocaleString('en-IN') || '0'}</div>
                {originalPrice && originalPrice > price && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 line-through">₹{originalPrice.toLocaleString('en-IN')}</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      {savingsPercentage}% OFF
                    </Badge>
                  </div>
                )}
              </div>
              {savings > 0 && (
                <div className="text-right">
                  <div className="text-sm text-green-600">You save</div>
                  <div className="font-medium text-green-600">₹{savings.toLocaleString('en-IN')}</div>
                </div>
              )}
            </div>
          </Card>

          {/* Payment Method Selection */}
          <div>
            <Label className="text-base font-medium mb-3 block">Choose Payment Method</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2 p-3 border rounded-xl hover:bg-gray-50">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer flex-1">
                  <span className="text-lg">📱</span>
                  <span>UPI Payment</span>
                  <Badge variant="secondary" className="ml-auto">Instant</Badge>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-xl hover:bg-gray-50">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                  <span className="text-lg">💳</span>
                  <span>Credit/Debit Card</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* UPI Payment Form */}
          {paymentMethod === "upi" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="upi-app">Select UPI App</Label>
                <Select value={selectedUPI} onValueChange={setSelectedUPI}>
                  <SelectTrigger>
                    <SelectValue />
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
                <Input 
                  id="upi-id" 
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="yourname@paytm" 
                />
              </div>
            </div>
          )}

          {/* Card Payment Form */}
          {paymentMethod === "card" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="card-number">Card Number</Label>
                <Input 
                  id="card-number" 
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                  placeholder="1234 5678 9012 3456" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input 
                    id="expiry" 
                    value={expiryDate}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '');
                      if (value.length >= 2) {
                        value = value.slice(0, 2) + '/' + value.slice(2, 4);
                      }
                      setExpiryDate(value);
                    }}
                    placeholder="MM/YY" 
                    maxLength={5}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input 
                    id="cvv" 
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    placeholder="123" 
                    maxLength={3}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="cardholder-name">Cardholder Name</Label>
                <Input 
                  id="cardholder-name" 
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  placeholder="John Doe" 
                />
              </div>
            </div>
          )}

          {/* Security Info */}
          <div className="bg-blue-50 p-3 rounded-xl">
            <div className="flex items-center gap-2 text-blue-800">
              <span className="text-sm">🔒</span>
              <span className="text-sm font-medium">Secure Payment</span>
            </div>
            <p className="text-xs text-blue-700 mt-1">
              Your payment information is encrypted and secure. We don't store your card details.
            </p>
          </div>

          {/* Payment Button */}
          <Button 
            onClick={handlePayment}
            disabled={!isFormValid() || isProcessing}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing Payment...
              </div>
            ) : (
              `Pay ₹${price?.toLocaleString('en-IN') || '0'}`
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            By completing your purchase, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}