import React, { useState, useRef, useEffect } from 'react';
import { X, AlertCircle, CheckCircle } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose, onAccept }) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Reset states when modal opens
  useEffect(() => {
    if (isOpen) {
      setHasScrolledToBottom(false);
      setHasAccepted(false);
    }
  }, [isOpen]);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10; // 10px tolerance
      setHasScrolledToBottom(isAtBottom);
    }
  };

  const handleAcceptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasAccepted(e.target.checked);
  };

  const handleConfirm = () => {
    if (hasScrolledToBottom && hasAccepted) {
      onAccept();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Termos de Uso e Contrato de Prestação de Serviços
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-6 text-sm text-gray-700 leading-relaxed"
        >
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <p className="font-semibold text-yellow-800">IMPORTANTE:</p>
              </div>
              <p className="text-yellow-700 mt-2">
                Para que a aceitação destes termos seja válida, o USUÁRIO deve rolar a página deste contrato até o final. 
                Ao prosseguir, marcar a opção "Li e Aceito os Termos de Uso" e concluir o pagamento da assinatura no site, 
                o USUÁRIO declara ter lido na íntegra, compreendido e aceitado todas as condições abaixo, que regem a 
                utilização da plataforma disponibilizada por BarberEasy, com sede em Teresina/PI, doravante denominada CONTRATADA.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">1. Cláusula Objeto</h3>
              <p>
                1.1. A CONTRATADA disponibiliza ao USUÁRIO uma plataforma digital destinada à criação de site próprio de barbearia, 
                página de agendamento, painel de configurações, envio de mensagens automatizadas com IA e chatbot via WhatsApp, 
                mediante assinatura mensal.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">2. Cláusula Cadastro, Aceite e Pagamento</h3>
              <p className="mb-2">2.1. O acesso à plataforma é condicionado a:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>cadastro completo no site;</li>
                <li>aceite digital deste contrato via checkbox;</li>
                <li>confirmação do pagamento da assinatura no próprio site.</li>
              </ul>
              <p className="mt-2">2.2. Sem o pagamento confirmado, o acesso à plataforma não será liberado.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">3. Cláusula Assinatura e Renovação</h3>
              <p className="mb-2">
                3.1. O serviço será disponibilizado mediante assinatura mensal recorrente, paga via cartão de crédito 
                diretamente no site da CONTRATADA, com duração de 1 (um) mês por ciclo de cobrança.
              </p>
              <p>
                3.2. A assinatura será renovada automaticamente a cada ciclo de 1 (um) mês, até que o USUÁRIO solicite o cancelamento.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">4. Cláusula Obrigações das Partes</h3>
              <p className="mb-2">4.1. Da CONTRATADA:</p>
              <ul className="list-disc list-inside ml-4 space-y-1 mb-3">
                <li>Disponibilizar a plataforma conforme contratado e envidar esforços para mantê-la funcional e acessível;</li>
                <li>Prestar suporte técnico básico, conforme a Cláusula 5;</li>
                <li>Proteger os dados do USUÁRIO nos limites da legislação vigente, em especial a Lei Geral de Proteção de Dados (LGPD).</li>
              </ul>
              <p className="mb-2">4.2. Do USUÁRIO:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Utilizar a plataforma de forma lícita, adequada e em conformidade com estes Termos de Uso;</li>
                <li>Efetuar os pagamentos da assinatura dentro do prazo;</li>
                <li>Fornecer informações verdadeiras, completas e atualizadas no cadastro.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">5. Cláusula de Nível de Serviço (SLA) e Suporte Técnico</h3>
              <p className="mb-2">
                5.1. A CONTRATADA envidará esforços razoáveis para manter a plataforma disponível na maior parte do tempo, 
                excetuando-se paradas para manutenções programadas ou falhas de serviços de terceiros.
              </p>
              <p className="mb-2">
                5.2. O suporte técnico básico será oferecido para sanar dúvidas sobre o funcionamento da plataforma e 
                será prestado exclusivamente via WhatsApp.
              </p>
              <p className="mb-2">
                5.3. O horário de atendimento do suporte é de Segunda a Sexta-feira, das 08h às 20h, e aos Sábados, 
                das 08h às 14h. Não haverá atendimento aos domingos e feriados.
              </p>
              <p>
                5.4. O prazo para a primeira resposta a uma solicitação de suporte é de até 3 (três) dias úteis.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">6. Cláusula Inadimplemento</h3>
              <p className="mb-2">6.1. O atraso de 5 (cinco) dias no pagamento gerará aviso automático enviado ao USUÁRIO.</p>
              <p className="mb-2">
                6.2. Caso o atraso ultrapasse 10 (dez) dias, o acesso à plataforma será suspenso temporariamente 
                até a regularização do pagamento.
              </p>
              <p className="mb-2">
                6.3. Não haverá cobrança de multa, juros ou correção monetária sobre os valores em atraso.
              </p>
              <p>
                6.4. O acesso será restabelecido automaticamente após a confirmação do pagamento pendente.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">7. Cláusula Cancelamento</h3>
              <p className="mb-2">
                7.1. O USUÁRIO poderá cancelar a assinatura a qualquer momento, diretamente na plataforma, 
                clicando no botão de cancelamento e confirmando a operação.
              </p>
              <p className="mb-2">
                7.2. O cancelamento encerra imediatamente a renovação automática para o ciclo seguinte, 
                sem cobrança de valores adicionais.
              </p>
              <p>
                7.3. Não haverá reembolso de valores já pagos, mesmo que o cancelamento ocorra logo após a cobrança 
                ou durante o período vigente da assinatura. O acesso permanecerá ativo até o final do ciclo já pago.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">8. Cláusula de Usos Proibidos</h3>
              <p className="mb-2">8.1. É vedado ao USUÁRIO utilizar a plataforma para:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Praticar qualquer ato ilícito, difamatório, fraudulento, preconceituoso ou que viole a legislação brasileira;</li>
                <li>Divulgar conteúdo que infrinja direitos autorais, de imagem ou propriedade intelectual de terceiros;</li>
                <li>Realizar práticas de spam ou envio de mensagens em massa não solicitadas;</li>
                <li>Tentar realizar engenharia reversa, descompilar, ou de qualquer forma tentar obter o código-fonte da plataforma.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">9. Cláusula de Propriedade Intelectual</h3>
              <p className="mb-2">
                9.1. Todo o software, design, funcionalidades, marcas e demais elementos que compõem a plataforma 
                BarberEasy são de propriedade exclusiva da CONTRATADA.
              </p>
              <p className="mb-2">
                9.2. O USUÁRIO é o único proprietário e responsável por todo o conteúdo que inserir na plataforma, 
                incluindo textos, imagens, logotipos e dados de seus clientes.
              </p>
              <p>
                9.3. Ao utilizar a plataforma, o USUÁRIO concede à CONTRATADA uma licença não exclusiva para hospedar, 
                processar e exibir seu conteúdo, unicamente para a finalidade de prestar o serviço contratado.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">10. Cláusula Limitação de Responsabilidade</h3>
              <p className="mb-2">
                10.1. A CONTRATADA não se responsabiliza por falhas externas ou problemas decorrentes do uso da plataforma, 
                incluindo, mas não se limitando a:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Indisponibilidade da internet do USUÁRIO;</li>
                <li>Instabilidades em serviços de terceiros (ex.: WhatsApp);</li>
                <li>Informações incorretas ou conteúdo ilegal inserido pelo USUÁRIO;</li>
                <li>Vírus, malwares ou qualquer dano causado por softwares do USUÁRIO que afetem a plataforma.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">11. Cláusula Aceite Digital</h3>
              <p className="mb-2">11.1. O presente contrato possui validade jurídica, e sua aceitação será formalizada digitalmente mediante:</p>
              <ul className="list-disc list-inside ml-4 space-y-1 mb-2">
                <li>marcação da caixa de seleção "Li e Aceito os Termos de Uso";</li>
                <li>efetivação do pagamento da assinatura.</li>
              </ul>
              <p>
                11.2. O aceite digital tem o mesmo valor jurídico de uma assinatura física, nos termos da Medida Provisória nº 2.200-2/2001.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">12. Cláusula de Vigência e Rescisão</h3>
              <p className="mb-2">
                12.1. Este contrato tem vigência indeterminada, iniciando-se na data do aceite digital e permanecendo 
                válido enquanto a assinatura do USUÁRIO estiver ativa.
              </p>
              <p className="mb-2">
                12.2. Rescisão por Violação do Usuário: A CONTRATADA poderá rescindir este contrato e encerrar o acesso 
                do USUÁRIO à plataforma, de forma imediata e sem direito a reembolso, em caso de violação de qualquer 
                cláusula destes Termos de Uso, especialmente as dispostas na Cláusula 8 (Usos Proibidos).
              </p>
              <p>
                12.3. Rescisão por Descontinuidade do Serviço: A CONTRATADA se reserva o direito de descontinuar a 
                prestação dos serviços da plataforma, seja por decisão estratégica de negócio, encerramento de atividades 
                ou em caso de falência. Nesta hipótese, o USUÁRIO será notificado com, no mínimo, 30 (trinta) dias de 
                antecedência através do e-mail cadastrado. A CONTRATADA realizará o reembolso proporcional dos valores 
                já pagos pelo USUÁRIO que correspondam ao período não utilizado da assinatura.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">13. Cláusula de Alteração dos Termos</h3>
              <p className="mb-2">
                13.1. A CONTRATADA reserva-se o direito de modificar ou atualizar estes Termos de Uso a qualquer momento.
              </p>
              <p className="mb-2">
                13.2. As alterações serão comunicadas ao USUÁRIO via aviso na plataforma ou por e-mail.
              </p>
              <p>
                13.3. O uso contínuo da plataforma após a publicação das alterações implica aceitação dos novos termos.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">14. Cláusula de Acesso e Tratamento de Dados (LGPD)</h3>
              <p className="mb-2">
                14.1. Para fins da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), no que tange aos dados pessoais 
                dos clientes da barbearia inseridos na plataforma, o USUÁRIO é o Controlador dos dados, sendo sua 
                responsabilidade a coleta e a definição da finalidade do tratamento. A CONTRATADA atua como Operadora, 
                realizando o tratamento desses dados em nome do USUÁRIO e estritamente para a execução deste contrato.
              </p>
              <p className="mb-2">
                14.2. O USUÁRIO declara estar ciente de que a CONTRATADA terá acesso aos dados cadastrais para fins de 
                operação da plataforma, suporte, segurança, processamento de pagamentos e melhoria do serviço, em 
                conformidade com a legislação.
              </p>
              <p className="mb-2">
                14.3. A CONTRATADA compromete-se a adotar medidas de segurança técnicas e administrativas aptas a proteger 
                os dados pessoais de acessos não autorizados e de situações acidentais ou ilícitas.
              </p>
              <p>
                14.4. Recomenda-se que o USUÁRIO consulte a Política de Privacidade da plataforma, que fornecerá informações 
                detalhadas sobre o tratamento de dados.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">15. Cláusula Foro</h3>
              <p>
                15.1. Fica eleito o foro da comarca de Teresina/PI para dirimir quaisquer controvérsias oriundas deste 
                contrato, com renúncia a qualquer outro, por mais privilegiado que seja.
              </p>
            </div>

            {/* Scroll indicator */}
            {hasScrolledToBottom && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <p className="font-semibold text-green-800">
                    Você leu todo o contrato até o final!
                  </p>
                </div>
                <p className="text-green-700 mt-1">
                  Agora você pode marcar a opção abaixo para aceitar os termos.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="accept-terms"
                checked={hasAccepted}
                onChange={handleAcceptChange}
                disabled={!hasScrolledToBottom}
                className="h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-gray-300 rounded disabled:opacity-50"
              />
              <label 
                htmlFor="accept-terms" 
                className={`text-sm font-medium ${
                  hasScrolledToBottom ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                Li e Aceito os Termos de Uso
              </label>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                disabled={!hasScrolledToBottom || !hasAccepted}
                className="px-6 py-2 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Confirmar e Prosseguir
              </button>
            </div>
          </div>
          
          {!hasScrolledToBottom && (
            <div className="mt-3 flex items-center space-x-2 text-sm text-amber-600">
              <AlertCircle className="h-4 w-4" />
              <span>Role até o final do contrato para poder aceitar os termos</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TermsModal;