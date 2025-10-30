import React from "react";

interface PriceTagProps {
  dailyPrice: number;
  monthlyPrice: string;
  originalPrice?: string;
  showDiscount: boolean;
}

const PriceTag: React.FC<PriceTagProps> = ({
  dailyPrice,
  monthlyPrice,
  originalPrice,
  showDiscount,
}) => {
  return (
    <div className="price-container">
      {/* Preço mensal em destaque */}
      <div className="monthly-price-large">
        {showDiscount && originalPrice && (
          <span className="original-price">De R$ {originalPrice}/mês por </span>
        )}
        R$ {monthlyPrice}
        <span>/mês</span>
      </div>
      {/* Preço diário em tamanho menor */}
      <div className="daily-price-small">
        (equivalente a R$ {dailyPrice.toFixed(2).replace(".", ",")} por dia)
      </div>
    </div>
  );
};

export default PriceTag;
