import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight, 
  CreditCard, 
  Landmark, 
  Check, 
  Phone, 
  Mail, 
  MapPin, 
  Building, 
  Lock, 
  Loader2, 
  Sparkles, 
  ArrowLeft, 
  Search, 
  Filter, 
  Star, 
  AlertCircle,
  HelpCircle,
  CheckCircle2
} from "lucide-react";
import { ProductItem, CartItem } from "../types";
import { KSH_PRODUCTS } from "../productsData";

interface ShopPageProps {
  cart: CartItem[];
  onAddToCart: (product: ProductItem) => void;
  onRemoveFromCart: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onApplyCartToQuote: () => void;
  onClearCart: () => void;
  onClose: () => void;
}

type CheckoutStep = "cart" | "details" | "payment" | "success";
type PaymentMethod = "mpesa" | "card" | "bank";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  mpesaPhone?: string;
  mpesaPinApproved?: string;
  cardHolder?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
}

export default function ShopPage({
  cart,
  onAddToCart,
  onRemoveFromCart,
  onUpdateQuantity,
  onApplyCartToQuote,
  onClearCart,
  onClose,
}: ShopPageProps) {
  const [step, setStep] = useState<CheckoutStep>("cart");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mpesa");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Checkout Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Nairobi");
  const [postalCode, setPostalCode] = useState("00100");

  // Payment info states
  const [mpesaPhone, setMpesaPhone] = useState("");
  const [mpesaStatus, setMpesaStatus] = useState<"idle" | "sending" | "confirmed">("idle");
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState("");

  // Inline Validation Errors
  const [errors, setErrors] = useState<FormErrors>({});

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const formatKSH = (val: number) => {
    return "KSH " + val.toLocaleString("en-KE");
  };

  // On-the-fly error clearing helper
  const clearError = (field: keyof FormErrors) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleNextToPayment = () => {
    const newErrors: FormErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }
    if (!email.trim()) {
      newErrors.email = "Corporate email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please specify a valid email address (e.g. user@company.com).";
    }
    if (!phone.trim()) {
      newErrors.phone = "Contact phone number is required.";
    } else if (phone.trim().length < 8) {
      newErrors.phone = "Phone number must be at least 8 digits.";
    }
    if (!address.trim()) {
      newErrors.address = "Corporate delivery / dispatch address is required.";
    }
    if (!city.trim()) {
      newErrors.city = "City is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Smooth scroll to the top of form errors if possible
      const formEl = document.getElementById("checkout-form-container");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    setErrors({});
    setStep("payment");
  };

  const handleMpesaSTKPush = () => {
    const newErrors: FormErrors = {};

    if (!mpesaPhone.trim()) {
      newErrors.mpesaPhone = "M-Pesa mobile number is required.";
    } else if (mpesaPhone.trim().replace(/\D/g, "").length < 9) {
      newErrors.mpesaPhone = "M-Pesa number must be a valid Ken-ya format (minimum 9 digits).";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setMpesaStatus("sending");
    setTimeout(() => {
      setMpesaStatus("confirmed");
    }, 4000);
  };

  const handlePlaceOrder = () => {
    const newErrors: FormErrors = {};

    if (paymentMethod === "mpesa" && mpesaStatus !== "confirmed") {
      newErrors.mpesaPinApproved = "Please request STK and enter PIN on your phone to authorize this transaction.";
    }

    if (paymentMethod === "card") {
      if (!cardHolder.trim()) {
        newErrors.cardHolder = "Cardholder full name is required.";
      }
      if (!cardNumber.trim()) {
        newErrors.cardNumber = "Credit card number is required.";
      } else if (cardNumber.replace(/\s/g, "").length < 15) {
        newErrors.cardNumber = "Specify a valid credit card number.";
      }
      if (!cardExpiry.trim()) {
        newErrors.cardExpiry = "Expiry date is required.";
      } else if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        newErrors.cardExpiry = "Expiry date must be formatted MM/YY.";
      }
      if (!cardCvv.trim()) {
        newErrors.cardCvv = "Security CVV code is required.";
      } else if (cardCvv.trim().length < 3) {
        newErrors.cardCvv = "CVV must be 3 or 4 digits.";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsProcessingOrder(true);
    setTimeout(() => {
      const orderId = `ZEN-2026-${Math.floor(Math.random() * 9000) + 1000}`;
      setGeneratedOrderId(orderId);
      setIsProcessingOrder(false);
      setStep("success");
    }, 2500);
  };

  const resetFlow = () => {
    setStep("cart");
    setMpesaStatus("idle");
    setMpesaPhone("");
    setCardHolder("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvv("");
    setIsProcessingOrder(false);
    setErrors({});
  };

  // Filter and search logic
  const filteredProducts = KSH_PRODUCTS.filter((prod) => {
    const matchesSearch = 
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "all" || 
      prod.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const categories = ["all", "Hardware", "Software", "Security", "Services"];

  return (
    <div className="w-full bg-slate-50 font-sans min-h-screen pb-20" id="zentricore-shop-page">
      {/* Page Hero Banner */}
      <div className="bg-slate-900 text-white py-12 px-4 relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3 max-w-2xl">
            <button 
              onClick={onClose} 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400 hover:text-teal-300 transition-colors"
              id="shop-back-to-home-link"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Portal
            </button>
            <h1 className="text-3xl font-extrabold tracking-tight uppercase sm:text-4xl">
              Corporate Hardware & Licensing
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              Equip your enterprise with certified hardware, verified software licensing, and priority support SLAs. Integrate items directly into official quotation and procurement budgets.
            </p>
          </div>
          
          <div className="bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-slate-700/60 text-center min-w-[200px]">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Shopping Cart</span>
            <span className="block text-2xl font-mono font-black text-teal-400 mt-1">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} Items
            </span>
            <span className="block text-xs text-slate-300 font-bold mt-1 font-mono">
              {formatKSH(totalAmount)}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        
        {/* Step Progress Indicators */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-teal-600" />
            <h2 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">
              Procurement & Checkout Workflow
            </h2>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {/* Step 1 */}
            <button 
              onClick={() => step !== "success" && setStep("cart")}
              className={`flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider py-1.5 px-3 rounded-lg transition-all ${
                step === "cart" 
                  ? "bg-teal-50 text-teal-700 border border-teal-200 font-extrabold" 
                  : "text-slate-400 hover:text-slate-700"
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-200/80 text-[10px] flex items-center justify-center font-bold">1</span>
              <span>Review Cart</span>
            </button>
            <span className="text-slate-300">/</span>

            {/* Step 2 */}
            <button 
              disabled={cart.length === 0 || step === "success"}
              onClick={() => setStep("details")}
              className={`flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider py-1.5 px-3 rounded-lg transition-all ${
                step === "details" 
                  ? "bg-teal-50 text-teal-700 border border-teal-200 font-extrabold" 
                  : "text-slate-400 hover:text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-200/80 text-[10px] flex items-center justify-center font-bold">2</span>
              <span>Customer Coordinates</span>
            </button>
            <span className="text-slate-300">/</span>

            {/* Step 3 */}
            <button 
              disabled={cart.length === 0 || step === "cart" || step === "success"}
              onClick={() => handleNextToPayment()}
              className={`flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider py-1.5 px-3 rounded-lg transition-all ${
                step === "payment" 
                  ? "bg-teal-50 text-teal-700 border border-teal-200 font-extrabold" 
                  : "text-slate-400 hover:text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-200/80 text-[10px] flex items-center justify-center font-bold">3</span>
              <span>Secure Payment</span>
            </button>
            <span className="text-slate-300">/</span>

            {/* Step 4 */}
            <div className={`flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider py-1.5 px-3 rounded-lg ${
              step === "success" 
                ? "bg-green-50 text-green-700 border border-green-200 font-extrabold" 
                : "text-slate-300"
            }`}>
              <span className="w-5 h-5 rounded-full bg-slate-100 text-[10px] flex items-center justify-center font-bold">4</span>
              <span>Order Complete</span>
            </div>
          </div>
        </div>

        {/* Dynamic Double Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Left Column (Product catalog or Cart details summary depending on step) */}
          <div className="lg:col-span-8 space-y-6">
            
            {step === "cart" && (
              <>
                {/* Search & Category Filter Panel */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                  {/* Search input */}
                  <div className="relative w-full md:max-w-sm">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search hardware, licensing, services..."
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none placeholder-slate-400 font-semibold"
                    />
                  </div>

                  {/* Category filters */}
                  <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto justify-start md:justify-end">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-2 text-[10px] uppercase font-bold tracking-wider rounded-lg transition-all border ${
                          selectedCategory.toLowerCase() === cat.toLowerCase()
                            ? "bg-slate-900 border-slate-900 text-white"
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Catalog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredProducts.length === 0 ? (
                    <div className="col-span-2 text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm">
                      <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-extrabold text-slate-900 uppercase">No matching products found</p>
                      <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1 leading-relaxed">
                        We couldn't find any products matching "{searchQuery}". Try refining your keywords or choosing another category.
                      </p>
                    </div>
                  ) : (
                    filteredProducts.map((prod) => {
                      const existingInCart = cart.find((item) => item.product.id === prod.id);
                      return (
                        <div
                          key={prod.id}
                          className="bg-white rounded-2xl border border-slate-100 hover:border-teal-200 transition-all flex flex-col hover:shadow-xl group overflow-hidden"
                        >
                          {/* Image and badge */}
                          <div className="h-44 w-full bg-slate-100 relative overflow-hidden flex-shrink-0">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                              <span className="text-[9px] font-extrabold text-teal-700 bg-teal-50 px-2 py-0.5 rounded uppercase tracking-wider border border-teal-100/50">
                                {prod.category}
                              </span>
                            </div>
                            <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white rounded-lg px-1.5 py-0.5 text-[10px] font-bold flex items-center gap-1">
                              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                              <span>{prod.rating}</span>
                            </div>
                          </div>

                          {/* Details content */}
                          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                            <div className="space-y-1.5">
                              <h3 className="font-extrabold text-slate-900 text-sm tracking-tight leading-tight group-hover:text-teal-700 transition-colors">
                                {prod.name}
                              </h3>
                              <p className="text-xs text-slate-400 font-medium leading-relaxed line-clamp-2">
                                {prod.description}
                              </p>
                              
                              {/* Features bullet checklist */}
                              <div className="pt-2.5 border-t border-slate-50 space-y-1">
                                {prod.features.slice(0, 3).map((feat, idx) => (
                                  <div key={idx} className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
                                    <Check className="w-3 h-3 text-teal-500 flex-shrink-0" />
                                    <span className="truncate">{feat}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Price / action footer */}
                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                              <div className="flex flex-col">
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-0.5">EST. VALUE</span>
                                <span className="font-mono font-black text-slate-950 text-sm">
                                  {formatKSH(prod.price)}
                                </span>
                              </div>

                              {existingInCart ? (
                                <div className="flex items-center gap-2 bg-slate-50 rounded-xl p-1 border border-slate-100 shadow-inner">
                                  <button
                                    onClick={() =>
                                      onUpdateQuantity(prod.id, existingInCart.quantity - 1)
                                    }
                                    className="p-1.5 rounded-lg hover:bg-white text-slate-500 hover:text-slate-900 transition-all shadow-sm"
                                  >
                                    <Minus className="w-3.5 h-3.5" />
                                  </button>
                                  <span className="text-xs font-bold px-1.5 min-w-5 text-center font-mono">
                                    {existingInCart.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      onUpdateQuantity(prod.id, existingInCart.quantity + 1)
                                    }
                                    className="p-1.5 rounded-lg hover:bg-white text-slate-500 hover:text-slate-900 transition-all shadow-sm"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => onAddToCart(prod)}
                                  className="text-[10px] uppercase tracking-wider font-extrabold bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-teal-600/10 hover:shadow-teal-600/20 active:translate-y-0"
                                >
                                  <Plus className="w-3.5 h-3.5 stroke-[3]" /> Add to cart
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </>
            )}

            {step === "details" && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6" id="checkout-form-container">
                <div className="flex items-start gap-3.5 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">Enterprise Customer Coordinates</h3>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed font-medium">
                      Specify official deployment coordinates and billing details. These map directly to corporate service logs and compliance catalogs.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* First name */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                          clearError("firstName");
                        }}
                        placeholder="John"
                        className={`w-full px-4 py-3 rounded-xl border text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none transition-all ${
                          errors.firstName ? "border-red-500 bg-red-50/10 focus:ring-red-500" : "border-slate-200 bg-slate-50/50"
                        }`}
                      />
                      {errors.firstName && (
                        <span className="flex items-center gap-1 text-[10px] text-red-500 font-bold mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.firstName}
                        </span>
                      )}
                    </div>

                    {/* Last name */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => {
                          setLastName(e.target.value);
                          clearError("lastName");
                        }}
                        placeholder="Doe"
                        className={`w-full px-4 py-3 rounded-xl border text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none transition-all ${
                          errors.lastName ? "border-red-500 bg-red-50/10 focus:ring-red-500" : "border-slate-200 bg-slate-50/50"
                        }`}
                      />
                      {errors.lastName && (
                        <span className="flex items-center gap-1 text-[10px] text-red-500 font-bold mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.lastName}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Corporate Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          clearError("email");
                        }}
                        placeholder="john@company.co.ke"
                        className={`w-full px-4 py-3 rounded-xl border text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none transition-all ${
                          errors.email ? "border-red-500 bg-red-50/10 focus:ring-red-500" : "border-slate-200 bg-slate-50/50"
                        }`}
                      />
                      {errors.email && (
                        <span className="flex items-center gap-1 text-[10px] text-red-500 font-bold mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.email}
                        </span>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Contact Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          clearError("phone");
                        }}
                        placeholder="+254 712 345 678"
                        className={`w-full px-4 py-3 rounded-xl border text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none transition-all ${
                          errors.phone ? "border-red-500 bg-red-50/10 focus:ring-red-500" : "border-slate-200 bg-slate-50/50"
                        }`}
                      />
                      {errors.phone && (
                        <span className="flex items-center gap-1 text-[10px] text-red-500 font-bold mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Company */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Your Enterprise Ltd"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  {/* Delivery address */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Delivery / Service Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        clearError("address");
                      }}
                      placeholder="Suite / Floor, Corporate Building, Street Address, Tech Zone"
                      rows={3}
                      className={`w-full px-4 py-3 rounded-xl border text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none transition-all ${
                        errors.address ? "border-red-500 bg-red-50/10 focus:ring-red-500" : "border-slate-200 bg-slate-50/50"
                      }`}
                    />
                    {errors.address && (
                      <span className="flex items-center gap-1 text-[10px] text-red-500 font-bold mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.address}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* City */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                          clearError("city");
                        }}
                        placeholder="Nairobi"
                        className={`w-full px-4 py-3 rounded-xl border text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none transition-all ${
                          errors.city ? "border-red-500 bg-red-50/10 focus:ring-red-500" : "border-slate-200 bg-slate-50/50"
                        }`}
                      />
                      {errors.city && (
                        <span className="flex items-center gap-1 text-[10px] text-red-500 font-bold mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.city}
                        </span>
                      )}
                    </div>

                    {/* Postal Code */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="00100"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom details action */}
                <div className="flex gap-4 pt-6 border-t border-slate-100">
                  <button
                    onClick={() => setStep("cart")}
                    className="flex-1 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Return to Cart
                  </button>
                  <button
                    onClick={handleNextToPayment}
                    className="flex-1 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md shadow-teal-600/10"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {step === "payment" && (
              <div className="space-y-6">
                
                {/* Gateway selector card */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                  <div className="flex items-start gap-3.5 pb-4 border-b border-slate-100">
                    <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">Select Secure Payment Gateway</h3>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed font-medium">
                        All payments are audited and guarded with a standard 256-bit secure SSL transport socket layer. Choose your billing route.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Mpesa gateway */}
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod("mpesa");
                        setErrors({});
                      }}
                      className={`p-4 rounded-2xl border-2 flex flex-col items-center text-center gap-3 transition-all ${
                        paymentMethod === "mpesa"
                          ? "border-teal-500 bg-teal-50/20"
                          : "border-slate-100 bg-white hover:border-slate-200"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-black text-sm shadow-sm">
                        M
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">M-Pesa Express</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">Immediate STK Prompt</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        paymentMethod === "mpesa" ? "border-teal-600 bg-teal-600 text-white" : "border-slate-200"
                      }`}>
                        {paymentMethod === "mpesa" && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>

                    {/* Credit Card gateway */}
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod("card");
                        setErrors({});
                      }}
                      className={`p-4 rounded-2xl border-2 flex flex-col items-center text-center gap-3 transition-all ${
                        paymentMethod === "card"
                          ? "border-teal-500 bg-teal-50/20"
                          : "border-slate-100 bg-white hover:border-slate-200"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-sm">
                        <CreditCard className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Credit Card</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">Instant Secure Charge</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        paymentMethod === "card" ? "border-teal-600 bg-teal-600 text-white" : "border-slate-200"
                      }`}>
                        {paymentMethod === "card" && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>

                    {/* Bank Wire gateway */}
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod("bank");
                        setErrors({});
                      }}
                      className={`p-4 rounded-2xl border-2 flex flex-col items-center text-center gap-3 transition-all ${
                        paymentMethod === "bank"
                          ? "border-teal-500 bg-teal-50/20"
                          : "border-slate-100 bg-white hover:border-slate-200"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-teal-800 flex items-center justify-center text-white shadow-sm">
                        <Landmark className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Bank Transfer</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">Pro-forma Corporate Invoice</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        paymentMethod === "bank" ? "border-teal-600 bg-teal-600 text-white" : "border-slate-200"
                      }`}>
                        {paymentMethod === "bank" && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  </div>

                  {/* Custom fields container based on chosen method */}
                  <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                    
                    {paymentMethod === "mpesa" && (
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">M-Pesa STK Push Parameters</h4>
                          <p className="text-xs text-slate-400 leading-relaxed font-medium">
                            An automated interactive push prompt will pop up on your mobile node. Simply insert your secure PIN code to authorize.
                          </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3 items-end">
                          <div className="flex-1 space-y-1.5 w-full">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                              M-Pesa Mobile Number <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              value={mpesaPhone}
                              onChange={(e) => {
                                setMpesaPhone(e.target.value);
                                clearError("mpesaPhone");
                                clearError("mpesaPinApproved");
                              }}
                              placeholder="e.g. 254712345678"
                              className={`w-full px-4 py-3 rounded-xl border text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none bg-white transition-all ${
                                errors.mpesaPhone ? "border-red-500 focus:ring-red-500" : "border-slate-200"
                              }`}
                            />
                          </div>
                          
                          <button
                            type="button"
                            onClick={handleMpesaSTKPush}
                            disabled={mpesaStatus === "sending" || mpesaStatus === "confirmed"}
                            className={`px-5 py-3 rounded-xl font-extrabold text-[10px] uppercase tracking-wider transition-all duration-300 w-full sm:w-auto text-center ${
                              mpesaStatus === "confirmed"
                                ? "bg-green-600 text-white cursor-default"
                                : mpesaStatus === "sending"
                                ? "bg-amber-100 text-amber-700 cursor-wait"
                                : "bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-600/10"
                            }`}
                          >
                            {mpesaStatus === "confirmed" && "PIN Approved"}
                            {mpesaStatus === "sending" && "Awaiting PIN..."}
                            {mpesaStatus === "idle" && "Request STK"}
                          </button>
                        </div>

                        {errors.mpesaPhone && (
                          <span className="flex items-center gap-1 text-[10px] text-red-500 font-bold">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.mpesaPhone}
                          </span>
                        )}

                        {mpesaStatus === "sending" && (
                          <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-100 flex items-center gap-2.5 text-xs text-amber-800 font-medium">
                            <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
                            <span>Simulating network push... Please check your mobile phone for the prompt.</span>
                          </div>
                        )}

                        {mpesaStatus === "confirmed" && (
                          <div className="p-3.5 bg-green-50 rounded-xl border border-green-100 flex items-center gap-2.5 text-xs text-green-800 font-medium">
                            <Check className="w-4 h-4 flex-shrink-0" />
                            <span>M-Pesa transaction approved successfully! PIN authentication complete.</span>
                          </div>
                        )}

                        {errors.mpesaPinApproved && (
                          <div className="p-3.5 bg-red-50 rounded-xl border border-red-100 flex items-center gap-2.5 text-xs text-red-800 font-bold">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <span>{errors.mpesaPinApproved}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {paymentMethod === "card" && (
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Credit Card Credentials</h4>
                          <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                            Input your credit card credentials. This transaction is logged and certified PCI-DSS compliant.
                          </p>
                        </div>

                        {/* Cardholder name */}
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            Cardholder Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={cardHolder}
                            onChange={(e) => {
                              setCardHolder(e.target.value);
                              clearError("cardHolder");
                            }}
                            placeholder="John Doe"
                            className={`w-full px-4 py-3 rounded-xl border text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none bg-white transition-all ${
                              errors.cardHolder ? "border-red-500 focus:ring-red-500" : "border-slate-200"
                            }`}
                          />
                          {errors.cardHolder && (
                            <span className="flex items-center gap-1 text-[10px] text-red-500 font-bold mt-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              {errors.cardHolder}
                            </span>
                          )}
                        </div>

                        {/* Card Number */}
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            Card Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => {
                              setCardNumber(e.target.value);
                              clearError("cardNumber");
                            }}
                            placeholder="4111 1111 1111 1111"
                            className={`w-full px-4 py-3 rounded-xl border text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none bg-white transition-all ${
                              errors.cardNumber ? "border-red-500 focus:ring-red-500" : "border-slate-200"
                            }`}
                          />
                          {errors.cardNumber && (
                            <span className="flex items-center gap-1 text-[10px] text-red-500 font-bold mt-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              {errors.cardNumber}
                            </span>
                          )}
                        </div>

                        {/* Expiry and CVV */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                              Expiry Date <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => {
                                setCardExpiry(e.target.value);
                                clearError("cardExpiry");
                              }}
                              placeholder="MM/YY"
                              className={`w-full px-4 py-3 rounded-xl border text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none bg-white transition-all ${
                                errors.cardExpiry ? "border-red-500 focus:ring-red-500" : "border-slate-200"
                              }`}
                            />
                            {errors.cardExpiry && (
                              <span className="flex items-center gap-1 text-[10px] text-red-500 font-bold mt-1">
                                <AlertCircle className="w-3.5 h-3.5" />
                                {errors.cardExpiry}
                              </span>
                            )}
                          </div>

                          <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                              Security CVV Code <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="password"
                              value={cardCvv}
                              onChange={(e) => {
                                setCardCvv(e.target.value);
                                clearError("cardCvv");
                              }}
                              placeholder="123"
                              maxLength={4}
                              className={`w-full px-4 py-3 rounded-xl border text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none bg-white transition-all ${
                                errors.cardCvv ? "border-red-500 focus:ring-red-500" : "border-slate-200"
                              }`}
                            />
                            {errors.cardCvv && (
                              <span className="flex items-center gap-1 text-[10px] text-red-500 font-bold mt-1">
                                <AlertCircle className="w-3.5 h-3.5" />
                                {errors.cardCvv}
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-[10px] text-slate-400 font-semibold flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-slate-300" /> Secure SSL socket protects credit credentials during verification loops.
                        </p>
                      </div>
                    )}

                    {paymentMethod === "bank" && (
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Equity Bank Transfer Ledger</h4>
                          <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                            Direct corporate bank transfer coordinates. Post order placement, a formal pro-forma invoice is dispatched to your registered email.
                          </p>
                        </div>
                        
                        <div className="text-xs text-slate-700 space-y-1.5 bg-white p-4 rounded-xl border border-slate-100 font-semibold font-mono">
                          <p className="flex justify-between border-b border-slate-50 pb-1.5"><span>BANK:</span> <strong className="text-slate-900">Equity Bank Kenya</strong></p>
                          <p className="flex justify-between border-b border-slate-50 pb-1.5"><span>HOLDER:</span> <strong className="text-slate-900">Zentricore IT Solutions Ltd</strong></p>
                          <p className="flex justify-between border-b border-slate-50 pb-1.5"><span>ACCOUNT:</span> <strong className="text-slate-900">1234567890123</strong></p>
                          <p className="flex justify-between border-b border-slate-50 pb-1.5"><span>BRANCH:</span> <strong className="text-slate-900">Nairobi CBD Branch</strong></p>
                          <p className="flex justify-between"><span>SWIFT CODE:</span> <strong className="text-slate-900">EQBLKENA</strong></p>
                        </div>
                        
                        <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                          Kindly specify the custom generated corporate order code as payment reference during wire dispatch.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Secure Payment details actions */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setStep("details")}
                    className="flex-1 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Back to Coordinates
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessingOrder}
                    className="flex-1 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    {isProcessingOrder ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing Order...
                      </>
                    ) : (
                      "Confirm & Place Order"
                    )}
                  </button>
                </div>
              </div>
            )}

            {step === "success" && (
              <div className="bg-white p-8 sm:p-12 text-center rounded-3xl border border-slate-100 shadow-lg space-y-6 max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-green-50 text-green-600 border border-green-100 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner animate-pulse">
                  <Check className="w-10 h-10 stroke-[3]" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Enterprise Order Confirmed!</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto font-semibold leading-relaxed">
                    Thank you for choosing Zentricore, {firstName}. Your corporate order has been successfully logged into our provisioning system.
                  </p>
                </div>

                <div className="p-5 bg-slate-50 border border-dashed border-teal-200 rounded-2xl max-w-sm mx-auto space-y-3 shadow-inner">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Corporate Order Code</span>
                  <span className="font-mono font-black text-teal-800 text-2xl block">{generatedOrderId}</span>
                  <span className="text-[11px] font-semibold text-slate-500 block leading-normal pt-1.5 border-t border-slate-100">
                    Pro-forma invoice and dispatch confirmation logs sent to: <strong className="text-slate-800 block mt-0.5">{email}</strong>
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                  <button
                    onClick={() => {
                      resetFlow();
                      onClearCart();
                      onClose();
                    }}
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
                  >
                    Return to Portal
                  </button>
                  <button
                    onClick={() => {
                      resetFlow();
                      onClearCart();
                    }}
                    className="px-6 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Browse More Products
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Sidebar Right Column (Order Review and quick cart summaries) */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6 sticky top-24">
              
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider flex items-center justify-between">
                  <span>Order Summary</span>
                  <span className="font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md text-[10px]">
                    {cart.reduce((s, i) => s + i.quantity, 0)} Items
                  </span>
                </h3>
              </div>

              {/* Items List */}
              {cart.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">Cart is empty</p>
                  <p className="text-[10px] text-slate-400 mt-1 font-medium max-w-[180px] mx-auto">
                    Select equipment from our catalog to get started.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs relative group"
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1 min-w-0 pr-6">
                        <h4 className="font-extrabold text-slate-900 text-xs truncate leading-normal">
                          {item.product.name}
                        </h4>
                        <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                          {item.quantity} x {formatKSH(item.product.price)}
                        </p>
                      </div>

                      <div className="absolute right-2 top-2 flex flex-col items-end gap-1">
                        <button
                          onClick={() => onRemoveFromCart(item.product.id)}
                          className="p-1 rounded hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono font-extrabold text-slate-800 text-[10px] mt-1 block">
                          {formatKSH(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Totals Summary */}
              <div className="border-t border-slate-100 pt-4 space-y-2.5 text-xs">
                <div className="flex justify-between items-center text-slate-400 font-semibold">
                  <span>Subtotal Value:</span>
                  <span className="font-mono text-slate-800">{formatKSH(totalAmount)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400 font-semibold">
                  <span>Priority Dispatch & VAT:</span>
                  <span className="text-teal-600 font-bold uppercase text-[10px]">INCLUDED</span>
                </div>
                
                <div className="border-t border-slate-100 pt-3.5 flex justify-between items-center">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[11px]">Total Value:</span>
                  <span className="text-lg font-mono font-black text-slate-900">
                    {formatKSH(totalAmount)}
                  </span>
                </div>
              </div>

              {/* Action Sidebar Buttons (for steps) */}
              {step !== "success" && (
                <div className="space-y-2.5 pt-2">
                  {step === "cart" && (
                    <>
                      <button
                        disabled={cart.length === 0}
                        onClick={() => setStep("details")}
                        className={`w-full py-3 rounded-xl font-extrabold flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all duration-300 ${
                          cart.length > 0
                            ? "bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/10 hover:-translate-y-0.5 active:translate-y-0"
                            : "bg-slate-100 text-slate-400 cursor-not-allowed"
                        }`}
                        id="sidebar-proceed-checkout"
                      >
                        Secure Checkout
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      
                      <button
                        disabled={cart.length === 0}
                        onClick={() => {
                          onApplyCartToQuote();
                          onClose();
                        }}
                        className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all border ${
                          cart.length > 0
                            ? "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                            : "border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        Apply as Estimate
                      </button>
                    </>
                  )}

                  {step === "details" && (
                    <button
                      onClick={handleNextToPayment}
                      className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-1.5"
                    >
                      Continue to Payment
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}

                  {step === "payment" && (
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isProcessingOrder}
                      className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-1.5"
                    >
                      {isProcessingOrder ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Confirm & Pay"
                      )}
                    </button>
                  )}
                </div>
              )}

              {/* Quality Shield Tag */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2 text-[10px] text-slate-400 leading-normal font-semibold">
                <Lock className="w-4 h-4 text-slate-300 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="uppercase text-slate-500 tracking-wider">ZENTRICORE GUARANTEE</p>
                  <p className="mt-0.5 font-medium font-sans">
                    All products are certified genuine, include a 5-year corporate warranty, and are eligible for our Managed IT SLA onboarding services.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
