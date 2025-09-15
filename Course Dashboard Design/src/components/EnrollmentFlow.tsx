import { useState, useEffect } from 'react';
import { CheckCircle, Clock, Users, Award, Shield, CreditCard, Loader2, X, ArrowRight, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { PaymentDialog } from './PaymentDialog';
import { toast } from 'sonner@2.0.3';

interface EnrollmentFlowProps {
  isOpen: boolean;
  onClose: () => void;
  course: {
    title: string;
    instructor: string;
    thumbnail: string;
    price: number;
    originalPrice?: number;
    isFree: boolean;
    rating: number;
    students: number;
    lessons: number;
    duration: string;
    description: string;
    whatYouLearn: string[];
    certificate: boolean;
    level: string;
  };
  onEnrollmentSuccess: () => void;
}

type EnrollmentStep = 'confirmation' | 'details' | 'payment' | 'processing' | 'success' | 'error';

export function EnrollmentFlow({ isOpen, onClose, course, onEnrollmentSuccess }: EnrollmentFlowProps) {
  const [currentStep, setCurrentStep] = useState<EnrollmentStep>('confirmation');
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [enrollmentProgress, setEnrollmentProgress] = useState(0);

  // Reset to confirmation step when dialog opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep('confirmation');
      setEnrollmentProgress(0);
      setShowPaymentDialog(false);
    }
  }, [isOpen]);

  const savings = course.originalPrice ? course.originalPrice - course.price : 0;
  const savingsPercentage = course.originalPrice ? Math.round((savings / course.originalPrice) * 100) : 0;

  const handleConfirmEnrollment = () => {
    setCurrentStep('details');
    setEnrollmentProgress(25);
  };

  const handleProceedToPayment = () => {
    if (course.isFree) {
      handleFreeEnrollment();
    } else {
      setCurrentStep('payment');
      setEnrollmentProgress(50);
    }
  };

  const handleFreeEnrollment = async () => {
    setCurrentStep('processing');
    setEnrollmentProgress(75);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setCurrentStep('success');
      setEnrollmentProgress(100);
      
      // Call success callback after a brief delay
      setTimeout(() => {
        onEnrollmentSuccess();
        onClose();
      }, 2000);

      toast.success('Enrollment successful!', {
        description: 'Welcome to your new course. Happy learning!',
      });

    } catch (error) {
      setCurrentStep('error');
      toast.error('Enrollment failed', {
        description: 'Something went wrong. Please try again.',
      });
    }
  };

  const handlePayment = () => {
    setShowPaymentDialog(true);
  };

  const handlePaymentSuccess = async () => {
    setShowPaymentDialog(false);
    setCurrentStep('processing');
    setEnrollmentProgress(75);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setCurrentStep('success');
      setEnrollmentProgress(100);
      
      // Call success callback after a brief delay
      setTimeout(() => {
        onEnrollmentSuccess();
        onClose();
      }, 2000);

      toast.success('Payment successful!', {
        description: 'Welcome to your new course. Happy learning!',
      });

    } catch (error) {
      setCurrentStep('error');
      toast.error('Enrollment failed', {
        description: 'Payment was successful but enrollment failed. Please contact support.',
      });
    }
  };

  const handleRetry = () => {
    setCurrentStep('confirmation');
    setEnrollmentProgress(0);
  };

  const renderStepIndicator = () => {
    const steps = [
      { key: 'confirmation', label: 'Confirm', completed: ['details', 'payment', 'processing', 'success'].includes(currentStep) },
      { key: 'details', label: 'Details', completed: ['payment', 'processing', 'success'].includes(currentStep) },
      { key: 'payment', label: course.isFree ? 'Enroll' : 'Payment', completed: ['success'].includes(currentStep) },
      { key: 'success', label: 'Complete', completed: currentStep === 'success' }
    ];

    return (
      <div className="flex items-center justify-center mb-6">
        {steps.map((step, index) => (
          <div key={step.key} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
              step.completed 
                ? 'bg-green-500 border-green-500 text-white' 
                : currentStep === step.key 
                  ? 'bg-purple-500 border-purple-500 text-white'
                  : 'bg-gray-100 border-gray-300 text-gray-500'
            }`}>
              {step.completed ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <span className="text-xs font-medium">{index + 1}</span>
              )}
            </div>
            <span className={`ml-2 text-sm font-medium ${
              step.completed || currentStep === step.key ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div className={`w-8 h-0.5 mx-3 ${
                step.completed ? 'bg-green-500' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderConfirmationStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {course.isFree ? 'Enroll in Free Course' : 'Ready to Enroll?'}
        </h3>
        <p className="text-muted-foreground">
          {course.isFree 
            ? 'Start your learning journey with this free course'
            : 'Join thousands of students and advance your skills'
          }
        </p>
      </div>

      <Card className="border border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <img 
              src={course.thumbnail} 
              alt={course.title}
              className="w-20 h-20 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-1">{course.title}</h4>
              <p className="text-sm text-muted-foreground mb-2">by {course.instructor}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.students.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              {course.isFree ? (
                <Badge className="bg-green-100 text-green-700">FREE</Badge>
              ) : (
                <div>
                  <div className="text-2xl font-bold text-purple-600">₹{course.price.toLocaleString('en-IN')}</div>
                  {course.originalPrice && course.originalPrice > course.price && (
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-muted-foreground line-through">₹{course.originalPrice.toLocaleString('en-IN')}</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {savingsPercentage}% OFF
                      </Badge>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button onClick={handleConfirmEnrollment} className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
          Continue <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderDetailsStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-foreground mb-2">Course Details</h3>
        <p className="text-muted-foreground">Review what you'll learn and course features</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="font-semibold text-foreground">{course.lessons} Lessons</div>
            <div className="text-sm text-muted-foreground">Comprehensive content</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="font-semibold text-foreground">{course.duration}</div>
            <div className="text-sm text-muted-foreground">Total duration</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="font-semibold text-foreground">Lifetime Access</div>
            <div className="text-sm text-muted-foreground">Learn at your pace</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="font-semibold text-foreground">
              {course.certificate ? 'Certificate' : 'No Certificate'}
            </div>
            <div className="text-sm text-muted-foreground">
              {course.certificate ? 'Upon completion' : 'Learning focused'}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">What You'll Learn</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {course.whatYouLearn.slice(0, 4).map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-foreground">{item}</span>
            </div>
          ))}
          {course.whatYouLearn.length > 4 && (
            <div className="text-sm text-muted-foreground mt-2">
              And {course.whatYouLearn.length - 4} more learning objectives...
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setCurrentStep('confirmation')} className="flex-1">
          Back
        </Button>
        <Button onClick={handleProceedToPayment} className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
          {course.isFree ? 'Enroll Now' : 'Proceed to Payment'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-foreground mb-2">Complete Payment</h3>
        <p className="text-muted-foreground">Secure payment to unlock your course</p>
      </div>

      <Card className="border border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground">{course.title}</h4>
              <p className="text-sm text-muted-foreground">by {course.instructor}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">₹{course.price.toLocaleString('en-IN')}</div>
              {savings > 0 && (
                <div className="text-sm text-green-600 font-medium">You save ₹{savings.toLocaleString('en-IN')}</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-green-50 p-4 rounded-xl border border-green-200">
        <div className="flex items-center gap-2 text-green-800 mb-2">
          <Shield className="w-5 h-5" />
          <span className="font-medium">Secure Payment Guarantee</span>
        </div>
        <p className="text-sm text-green-700">
          Your payment information is encrypted and secure. 30-day money-back guarantee.
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setCurrentStep('details')} className="flex-1">
          Back
        </Button>
        <Button onClick={handlePayment} className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
          <CreditCard className="w-4 h-4 mr-2" />
          Pay ₹{course.price.toLocaleString('en-IN')}
        </Button>
      </div>
    </div>
  );

  const renderProcessingStep = () => (
    <div className="text-center space-y-6">
      <div className="flex flex-col items-center">
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">Processing Enrollment</h3>
        <p className="text-muted-foreground">Please wait while we set up your course access...</p>
      </div>

      <div className="space-y-2">
        <Progress value={enrollmentProgress} className="h-2" />
        <div className="text-sm text-muted-foreground">{enrollmentProgress}% Complete</div>
      </div>

      <div className="bg-blue-50 p-4 rounded-xl">
        <p className="text-sm text-blue-800">
          We're preparing your course materials and setting up your learning dashboard.
        </p>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="text-center space-y-6">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Enrollment Successful!</h3>
        <p className="text-muted-foreground">Welcome to your new course. Let's start learning!</p>
      </div>

      <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <h4 className="font-semibold text-green-800 mb-3">What's Next?</h4>
          <div className="space-y-2 text-sm text-green-700">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Access all course videos and materials</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Track your learning progress</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Complete assignments and quizzes</span>
            </div>
            {course.certificate && (
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Earn your certificate upon completion</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Button onClick={onClose} className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
        Start Learning Now!
      </Button>
    </div>
  );

  const renderErrorStep = () => (
    <div className="text-center space-y-6">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4">
          <X className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Enrollment Failed</h3>
        <p className="text-muted-foreground">Something went wrong during the enrollment process.</p>
      </div>

      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-6">
          <p className="text-sm text-red-800">
            Don't worry! This is usually a temporary issue. Please try again, and if the problem persists, 
            contact our support team for assistance.
          </p>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onClose} className="flex-1">
          Close
        </Button>
        <Button onClick={handleRetry} className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
          Try Again
        </Button>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 'confirmation':
        return renderConfirmationStep();
      case 'details':
        return renderDetailsStep();
      case 'payment':
        return renderPaymentStep();
      case 'processing':
        return renderProcessingStep();
      case 'success':
        return renderSuccessStep();
      case 'error':
        return renderErrorStep();
      default:
        return renderConfirmationStep();
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl mx-auto max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center">
              {currentStep === 'success' ? 'Enrollment Complete' : 'Course Enrollment'}
            </DialogTitle>
            {!['processing', 'success', 'error'].includes(currentStep) && (
              <DialogDescription className="text-center">
                Follow the steps below to complete your enrollment
              </DialogDescription>
            )}
          </DialogHeader>

          <div className="space-y-6">
            {!['processing', 'success', 'error'].includes(currentStep) && renderStepIndicator()}
            {renderStepContent()}
          </div>
        </DialogContent>
      </Dialog>

      {showPaymentDialog && (
        <PaymentDialog
          isOpen={showPaymentDialog}
          onClose={() => setShowPaymentDialog(false)}
          courseTitle={course.title}
          price={course.price}
          originalPrice={course.originalPrice}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </>
  );
}