import { PracticalChallenge } from '../../types/practicalCoding';

export const sqlChallenges: PracticalChallenge[] = [
  // ========================================================
  // SQL 1: Customer Cohort Churn & Retention Analysis (Canonical)
  // ========================================================
  {
    id: 'customer-churn-sql',
    slug: 'customer-churn-sql',
    title: 'Customer Cohort Churn & Retention Analysis',
    track: 'sql_pipeline',
    difficulty: 'Intermediate',
    roleTarget: 'Data Engineer / Analyst',
    estimatedMinutes: 30,
    tags: ['SQL', 'Window Functions', 'Analytics', 'Joins', 'Cohorts'],
    description:
      'Write a SQL query analyzing customer cohort retention. Identify users who signed up in 2026, track whether they made repeat purchases in their first 30 days vs 60 days, and calculate the overall 30-day retention percentage.',
    requirements: [
      'Join the `users` and `orders` tables on `users.id = orders.user_id`.',
      'Filter for users registered between `2026-01-01` and `2026-12-31`.',
      'Calculate days between `users.signup_date` and `orders.created_at`.',
      'Flag repeat customers who made >= 2 orders within 30 days of registration.',
      'Return the cohort month, total signups, and 30-day retention rate rounded to 2 decimal places.',
    ],
    files: [
      {
        name: 'query.sql',
        language: 'sql',
        content: `-- Customer Cohort Retention Analysis
-- Schema:
-- users(id INT, name VARCHAR, signup_date DATE)
-- orders(id INT, user_id INT, amount DECIMAL, created_at DATE)

SELECT
  DATE_TRUNC('month', u.signup_date) AS cohort_month,
  COUNT(DISTINCT u.id) AS total_users,
  ROUND(
    COUNT(DISTINCT CASE WHEN o.created_at <= u.signup_date + INTERVAL '30 days' AND o.order_num >= 2 THEN u.id END)::DECIMAL 
    / NULLIF(COUNT(DISTINCT u.id), 0) * 100, 
    2
  ) AS retention_rate_30d
FROM users u
LEFT JOIN (
  SELECT 
    user_id, 
    created_at,
    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at) AS order_num
  FROM orders
) o ON u.id = o.user_id
GROUP BY 1
ORDER BY cohort_month;
`,
      },
    ],
    testCases: [
      {
        id: 'tc-sql-cohort',
        title: 'Groups by monthly signup cohorts correctly',
        description: 'Verifies DATE_TRUNC month aggregation on user signups',
        assertionType: 'sql_output',
      },
      {
        id: 'tc-sql-window',
        title: 'Accurately partitions order sequences',
        description: 'Verifies window partition on user orders sequence',
        assertionType: 'sql_output',
      },
    ],
    testRunnerScript: `(async function testSql(query) {
  const results = [];
  const clean = query.toLowerCase();
  const hasTrunc = clean.includes('date_trunc') || clean.includes('month');
  const hasWindow = clean.includes('row_number') || clean.includes('partition by');
  results.push({ testId: 'tc-sql-cohort', title: 'Groups by monthly signup cohorts', passed: hasTrunc });
  results.push({ testId: 'tc-sql-window', title: 'Accurately partitions order sequences', passed: hasWindow });
  return results;
})`,
    solutionFiles: [
      {
        name: 'query.sql',
        language: 'sql',
        content: `SELECT
  DATE_TRUNC('month', u.signup_date) AS cohort_month,
  COUNT(DISTINCT u.id) AS total_users,
  ROUND(
    COUNT(DISTINCT CASE WHEN o.created_at <= u.signup_date + INTERVAL '30 days' AND o.order_num >= 2 THEN u.id END)::DECIMAL 
    / NULLIF(COUNT(DISTINCT u.id), 0) * 100, 
    2
  ) AS retention_rate_30d
FROM users u
LEFT JOIN (
  SELECT 
    user_id, 
    created_at,
    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at) AS order_num
  FROM orders
) o ON u.id = o.user_id
GROUP BY 1
ORDER BY cohort_month;`,
      },
    ],
    editorialMarkdown: `### Architectural Walkthrough: Cohort Retention Analytics

1. **Window Numbering**: Using \`ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at)\` allows us to isolate the second purchase without complicated self-joins.
2. **Preventing Division by Zero**: Using \`NULLIF(COUNT(DISTINCT u.id), 0)\` prevents database runtime errors on empty cohorts.`,
  },

  // ========================================================
  // SQL 2: E-Commerce Multi-Stage Funnel Drop-off Analysis [NEW]
  // ========================================================
  {
    id: 'ecommerce-funnel-dropoff-sql',
    slug: 'ecommerce-funnel-dropoff-sql',
    title: 'E-Commerce Multi-Stage Funnel Drop-off Analysis',
    track: 'sql_pipeline',
    difficulty: 'Intermediate',
    roleTarget: 'Data Engineer / Analyst',
    estimatedMinutes: 30,
    tags: ['SQL', 'Funnel Analysis', 'Conditional Aggregation', 'Conversion Rate', 'CTEs'],
    description:
      'Analyze an e-commerce conversion funnel across five sequential stages: page view, product view, add to cart, checkout start, and purchase. Calculate unique users progressing through each stage, the stage-to-stage conversion rate, and overall top-to-bottom drop-off.',
    requirements: [
      'Query the `events` table with schema: `(event_id, user_id, event_type, created_at, session_id)`.',
      'The 5 stages are: `page_view` (Stage 1), `product_view` (Stage 2), `add_to_cart` (Stage 3), `checkout_start` (Stage 4), and `purchase` (Stage 5).',
      'Calculate unique users reaching each stage using conditional aggregation (`COUNT(DISTINCT CASE WHEN ... THEN user_id END)`).',
      'Compute stage-to-stage conversion rates (e.g., Stage 2 users / Stage 1 users * 100), rounded to 2 decimal places.',
      'Compute the total funnel conversion rate (Stage 5 purchases / Stage 1 page views * 100).',
      'Safely handle division by zero using `NULLIF`.',
    ],
    files: [
      {
        name: 'query.sql',
        language: 'sql',
        content: `-- E-Commerce Multi-Stage Funnel Drop-off Analysis
-- Schema: events(event_id INT, user_id INT, event_type VARCHAR, created_at TIMESTAMP, session_id VARCHAR)

-- TODO:
-- 1. Create a CTE aggregating unique user reach per stage
-- 2. Compute step-to-step conversion percentages
-- 3. Return stage names, user counts, drop-off percentages, and overall conversion rate

WITH funnel_counts AS (
  SELECT
    COUNT(DISTINCT CASE WHEN event_type = 'page_view' THEN user_id END) AS stage1_visitors,
    COUNT(DISTINCT CASE WHEN event_type = 'product_view' THEN user_id END) AS stage2_viewers,
    COUNT(DISTINCT CASE WHEN event_type = 'add_to_cart' THEN user_id END) AS stage3_cart_adders,
    COUNT(DISTINCT CASE WHEN event_type = 'checkout_start' THEN user_id END) AS stage4_checkout_starters,
    COUNT(DISTINCT CASE WHEN event_type = 'purchase' THEN user_id END) AS stage5_buyers
  FROM events
)
SELECT
  stage1_visitors,
  stage2_viewers,
  stage3_cart_adders,
  stage4_checkout_starters,
  stage5_buyers
FROM funnel_counts;
`,
      },
    ],
    testCases: [
      {
        id: 'tc-funnel-stages',
        title: 'Measures unique users at all 5 funnel stages',
        description: 'Verifies conditional aggregation for page_view, product_view, add_to_cart, checkout_start, and purchase',
        assertionType: 'sql_output',
      },
      {
        id: 'tc-funnel-conversion-rate',
        title: 'Computes stage conversion rates with NULLIF safety',
        description: 'Verifies calculation of conversion percentages with round and zero-division protection',
        assertionType: 'sql_output',
      },
    ],
    testRunnerScript: `(async function testFunnelSql(query) {
  const results = [];
  const clean = query.toLowerCase();

  const hasAllStages =
    clean.includes('page_view') &&
    clean.includes('product_view') &&
    clean.includes('add_to_cart') &&
    clean.includes('checkout_start') &&
    clean.includes('purchase');

  const hasDistinctUsers = clean.includes('count(distinct') || clean.includes('count (distinct');
  const passesStages = hasAllStages && hasDistinctUsers;

  results.push({
    testId: 'tc-funnel-stages',
    title: 'Measures unique users at all 5 funnel stages',
    passed: passesStages,
    expected: 'COUNT(DISTINCT CASE WHEN event_type = ... THEN user_id END) for all 5 stages',
    actual: passesStages ? 'All 5 stages detected with distinct user aggregation' : 'Missing stage types or distinct aggregation'
  });

  const hasNullif = clean.includes('nullif');
  const hasRound = clean.includes('round');
  const hasConversionMath = clean.includes('/') && clean.includes('100');
  const passesConversion = hasNullif && (hasRound || hasConversionMath);

  results.push({
    testId: 'tc-funnel-conversion-rate',
    title: 'Computes stage conversion rates with NULLIF safety',
    passed: passesConversion,
    expected: 'Stage ratio calculation with NULLIF division protection and ROUND',
    actual: passesConversion ? 'NULLIF protection and conversion ratios validated' : 'Missing NULLIF zero-division guard or conversion math'
  });

  return results;
})`,
    solutionFiles: [
      {
        name: 'query.sql',
        language: 'sql',
        content: `WITH funnel_counts AS (
  SELECT
    COUNT(DISTINCT CASE WHEN event_type = 'page_view' THEN user_id END) AS stage1_visitors,
    COUNT(DISTINCT CASE WHEN event_type = 'product_view' THEN user_id END) AS stage2_viewers,
    COUNT(DISTINCT CASE WHEN event_type = 'add_to_cart' THEN user_id END) AS stage3_cart_adders,
    COUNT(DISTINCT CASE WHEN event_type = 'checkout_start' THEN user_id END) AS stage4_checkout_starters,
    COUNT(DISTINCT CASE WHEN event_type = 'purchase' THEN user_id END) AS stage5_buyers
  FROM events
)
SELECT
  stage1_visitors,
  stage2_viewers,
  stage3_cart_adders,
  stage4_checkout_starters,
  stage5_buyers,
  ROUND(stage2_viewers::NUMERIC / NULLIF(stage1_visitors, 0) * 100, 2) AS view_conversion_pct,
  ROUND(stage3_cart_adders::NUMERIC / NULLIF(stage2_viewers, 0) * 100, 2) AS cart_conversion_pct,
  ROUND(stage4_checkout_starters::NUMERIC / NULLIF(stage3_cart_adders, 0) * 100, 2) AS checkout_conversion_pct,
  ROUND(stage5_buyers::NUMERIC / NULLIF(stage4_checkout_starters, 0) * 100, 2) AS purchase_conversion_pct,
  ROUND(stage5_buyers::NUMERIC / NULLIF(stage1_visitors, 0) * 100, 2) AS overall_funnel_conversion_pct
FROM funnel_counts;`,
      },
    ],
    editorialMarkdown: `### Architectural Walkthrough: E-Commerce Conversion Funnel

Multi-stage funnel analysis is a cornerstone metric for growth engineering, marketing attribution, and conversion rate optimization (CRO).

#### 1. Conditional Aggregation vs Multiple Subqueries
Rather than executing five separate scans of the events table with \`UNION\` or five subqueries, conditional aggregation scans the table **once**:
\`\`\`sql
COUNT(DISTINCT CASE WHEN event_type = 'add_to_cart' THEN user_id END)
\`\`\`
This achieves an $O(N)$ single-pass aggregation across millions of log records.

#### 2. Robust Zero-Division Guards
Using \`NULLIF(stage_count, 0)\` is mandatory in production data warehouses (PostgreSQL, Snowflake, BigQuery, Redshift). If an upstream marketing campaign drives zero visitors on day 1, unhandled division throws a fatal \`division by zero\` query error.

#### 3. Granularity Considerations
In enterprise analytics (Mixpanel/Amplitude style), you can extend this query by grouping by \`DATE_TRUNC('week', created_at)\` or \`utm_source\` to visualize conversion degradation trends by channel over time.`,
  },

  // ========================================================
  // SQL 3: Rolling 7-Day Moving Average & Anomalies [NEW]
  // ========================================================
  {
    id: 'rolling-avg-anomaly-sql',
    slug: 'rolling-avg-anomaly-sql',
    title: 'Rolling 7-Day Moving Average & Transaction Anomalies',
    track: 'sql_pipeline',
    difficulty: 'Advanced',
    roleTarget: 'Data Engineer / Analyst',
    estimatedMinutes: 35,
    tags: ['SQL', 'Window Functions', 'Rolling Average', 'Anomaly Detection', 'Statistics'],
    description:
      'Calculate a rolling 7-day moving average and standard deviation of daily transaction volume. Flag anomalous days where the daily volume deviates by more than 2 standard deviations from the rolling baseline (statistical Z-score anomaly detection).',
    requirements: [
      'Query the `daily_metrics` table with schema: `(metric_date DATE, daily_volume NUMERIC)`.',
      'Compute the rolling 7-day average using `AVG(daily_volume) OVER (ORDER BY metric_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)`.',
      'Compute the rolling 7-day standard deviation using `STDDEV(daily_volume) OVER (ORDER BY metric_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)`.',
      'Round moving average and moving stddev to 2 decimal places.',
      'Create a boolean flag `is_anomaly`: true if `daily_volume > rolling_avg + (2 * rolling_stddev)`, false otherwise.',
      'Order results chronologically by `metric_date ASC`.',
    ],
    files: [
      {
        name: 'query.sql',
        language: 'sql',
        content: `-- Rolling 7-Day Moving Average & Anomaly Detection
-- Schema: daily_metrics(metric_date DATE, daily_volume NUMERIC)

-- TODO:
-- 1. Apply window functions with frame ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
-- 2. Compute rolling average and rolling standard deviation
-- 3. Flag spikes where volume > rolling_avg + (2 * rolling_stddev)

SELECT
  metric_date,
  daily_volume
FROM daily_metrics
ORDER BY metric_date ASC;
`,
      },
    ],
    testCases: [
      {
        id: 'tc-sql-rolling-window',
        title: 'Applies 7-day rolling window frame',
        description: 'Verifies ROWS BETWEEN 6 PRECEDING AND CURRENT ROW window frame for average and stddev',
        assertionType: 'sql_output',
      },
      {
        id: 'tc-sql-anomaly-threshold',
        title: 'Flags statistical anomalies at +2 standard deviations',
        description: 'Verifies anomaly boolean flag based on 2 * stddev deviation threshold',
        assertionType: 'sql_output',
      },
    ],
    testRunnerScript: `(async function testRollingAvgSql(query) {
  const results = [];
  const clean = query.toLowerCase();

  const hasWindowFrame =
    clean.includes('rows between 6 preceding and current row') ||
    clean.includes('range between interval') ||
    (clean.includes('avg(') && clean.includes('over'));

  const hasStddev = clean.includes('stddev') || clean.includes('stddev_samp');

  const passesWindow = hasWindowFrame && hasStddev;
  results.push({
    testId: 'tc-sql-rolling-window',
    title: 'Applies 7-day rolling window frame',
    passed: passesWindow,
    expected: 'AVG and STDDEV with OVER (ORDER BY metric_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)',
    actual: passesWindow ? 'Rolling window frame and STDDEV detected' : 'Missing 6 PRECEDING frame or STDDEV function'
  });

  const hasAnomalyCondition =
    clean.includes('case when') ||
    clean.includes('is_anomaly') ||
    clean.includes('>') && clean.includes('2 *');

  results.push({
    testId: 'tc-sql-anomaly-threshold',
    title: 'Flags statistical anomalies at +2 standard deviations',
    passed: hasAnomalyCondition,
    expected: 'CASE WHEN daily_volume > rolling_avg + (2 * rolling_stddev) THEN true ELSE false END',
    actual: hasAnomalyCondition ? 'Anomaly threshold logic verified' : 'Missing anomaly comparison condition'
  });

  return results;
})`,
    solutionFiles: [
      {
        name: 'query.sql',
        language: 'sql',
        content: `WITH rolling_calc AS (
  SELECT
    metric_date,
    daily_volume,
    ROUND(
      AVG(daily_volume) OVER (
        ORDER BY metric_date 
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
      ), 2
    ) AS rolling_avg_7d,
    ROUND(
      COALESCE(
        STDDEV(daily_volume) OVER (
          ORDER BY metric_date 
          ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
        ), 0
      ), 2
    ) AS rolling_stddev_7d
  FROM daily_metrics
)
SELECT
  metric_date,
  daily_volume,
  rolling_avg_7d,
  rolling_stddev_7d,
  CASE 
    WHEN daily_volume > (rolling_avg_7d + (2 * rolling_stddev_7d)) THEN true 
    ELSE false 
  END AS is_anomaly
FROM rolling_calc
ORDER BY metric_date ASC;`,
      },
    ],
    editorialMarkdown: `### Architectural Walkthrough: Rolling Window Analytics & Anomaly Detection

#### 1. Physical Frame vs Logical Range
- In standard SQL, \`ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\` defines a **physical row frame** consisting of 7 contiguous days (assuming no missing date gaps).
- For datasets with potential missing weekend days, \`RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW\` is preferred in modern analytical engines.

#### 2. The Empirical Rule ($Z > 2$)
Under the normal distribution, approximately 95.4% of observations fall within 2 standard deviations of the mean. Any metric spiking beyond $\mu + 2\sigma$ represents a statistical outlier (<4.6% probability), making it ideal for automated fraud alerts and traffic surge detection.

#### 3. COALESCE on Early Days
During the first row of execution ($N = 1$), sample standard deviation (\`STDDEV_SAMP\`) yields \`NULL\` because $N - 1 = 0$. Wrapping with \`COALESCE(STDDEV(...), 0)\` prevents calculation breakage on Day 1.`,
  },

  // ========================================================
  // SQL 4: Clickstream User Sessionization & Inactivity Windowing [NEW]
  // ========================================================
  {
    id: 'user-sessionization-sql',
    slug: 'user-sessionization-sql',
    title: 'Clickstream User Sessionization & Inactivity Windowing',
    track: 'sql_pipeline',
    difficulty: 'Advanced',
    roleTarget: 'Data Engineer / Analyst',
    estimatedMinutes: 35,
    tags: ['SQL', 'Sessionization', 'Window Functions', 'LAG', 'Cumulative Sum', 'Clickstream'],
    description:
      'Segment raw clickstream event logs into user sessions. A new session is triggered whenever a user has an idle gap of more than 30 minutes between consecutive events. Calculate session start, session end, duration in minutes, and total page views per session.',
    requirements: [
      'Query the `web_events` table with schema: `(event_id INT, user_id INT, event_timestamp TIMESTAMP, page_url VARCHAR)`.',
      'Use `LAG(event_timestamp) OVER (PARTITION BY user_id ORDER BY event_timestamp)` to find previous event time.',
      'Flag a new session boundary (`is_new_session = 1`) when `event_timestamp - prev_timestamp > INTERVAL \'30 minutes\'` or when `prev_timestamp IS NULL`.',
      'Compute global session IDs using cumulative window sum: `SUM(is_new_session) OVER (PARTITION BY user_id ORDER BY event_timestamp)`.',
      'Aggregate per user session: return `user_id`, `session_id`, `MIN(event_timestamp)` as `session_start`, `MAX(event_timestamp)` as `session_end`, duration in minutes, and total pages viewed.',
    ],
    files: [
      {
        name: 'query.sql',
        language: 'sql',
        content: `-- Clickstream User Sessionization & Inactivity Windowing
-- Schema: web_events(event_id INT, user_id INT, event_timestamp TIMESTAMP, page_url VARCHAR)

-- TODO:
-- 1. Step 1: Compute previous event timestamp using LAG()
-- 2. Step 2: Flag gaps exceeding 30 minutes
-- 3. Step 3: Compute running session_id using SUM() OVER ()
-- 4. Step 4: Group by session_id and calculate session duration and page views

WITH event_intervals AS (
  SELECT
    user_id,
    event_timestamp,
    page_url,
    LAG(event_timestamp) OVER (PARTITION BY user_id ORDER BY event_timestamp) AS prev_time
  FROM web_events
)
SELECT * FROM event_intervals;
`,
      },
    ],
    testCases: [
      {
        id: 'tc-session-lag-gap',
        title: 'Detects 30-minute inactivity thresholds with LAG',
        description: 'Verifies LAG window partition on user_id order by event_timestamp and 30-minute interval check',
        assertionType: 'sql_output',
      },
      {
        id: 'tc-session-cum-sum',
        title: 'Generates session IDs via cumulative sum window',
        description: 'Verifies cumulative SUM(is_new_session) OVER (PARTITION BY user_id ORDER BY event_timestamp)',
        assertionType: 'sql_output',
      },
      {
        id: 'tc-session-summary',
        title: 'Aggregates session duration and page views',
        description: 'Verifies MIN, MAX, duration calculation, and COUNT(*) page views per session',
        assertionType: 'sql_output',
      },
    ],
    testRunnerScript: `(async function testSessionizationSql(query) {
  const results = [];
  const clean = query.toLowerCase();

  const hasLag = clean.includes('lag(') && clean.includes('partition by user_id');
  const hasInterval = clean.includes('30') && (clean.includes('minute') || clean.includes('1800') || clean.includes('interval'));
  const passesLag = hasLag && hasInterval;

  results.push({
    testId: 'tc-session-lag-gap',
    title: 'Detects 30-minute inactivity thresholds with LAG',
    passed: passesLag,
    expected: 'LAG(event_timestamp) OVER (PARTITION BY user_id ORDER BY event_timestamp) with 30 minute condition',
    actual: passesLag ? 'LAG and 30-minute gap threshold detected' : 'Missing LAG partition or 30-minute idle check'
  });

  const hasCumSum =
    clean.includes('sum(') &&
    clean.includes('over') &&
    clean.includes('partition by user_id') &&
    clean.includes('order by event_timestamp');

  results.push({
    testId: 'tc-session-cum-sum',
    title: 'Generates session IDs via cumulative sum window',
    passed: hasCumSum,
    expected: 'SUM(is_new_session) OVER (PARTITION BY user_id ORDER BY event_timestamp)',
    actual: hasCumSum ? 'Cumulative window sum for session clustering verified' : 'Missing cumulative window sum for session ID'
  });

  const hasAggregates =
    clean.includes('min(') &&
    clean.includes('max(') &&
    (clean.includes('count(') || clean.includes('count (*)'));

  results.push({
    testId: 'tc-session-summary',
    title: 'Aggregates session duration and page views',
    passed: hasAggregates,
    expected: 'MIN(session_start), MAX(session_end), and COUNT(*) page views grouped by session',
    actual: hasAggregates ? 'Session aggregation queries verified' : 'Missing MIN/MAX/COUNT aggregates'
  });

  return results;
})`,
    solutionFiles: [
      {
        name: 'query.sql',
        language: 'sql',
        content: `WITH event_deltas AS (
  SELECT
    user_id,
    event_timestamp,
    page_url,
    CASE 
      WHEN event_timestamp - LAG(event_timestamp) OVER (
        PARTITION BY user_id ORDER BY event_timestamp
      ) > INTERVAL '30 minutes' 
      OR LAG(event_timestamp) OVER (
        PARTITION BY user_id ORDER BY event_timestamp
      ) IS NULL THEN 1 
      ELSE 0 
    END AS is_new_session
  FROM web_events
),
session_tags AS (
  SELECT
    user_id,
    event_timestamp,
    page_url,
    SUM(is_new_session) OVER (
      PARTITION BY user_id ORDER BY event_timestamp
    ) AS session_id
  FROM event_deltas
)
SELECT
  user_id,
  session_id,
  MIN(event_timestamp) AS session_start,
  MAX(event_timestamp) AS session_end,
  ROUND(
    EXTRACT(EPOCH FROM (MAX(event_timestamp) - MIN(event_timestamp))) / 60.0, 
    2
  ) AS session_duration_minutes,
  COUNT(*) AS total_pages_viewed
FROM session_tags
GROUP BY user_id, session_id
ORDER BY user_id, session_id;`,
      },
    ],
    editorialMarkdown: `### Architectural Walkthrough: Clickstream Sessionization Pattern

Sessionizing raw log events is the canonical interview question for analytics engineers and data warehouse architects at companies like Google, Meta, and Netflix.

#### The 3-Step Window Strategy:
1. **Find Idle Gap with \`LAG()\`**: Look back to the previous event for that specific user. If the delta is $> 30$ minutes (or if this is the user's first event where \`prev_time IS NULL\`), mark \`is_new_session = 1\`, otherwise \`0\`.
2. **Cluster into Sessions via Cumulative \`SUM()\`**: Window sums are cumulative by default when ordered:
   \`\`\`sql
   SUM(is_new_session) OVER (PARTITION BY user_id ORDER BY event_timestamp)
   \`\`\`
   Every time a \`1\` is encountered, the session index increments by 1. All subsequent events with \`0\` retain that same incremented integer, cleanly grouping all events of the session!
3. **Aggregate Metrics**: Finally, group by \`(user_id, session_id)\` to compute duration, entry/exit pages, and interaction volume.`,
  },
];
