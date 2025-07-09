import React from 'react';
import SalesOverview from './SalesOverview';
import FinanceModule from './FinanceModule';
import OrdersList from './OrdersList';

const DashboardOverview = () => {
  return (
    <div className="p-4 md:p-6">
      <SalesOverview />
      <FinanceModule />
      <OrdersList /> 
    </div>
  );
};

export default DashboardOverview;