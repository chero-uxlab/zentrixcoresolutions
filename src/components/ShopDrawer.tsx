import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, CreditCard, Landmark, Check, Phone, Mail, MapPin, Building, Lock, Loader2, Sparkles } from "lucide-react";
import { ProductItem, CartItem } from "../types";
import { KSH_PRODUCTS } from "../productsData";

interface ShopDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onAddToCart: (product: ProductItem) => void;
  onRemoveFromCart: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onApplyCartToQuote: () => void;
  onClearCart: () => void;
}

type CheckoutStep = "cart" | "details" | "payment" | "success";
type PaymentMethod = "mpesa" | "card" | "bank";

export default function ShopDrawer({
  isOpen,
  onClose,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onUpdateQuantity,
  onApplyCartToQuote,
  onClearCart,
}: ShopDrawerProps) {
  const [step, setStep] = useState<CheckoutStep>("cart");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mpesa");
  
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

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const formatKSH = (val: number) => {
    return "KSH " + val.toLocaleString("en-KE");
  };

  const handleNextToPayment = () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      alert("Please populate all mandatory fields (*).");
      return;
    }
    setStep("payment");
  };

  const handleMpesaSTKPush = () => {
    if (!mpesaPhone.trim() || mpesaPhone.length < 9) {
      alert("Please specify a valid M-Pesa phone number.");
      return;
    }
    setMpesaStatus("sending");
    setTimeout(() => {
      setMpesaStatus("confirmed");
    }, 4000);
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === "mpesa" && mpesaStatus !== "confirmed") {
      alert("Please request and confirm M-Pesa PIN approval prior to finalizing.");
      return;
    }
    if (paymentMethod === "card") {
      if (!cardHolder.trim() || !cardNumber.trim() || !cardExpiry.trim() || !cardCvv.trim()) {
        alert("Please fill in credit card credentials.");
        return;
      }
    }

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
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              onClose();
              resetFlow();
            }}
            className="fixed inset-0 bg-slate-900 z-50 cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white shadow-2xl z-50 flex flex-col h-full font-sans"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-teal-600" />
                <h3 className="font-extrabold text-slate-900 text-base uppercase tracking-wider">
                  Zentricore IT Shop
                </h3>
              </div>
              <button
                onClick={() => {
                  onClose();
                  resetFlow();
                }}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
                id="close-shop-drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stepper Breadcrumbs */}
            {step !== "cart" && (
              <div className="bg-slate-100/60 px-6 py-3 border-b border-slate-100 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <span className={step === "details" ? "text-teal-600 font-extrabold" : "text-slate-400"}>1. Customer Details</span>
                <span className="text-slate-300">/</span>
                <span className={step === "payment" ? "text-teal-600 font-extrabold" : "text-slate-400"}>2. Secure Payment</span>
                <span className="text-slate-300">/</span>
                <span className={step === "success" ? "text-teal-600 font-extrabold" : "text-slate-400"}>3. Complete</span>
              </div>
            )}

            {/* Scrollable Content wrapper based on current state */}
            <div className="flex-1 overflow-y-auto p-6">
              {step === "cart" && (
                <div className="space-y-8">
                  {/* Product catalog */}
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-orange-400 animate-pulse" /> Corporate Hardware & Licensing
                    </h4>
                    <div className="space-y-4">
                      {KSH_PRODUCTS.map((prod) => {
                        const existingInCart = cart.find((item) => item.product.id === prod.id);
                        return (
                          <div
                            key={prod.id}
                            className="p-4 rounded-2xl border border-slate-100 hover:border-teal-200 transition-all flex gap-3 bg-white hover:shadow-md"
                          >
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-50 flex-shrink-0 relative">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                              <div>
                                <span className="inline-block text-[9px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded uppercase tracking-wider mb-1">
                                  {prod.category}
                                </span>
                                <h5 className="font-extrabold text-slate-900 text-sm truncate">
                                  {prod.name}
                                </h5>
                                <p className="text-[11px] text-slate-400 leading-normal line-clamp-2 mt-0.5">
                                  {prod.description}
                                </p>
                              </div>
                              <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-50">
                                <span className="font-mono font-extrabold text-xs text-slate-900">
                                  {formatKSH(prod.price)}
                                </span>
                                {existingInCart ? (
                                  <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-1 border border-slate-100">
                                    <button
                                      onClick={() =>
                                        onUpdateQuantity(prod.id, existingInCart.quantity - 1)
                                      }
                                      className="p-1 rounded hover:bg-white text-slate-500"
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="text-xs font-bold px-1 min-w-4 text-center">
                                      {existingInCart.quantity}
                                    </span>
                                    <button
                                      onClick={() =>
                                        onUpdateQuantity(prod.id, existingInCart.quantity + 1)
                                      }
                                      className="p-1 rounded hover:bg-white text-slate-500"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => onAddToCart(prod)}
                                    className="text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-sm"
                                  >
                                    <Plus className="w-3 h-3" /> Add
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Cart summary */}
                  <div className="border-t border-slate-100 pt-6">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">
                      My Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)} items)
                    </h4>
                    {cart.length === 0 ? (
                      <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">Your cart is empty.</p>
                        <p className="text-xs text-slate-400 mt-1 font-medium">Add premium items above to build your order.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {cart.map((item) => (
                          <div
                            key={item.product.id}
                            className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-sm"
                          >
                            <div className="min-w-0 pr-2">
                              <p className="font-extrabold text-slate-900 truncate text-xs">
                                {item.product.name}
                              </p>
                              <p className="text-[11px] text-slate-400 font-medium">
                                {item.quantity} x {formatKSH(item.product.price)}
                              </p>
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0">
                              <span className="font-mono font-extrabold text-slate-800 text-xs">
                                {formatKSH(item.product.price * item.quantity)}
                              </span>
                              <button
                                onClick={() => onRemoveFromCart(item.product.id)}
                                className="p-1 rounded text-slate-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {step === "details" && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-100 flex items-start gap-3">
                    <Building className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h5 className="font-bold text-xs text-teal-900 uppercase">Enterprise Dispatch</h5>
                      <p className="text-xs text-teal-700 leading-relaxed font-medium">
                        Fill in your business coordinates. These details will map to your official invoice and service provisioning documents.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-500 uppercase">First Name *</label>
                        <input
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="John"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-500 uppercase">Last Name *</label>
                        <input
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Doe"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-500 uppercase">Corporate Email *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@company.co.ke"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-500 uppercase">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+254 712 345 678"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-slate-500 uppercase">Company Name</label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Your Company Ltd"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-slate-500 uppercase">Delivery / Service Address *</label>
                      <textarea
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Suite, Building, Street Address"
                        rows={2}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-500 uppercase">City *</label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Nairobi"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-500 uppercase">Postal Code</label>
                        <input
                          type="text"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          placeholder="00100"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === "payment" && (
                <div className="space-y-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Select Secure Payment Gateway</h4>
                  
                  {/* Selection List */}
                  <div className="space-y-3">
                    {/* M-Pesa option */}
                    <button
                      onClick={() => setPaymentMethod("mpesa")}
                      className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all ${
                        paymentMethod === "mpesa"
                          ? "border-teal-500 bg-teal-50/20"
                          : "border-slate-100 bg-white hover:border-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-green-500 flex items-center justify-center text-white font-extrabold text-xs shadow-sm">
                          M
                        </div>
                        <div className="text-left">
                          <p className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">M-Pesa Express</p>
                          <p className="text-[10px] text-slate-500">Instant STK Push trigger</p>
                        </div>
                      </div>
                      <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${
                        paymentMethod === "mpesa" ? "border-teal-600 bg-teal-600 text-white" : "border-slate-200"
                      }`}>
                        {paymentMethod === "mpesa" && <Check className="w-3 h-3" />}
                      </div>
                    </button>

                    {/* Card option */}
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all ${
                        paymentMethod === "card"
                          ? "border-teal-500 bg-teal-50/20"
                          : "border-slate-100 bg-white hover:border-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center text-white shadow-sm">
                          <CreditCard className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <p className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Credit or Debit Card</p>
                          <p className="text-[10px] text-slate-500">Secure 256-bit encrypted checkout</p>
                        </div>
                      </div>
                      <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${
                        paymentMethod === "card" ? "border-teal-600 bg-teal-600 text-white" : "border-slate-200"
                      }`}>
                        {paymentMethod === "card" && <Check className="w-3 h-3" />}
                      </div>
                    </button>

                    {/* Bank option */}
                    <button
                      onClick={() => setPaymentMethod("bank")}
                      className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all ${
                        paymentMethod === "bank"
                          ? "border-teal-500 bg-teal-50/20"
                          : "border-slate-100 bg-white hover:border-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-teal-800 flex items-center justify-center text-white shadow-sm">
                          <Landmark className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <p className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Equity Bank Transfer</p>
                          <p className="text-[10px] text-slate-500">Direct manual transfer with invoice</p>
                        </div>
                      </div>
                      <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${
                        paymentMethod === "bank" ? "border-teal-600 bg-teal-600 text-white" : "border-slate-200"
                      }`}>
                        {paymentMethod === "bank" && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  </div>

                  {/* Payment Details Container */}
                  <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                    {paymentMethod === "mpesa" && (
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <h5 className="font-extrabold text-xs text-slate-900 uppercase">M-Pesa STK Push Parameters</h5>
                          <p className="text-xs text-slate-500 leading-normal">
                            An automated interactive push prompt will pop up on your mobile node. Simply insert your security PIN code.
                          </p>
                        </div>
                        <div className="flex gap-2 items-end">
                          <div className="flex-1 space-y-1">
                            <label className="block text-[9px] font-bold text-slate-500 uppercase">M-Pesa Mobile Number *</label>
                            <input
                              type="tel"
                              value={mpesaPhone}
                              onChange={(e) => setMpesaPhone(e.target.value)}
                              placeholder="e.g. 254712345678"
                              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none bg-white"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={handleMpesaSTKPush}
                            disabled={mpesaStatus === "sending" || mpesaStatus === "confirmed"}
                            className={`px-4 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-wider transition-all duration-300 ${
                              mpesaStatus === "confirmed"
                                ? "bg-green-600 text-white"
                                : mpesaStatus === "sending"
                                ? "bg-amber-100 text-amber-700 cursor-wait"
                                : "bg-teal-600 hover:bg-teal-700 text-white"
                            }`}
                          >
                            {mpesaStatus === "confirmed" && "PIN Approved"}
                            {mpesaStatus === "sending" && "Awaiting PIN..."}
                            {mpesaStatus === "idle" && "Request STK"}
                          </button>
                        </div>
                        {mpesaStatus === "sending" && (
                          <div className="p-3 bg-amber-50 rounded-lg border border-amber-100 flex items-center gap-2 text-xs text-amber-800">
                            <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
                            <span>Simulating network push... Please check your mobile phone.</span>
                          </div>
                        )}
                        {mpesaStatus === "confirmed" && (
                          <div className="p-3 bg-green-50 rounded-lg border border-green-100 flex items-center gap-2 text-xs text-green-800">
                            <Check className="w-4 h-4 flex-shrink-0" />
                            <span>M-Pesa transaction approved successfully! PIN authentication complete.</span>
                          </div>
                        )}
                      </div>
                    )}

                    {paymentMethod === "card" && (
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="block text-[9px] font-bold text-slate-500 uppercase">Cardholder Name *</label>
                          <input
                            type="text"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            placeholder="John Doe"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none bg-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[9px] font-bold text-slate-500 uppercase">Card Number *</label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4111 1111 1111 1111"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none bg-white"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="block text-[9px] font-bold text-slate-500 uppercase">Expiry Date *</label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="MM/YY"
                              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none bg-white"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[9px] font-bold text-slate-500 uppercase">CVV Security Code *</label>
                            <input
                              type="password"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              placeholder="123"
                              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none bg-white"
                            />
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5 text-slate-300" /> Standard 256-bit encryption safeguards card operations.
                        </p>
                      </div>
                    )}

                    {paymentMethod === "bank" && (
                      <div className="space-y-3 font-medium">
                        <h5 className="font-extrabold text-xs text-slate-950 uppercase">Equity Bank Transfer Ledger</h5>
                        <div className="text-xs text-slate-600 space-y-1 bg-white p-3.5 rounded-xl border border-slate-100">
                          <p><strong>Bank:</strong> Equity Bank Kenya</p>
                          <p><strong>Account Name:</strong> Zentricore IT Solutions Ltd</p>
                          <p><strong>Account Number:</strong> 1234567890123</p>
                          <p><strong>Branch:</strong> Nairobi CBD</p>
                          <p><strong>SWIFT Code:</strong> EQBLKENA</p>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-normal">
                          Kindly append your corporate order code (generated post-checkout) as payment reference during wire.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {step === "success" && (
                <div className="py-12 text-center space-y-6">
                  <div className="w-20 h-20 bg-green-50 text-green-600 border border-green-100 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner">
                    <Check className="w-10 h-10 stroke-[3]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold text-slate-900 uppercase">Payment Confirmed!</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">
                      Thank you for your order, {firstName}. Zentricore IT Solutions has logged your transaction and allocated resources.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-dashed border-teal-200 rounded-2xl max-w-sm mx-auto space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Corporate Order Code</span>
                    <span className="font-mono font-black text-teal-800 text-lg block">{generatedOrderId}</span>
                    <span className="text-[11px] font-semibold text-slate-500 block">Dispatch confirmation sent to: <strong>{email}</strong></span>
                  </div>

                  <button
                    onClick={() => {
                      resetFlow();
                      onClearCart();
                      onClose();
                    }}
                    className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-teal-600/15"
                  >
                    Return to Portal
                  </button>
                </div>
              )}
            </div>

            {/* Footer summary & action buttons */}
            {step !== "success" && (
              <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-xs">Total Order Value:</span>
                  <span className="text-xl font-mono font-black text-slate-900">
                    {formatKSH(totalAmount)}
                  </span>
                </div>

                {step === "cart" && (
                  <div className="flex gap-2">
                    <button
                      disabled={cart.length === 0}
                      onClick={() => setStep("details")}
                      className={`flex-1 py-3.5 rounded-xl font-extrabold flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all duration-300 ${
                        cart.length > 0
                          ? "bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/10 hover:-translate-y-0.5 active:translate-y-0"
                          : "bg-slate-200 text-slate-400 cursor-not-allowed"
                      }`}
                      id="proceed-to-checkout"
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
                      className={`px-4 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all border ${
                        cart.length > 0
                          ? "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                          : "border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      Apply as Estimate
                    </button>
                  </div>
                )}

                {step === "details" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep("cart")}
                      className="flex-1 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-xs font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNextToPayment}
                      className="flex-1 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold uppercase tracking-wider shadow-md transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                )}

                {step === "payment" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep("details")}
                      className="flex-1 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-xs font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isProcessingOrder}
                      className="flex-1 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
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
                  </div>
                )}

                <p className="text-[10px] text-center text-slate-400 font-semibold uppercase tracking-wider">
                  🔒 Secure transaction portal powered by Zentricore.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
