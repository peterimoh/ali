const plans = [
  {
    id: 1,
    pkg: 'pkg$Starter',
    plan_name: 'Starter',
    Discount: '40% discount',
    Regular_price: 50,
    Sale_price: 40,
    Disk: '3GB',
    BandWidth: '15GB',
    Email: '5',
    TLD: '3 Domains',
    CPU: '2 cores',
    My_sql_db: '4 databases',
    Free_ssl: 'Yes'
  },
  {
    id: 2,
    pkg: 'pkg$Business',
    plan_name: 'Business',
    Discount: '30% discount',
    Regular_price: 90,
    Sale_price: 78,
    Disk: '25GB',
    BandWidth: '100GB',
    Email: 'Unlimited',
    TLD: '12 Domains',
    CPU: 'core i3',
    My_sql_db: '8 databases',
    Free_ssl: 'Yes'
  },
  {
    id: 3,
    pkg: 'pkg$Premium',
    plan_name: 'Premium',
    Discount: '20% discount',
    Regular_price: 150,
    Sale_price: 140,
    Disk: '400GB',
    BandWidth: 'Unmetered',
    Email: 'Unlimited',
    TLD: 'Unlimited',
    CPU: 'core i8',
    My_sql_db: 'Unlimited',
    Free_ssl: 'Yes'
  }
];

export { plans };
