import React, { useEffect, useState } from "react";
import "./SubscriptionManager.css";
import { cancelSubscription, getSubscriptionStatus } from "../services/stripeService";

interface SubscriptionData {
  id: string;
  status: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  plan_name: string;
  amount: number;
  currency: string;
  payment_method?: {
    type: string;
    card?: {
      brand: string;
      last4: string;
      exp_month: number;
      exp_year: number;
    };
  };
}

interface SubscriptionManagerProps {
  subscriptionId: string;
  onSubscriptionCancelled?: () => void;
  onPaymentMethodUpdated?: () => void;
}

const SubscriptionManager: React.FC<SubscriptionManagerProps> = ({
  subscriptionId,
  onSubscriptionCancelled,
}) => {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    loadSubscription();
  }, [subscriptionId]);

  const loadSubscription = async () => {
    try {
      setLoading(true);
      setError(null);

      const {
        success,
        data,
        error: apiError,
      } = await getSubscriptionStatus(subscriptionId);

      if (!success || !data) {
        throw new Error(apiError || "Erro ao carregar assinatura");
      }

      setSubscription(data);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar assinatura");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!subscription) return;

    const confirmed = window.confirm(
      `Tem certeza que deseja cancelar sua assinatura do ${subscription.plan_name}? ` +
        "Você ainda terá acesso até o final do período atual."
    );

    if (!confirmed) return;

    try {
      setActionLoading("cancel");
      setError(null);

      const { success, error: apiError } = await cancelSubscription(
        subscription.id
      );

      if (!success) {
        throw new Error(apiError || "Erro ao cancelar assinatura");
      }

      // Recarregar dados da assinatura
      await loadSubscription();

      if (onSubscriptionCancelled) {
        onSubscriptionCancelled();
      }
    } catch (err: any) {
      setError(err.message || "Erro ao cancelar assinatura");
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const getStatusBadge = (status: string, cancelAtPeriodEnd: boolean) => {
    if (cancelAtPeriodEnd) {
      return (
        <span className="subscription-status-badge cancelling">Cancelando</span>
      );
    }

    switch (status) {
      case "active":
        return <span className="subscription-status-badge active">Ativa</span>;
      case "past_due":
        return (
          <span className="subscription-status-badge past-due">Vencida</span>
        );
      case "canceled":
        return (
          <span className="subscription-status-badge canceled">Cancelada</span>
        );
      case "unpaid":
        return (
          <span className="subscription-status-badge unpaid">Não Paga</span>
        );
      default:
        return (
          <span className="subscription-status-badge inactive">{status}</span>
        );
    }
  };

  const getCardDisplay = (paymentMethod: any) => {
    if (!paymentMethod?.card) return "Método não disponível";

    const { brand, last4, exp_month, exp_year } = paymentMethod.card;
    return `${brand.toUpperCase()} •••• ${last4} (${exp_month
      .toString()
      .padStart(2, "0")}/${exp_year})`;
  };

  if (loading) {
    return (
      <div className="subscription-manager">
        <div className="subscription-loading">
          <div className="subscription-loading-spinner"></div>
          <p>Carregando informações da assinatura...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="subscription-manager">
        <div className="subscription-error">
          <h3>Erro ao carregar assinatura</h3>
          <p>{error}</p>
          <button onClick={loadSubscription} className="subscription-retry-btn">
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="subscription-manager">
        <div className="subscription-not-found">
          <h3>Assinatura não encontrada</h3>
          <p>Não foi possível encontrar informações sobre sua assinatura.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="subscription-manager">
      <div className="subscription-card">
        <div className="subscription-header">
          <div>
            <h2>Minha Assinatura</h2>
            <p className="subscription-plan">{subscription.plan_name}</p>
          </div>
          {getStatusBadge(
            subscription.status,
            subscription.cancel_at_period_end
          )}
        </div>

        <div className="subscription-details">
          <div className="subscription-detail">
            <strong>Valor:</strong>
            <span>
              {formatAmount(subscription.amount, subscription.currency)}/mês
            </span>
          </div>

          <div className="subscription-detail">
            <strong>Próxima cobrança:</strong>
            <span>{formatDate(subscription.current_period_end)}</span>
          </div>

          {subscription.payment_method && (
            <div className="subscription-detail">
              <strong>Método de pagamento:</strong>
              <span>{getCardDisplay(subscription.payment_method)}</span>
            </div>
          )}

          {subscription.cancel_at_period_end && (
            <div className="subscription-detail cancellation-notice">
              <strong>⚠️ Cancelamento agendado:</strong>
              <span>
                Sua assinatura será cancelada em{" "}
                {formatDate(subscription.current_period_end)}
              </span>
            </div>
          )}
        </div>

        <div className="subscription-actions">
          {subscription.status === "active" &&
            !subscription.cancel_at_period_end && (
              <>
                <button
                  onClick={handleCancelSubscription}
                  disabled={actionLoading === "cancel"}
                  className="subscription-btn subscription-btn-cancel"
                >
                  {actionLoading === "cancel"
                    ? "Cancelando..."
                    : "Cancelar Assinatura"}
                </button>

                <button
                  onClick={() => {
                    // Implementar lógica para atualizar método de pagamento
                    console.log("Update payment method");
                  }}
                  className="subscription-btn subscription-btn-secondary"
                >
                  Atualizar Cartão
                </button>
              </>
            )}

          {subscription.status === "past_due" && (
            <button
              onClick={() => {
                // Implementar lógica para tentar pagamento novamente
                console.log("Retry payment");
              }}
              className="subscription-btn subscription-btn-primary"
            >
              Atualizar Pagamento
            </button>
          )}
        </div>

        {error && <div className="subscription-action-error">{error}</div>}
      </div>

      <div className="subscription-billing-history">
        <h3>Histórico de Cobrança</h3>
        <p>Em breve você poderá visualizar seu histórico de faturas aqui.</p>
      </div>
    </div>
  );
};

export default SubscriptionManager;
