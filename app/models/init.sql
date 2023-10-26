
CREATE SEQUENCE IF NOT EXISTS my_sequence START 100000;


CREATE TABLE IF NOT EXISTS products(
  product_id INT NOT NULL DEFAULT nextval('my_sequence') PRIMARY KEY,
  image TEXT,
  product_id_stripe TEXT,
  product_name TEXT,
  features jsonb[],
  description TEXT,
  price TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS packages(
  package_id INT NOT NULL DEFAULT nextval('my_sequence') PRIMARY KEY,
  package_name TEXT,
  product_id TEXT,
  package_price TEXT,
  type TEXT,
  stripe_price_id TEXT,
  feature jsonb[],
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS featured_companies(
  featured_companies_id INT NOT NULL DEFAULT nextval('my_sequence') PRIMARY KEY,
  company_name TEXT,
  image TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users(
  user_id INT NOT NULL DEFAULT nextval('my_sequence') PRIMARY KEY,
  user_name TEXT,
  stripe_customer_id TEXT,
  signup_google TEXT,
  access_token TEXT,
  email  TEXT UNIQUE NOT NULL,
  type TEXT,
  password TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
 
);
CREATE TABLE IF NOT EXISTS company(
  company_id INT NOT NULL DEFAULT nextval('my_sequence') PRIMARY KEY,
  company_name TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
 
);
CREATE TABLE IF NOT EXISTS subscriptions(
  subscription_id INT NOT NULL DEFAULT nextval('my_sequence') PRIMARY KEY,
  product_id TEXT,
  price_id TEXT,
  payment_method_id TEXT,
  stripe_subscription_id TEXT,
  user_id  TEXT,
  type TEXT,
  status TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
 
);
CREATE TABLE IF NOT EXISTS logs(
  log_id INT NOT NULL DEFAULT nextval('my_sequence') PRIMARY KEY,
  bodyData jsonb[],
  api_endpoint TEXT,
  stripe_api_called TEXT UNIQUE NOT NULL,
  status TEXT,
  responseStripe jsonb[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
 
);
CREATE TABLE IF NOT EXISTS stripe_logs (
    log_id INT NOT NULL DEFAULT nextval('my_sequence') PRIMARY KEY,
    timestamp TIMESTAMP,
    action VARCHAR(255),
    request_data jsonb[],
    response_data jsonb[],
    error_message TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS messages(
  message_id INT NOT NULL DEFAULT nextval('my_sequence') PRIMARY KEY,
  from_user TEXT,
  to_user TEXT,
  sender TEXT,
  message TEXT,
  type TEXT,
  readStatus TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
 
);
CREATE TABLE IF NOT EXISTS website(
  website_id INT NOT NULL DEFAULT nextval('my_sequence') PRIMARY KEY,
  paragraph TEXT,
  phone_no TEXT,
  email TEXT,
  location TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
 
);
-- Check if a user with type 'admin' exists
SELECT COUNT(*) FROM users WHERE type = 'admin';

-- If no user with type 'admin' exists, insert a new user
INSERT INTO users (user_id,user_name, type, email,password)
SELECT nextval('my_sequence'), 'admin', 'Admin', 'admin@gmail.com','mtechub123'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE type = 'Admin');

