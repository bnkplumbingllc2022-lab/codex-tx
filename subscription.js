import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    const body = await getRawBody(req);
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL || 'https://mgvrvvhbhhgwihkrrlge.supabase.co';
  const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ndnJ2dmhiaGhnd2loa3JybGdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5Nzk2NzksImV4cCI6MjA4OTU1NTY3OX0.AJL4NxfNW-uphpVjJPvlSt8v7BFlRaFvDulX42Lld6E';

  const supabaseUpdate = async (email, tier, stripeCustomerId, subscriptionId, periodEnd) => {
    await fetch(`${SUPABASE_URL}/rest/v1/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify({
        email,
        tier,
        stripe_customer_id: stripeCustomerId,
        stripe_subscription_id: subscriptionId,
        period_end: periodEnd,
        updated_at: new Date().toISOString()
      })
    });
  };

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const email = session.customer_details?.email || session.customer_email;
        const customerId = session.customer;
        const subscriptionId = session.subscription;

        if (subscriptionId) {
          const sub = await stripe.subscriptions.retrieve(subscriptionId);
          const priceId = sub.items.data[0]?.price?.id;
          const periodEnd = new Date(sub.current_period_end * 1000).toISOString();

          const BASIC_PRICES = [
            process.env.STRIPE_BASIC_MONTHLY_PRICE,
            process.env.STRIPE_BASIC_QUARTERLY_PRICE,
            process.env.STRIPE_BASIC_ANNUAL_PRICE,
          ];
          const tier = BASIC_PRICES.includes(priceId) ? 'basic' : 'pro';
          await supabaseUpdate(email, tier, customerId, subscriptionId, periodEnd);
        }
        break;
      }
      case 'customer.subscription.updated': {
        const sub = event.data.object;
        const customer = await stripe.customers.retrieve(sub.customer);
        const email = customer.email;
        const priceId = sub.items.data[0]?.price?.id;
        const periodEnd = new Date(sub.current_period_end * 1000).toISOString();
        const BASIC_PRICES = [
          process.env.STRIPE_BASIC_MONTHLY_PRICE,
          process.env.STRIPE_BASIC_QUARTERLY_PRICE,
          process.env.STRIPE_BASIC_ANNUAL_PRICE,
        ];
        const tier = sub.status === 'active' ? (BASIC_PRICES.includes(priceId) ? 'basic' : 'pro') : 'free';
        await supabaseUpdate(email, tier, sub.customer, sub.id, periodEnd);
        break;
      }
      case 'customer.subscription.deleted': {
        const sub = event.data.object;
        const customer = await stripe.customers.retrieve(sub.customer);
        await supabaseUpdate(customer.email, 'free', sub.customer, sub.id, null);
        break;
      }
      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const customer = await stripe.customers.retrieve(invoice.customer);
        console.log('Payment failed for:', customer.email);
        break;
      }
    }
  } catch (err) {
    console.error('Webhook handler error:', err.message);
  }

  res.status(200).json({ received: true });
}

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}
