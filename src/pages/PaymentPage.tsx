@@ .. @@
 import React, { useState } from 'react';
 import { ArrowLeft, Check, Star, CreditCard, Shield, Zap } from 'lucide-react';
+import TermsModal from '../components/TermsModal';

 interface PaymentPageProps {
   onBack: () => void;
@@ .. @@
 const PaymentPage: React.FC<PaymentPageProps> = ({ onBack }) => {
   const [selectedPlan, setSelectedPlan] = useState('premium');
+  const [showTermsModal, setShowTermsModal] = useState(false);
+  const [termsAccepted, setTermsAccepted] = useState(false);

   const plans = [
@@ .. @@
     }
   ];

+  const handlePaymentSubmit = (e: React.FormEvent) => {
+    e.preventDefault();
+    
+    if (!termsAccepted) {
+      setShowTermsModal(true);
+      return;
+    }
+    
+    // Processar pagamento aqui
+    alert('Pagamento processado com sucesso!');
+  };
+
+  const handleTermsAccept = () => {
+    setTermsAccepted(true);
+    setShowTermsModal(false);
+    // Após aceitar os termos, processar o pagamento
+    alert('Termos aceitos! Processando pagamento...');
+  };

   return (
@@ .. @@
         {/* Payment Form */}
         <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
           <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
             <CreditCard className="h-6 w-6 text-yellow-400" />
             <span>Finalizar Contratação</span>
           </h3>
           
-          <form className="space-y-6">
+          <form onSubmit={handlePaymentSubmit} className="space-y-6">
             <div className="grid md:grid-cols-2 gap-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Nome da Barbearia
                 </label>
                 <input
                   type="text"
+                  required
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400 transition-colors"
                   placeholder="Digite o nome da sua barbearia"
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   CNPJ
                 </label>
                 <input
                   type="text"
+                  required
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400 transition-colors"
                   placeholder="00.000.000/0000-00"
                 />
               </div>
             </div>
             
             <div className="grid md:grid-cols-2 gap-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Email
                 </label>
                 <input
                   type="email"
+                  required
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400 transition-colors"
                   placeholder="seu@email.com"
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Telefone
                 </label>
                 <input
                   type="tel"
+                  required
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400 transition-colors"
                   placeholder="(11) 99999-9999"
                 />
               </div>
             </div>
             
             <div className="bg-gray-50 p-6 rounded-lg">
               <h4 className="font-semibold text-gray-900 mb-4">Resumo do Pedido</h4>
               <div className="flex justify-between items-center mb-2">
                 <span>Plano {plans.find(p => p.id === selectedPlan)?.name}</span>
                 <span className="font-semibold">{plans.find(p => p.id === selectedPlan)?.price}/mês</span>
               </div>
               <div className="border-t pt-2 mt-4">
                 <div className="flex justify-between items-center font-bold text-lg">
                   <span>Total</span>
                   <span className="text-yellow-600">{plans.find(p => p.id === selectedPlan)?.price}/mês</span>
                 </div>
               </div>
             </div>
             
             <div className="flex items-center space-x-2 text-sm text-gray-600">
               <Shield className="h-5 w-5 text-green-500" />
               <span>Pagamento seguro e criptografado</span>
             </div>
             
+            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
+              <p className="text-sm text-blue-800">
+                <strong>Importante:</strong> Ao clicar em "Finalizar Contratação", você será solicitado a ler e aceitar 
+                nossos Termos de Uso e Contrato de Prestação de Serviços antes de prosseguir com o pagamento.
+              </p>
+            </div>

+            <button
+              type="submit"
+              className="w-full bg-yellow-400 text-black py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-colors"
+            >
+              Finalizar Contratação
+            </button>
           </form>
         </div>
+
+        {/* Terms Modal */}
+        <TermsModal
+          isOpen={showTermsModal}
+          onClose={() => setShowTermsModal(false)}
+          onAccept={handleTermsAccept}
+        />
       </div>
     </div>
   );