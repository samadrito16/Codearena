import { SqlPracticeQuestion } from '../../../types/placement';

export const SQL_PRACTICE_QUESTIONS: SqlPracticeQuestion[] = [
  {
    id: 'sql-001',
    title: 'Second Highest Employee Salary',
    difficulty: 'Easy',
    companyTags: ['TCS Digital', 'Infosys', 'Cognizant GenC'],
    category: 'Subqueries',
    description:
      'Write an SQL query to find the second highest distinct salary from the `Employee` table. If there is no second highest salary, return NULL.',
    schemaTables: [
      {
        tableName: 'Employee',
        columns: [
          { name: 'id', type: 'INT', isKey: true },
          { name: 'name', type: 'VARCHAR(50)' },
          { name: 'salary', type: 'INT' },
          { name: 'department_id', type: 'INT' },
        ],
        rows: [
          { id: 1, name: 'Aarav', salary: 75000, department_id: 1 },
          { id: 2, name: 'Priya', salary: 90000, department_id: 1 },
          { id: 3, name: 'Rohan', salary: 60000, department_id: 2 },
          { id: 4, name: 'Sneha', salary: 90000, department_id: 2 },
          { id: 5, name: 'Vikram', salary: 50000, department_id: 1 },
        ],
      },
    ],
    starterQuery: `-- Write your SQL query here
SELECT
  -- your columns
FROM Employee;`,
    expectedQuery: `SELECT MAX(salary) AS SecondHighestSalary
FROM Employee
WHERE salary < (SELECT MAX(salary) FROM Employee);`,
    expectedOutput: [{ SecondHighestSalary: 75000 }],
    explanation:
      'The inner query `(SELECT MAX(salary) FROM Employee)` finds the absolute highest salary (90,000). The outer query then takes the `MAX(salary)` that is strictly less than that maximum, yielding 75,000. If only 1 distinct salary exists, MAX() evaluates cleanly to NULL.',
  },
  {
    id: 'sql-002',
    title: 'Department Highest Salaries with Joins',
    difficulty: 'Medium',
    companyTags: ['Persistent', 'Accenture', 'Capgemini'],
    category: 'Joins',
    description:
      'Write an SQL query to find employees who have the highest salary in each of the departments. Join the `Employee` table with the `Department` table to output the Department Name, Employee Name, and Salary.',
    schemaTables: [
      {
        tableName: 'Department',
        columns: [
          { name: 'id', type: 'INT', isKey: true },
          { name: 'name', type: 'VARCHAR(50)' },
        ],
        rows: [
          { id: 1, name: 'Engineering' },
          { id: 2, name: 'Data Science' },
          { id: 3, name: 'Quality Assurance' },
        ],
      },
      {
        tableName: 'Employee',
        columns: [
          { name: 'id', type: 'INT', isKey: true },
          { name: 'name', type: 'VARCHAR(50)' },
          { name: 'salary', type: 'INT' },
          { name: 'department_id', type: 'INT' },
        ],
        rows: [
          { id: 1, name: 'Aditi', salary: 85000, department_id: 1 },
          { id: 2, name: 'Kunal', salary: 92000, department_id: 1 },
          { id: 3, name: 'Meera', salary: 95000, department_id: 2 },
          { id: 4, name: 'Arjun', salary: 88000, department_id: 2 },
          { id: 5, name: 'Tanvi', salary: 70000, department_id: 3 },
        ],
      },
    ],
    starterQuery: `-- Join Department and Employee to find top earners per department
SELECT
  d.name AS Department,
  e.name AS Employee,
  e.salary AS Salary
FROM Employee e
JOIN Department d ON e.department_id = d.id;`,
    expectedQuery: `SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary
FROM Employee e
JOIN Department d ON e.department_id = d.id
WHERE (e.department_id, e.salary) IN (
    SELECT department_id, MAX(salary)
    FROM Employee
    GROUP BY department_id
);`,
    expectedOutput: [
      { Department: 'Engineering', Employee: 'Kunal', Salary: 92000 },
      { Department: 'Data Science', Employee: 'Meera', Salary: 95000 },
      { Department: 'Quality Assurance', Employee: 'Tanvi', Salary: 70000 },
    ],
    explanation:
      'We group `Employee` by `department_id` to compute the maximum salary in each team. Using the tuple match `(department_id, salary) IN (...)`, we retrieve only those employees whose salary equals their department maximum.',
  },
  {
    id: 'sql-003',
    title: 'Customers Who Never Order (Anti-Join)',
    difficulty: 'Easy',
    companyTags: ['Wipro Elite', 'TCS NQT', 'Cognizant'],
    category: 'Filtering',
    description:
      'Write an SQL query to find all customers who have never placed any orders. Output the customer name under the column alias "Customers".',
    schemaTables: [
      {
        tableName: 'Customers',
        columns: [
          { name: 'id', type: 'INT', isKey: true },
          { name: 'name', type: 'VARCHAR(50)' },
        ],
        rows: [
          { id: 1, name: 'Rahul' },
          { id: 2, name: 'Ananya' },
          { id: 3, name: 'Deepak' },
          { id: 4, name: 'Simran' },
        ],
      },
      {
        tableName: 'Orders',
        columns: [
          { name: 'id', type: 'INT', isKey: true },
          { name: 'customer_id', type: 'INT' },
          { name: 'amount', type: 'INT' },
        ],
        rows: [
          { id: 101, customer_id: 1, amount: 1500 },
          { id: 102, customer_id: 3, amount: 3200 },
        ],
      },
    ],
    starterQuery: `-- Find customers without any entries in Orders
SELECT
  c.name AS Customers
FROM Customers c;`,
    expectedQuery: `SELECT c.name AS Customers
FROM Customers c
LEFT JOIN Orders o ON c.id = o.customer_id
WHERE o.id IS NULL;`,
    expectedOutput: [
      { Customers: 'Ananya' },
      { Customers: 'Simran' },
    ],
    explanation:
      'A `LEFT JOIN` preserves all rows from `Customers`. For customers without matching rows in `Orders`, the joined order columns become `NULL`. Filtering by `WHERE o.id IS NULL` gives only inactive customers.',
  },
  {
    id: 'sql-004',
    title: 'Duplicate Email Detection and Aggregation',
    difficulty: 'Easy',
    companyTags: ['TCS NQT', 'Infosys', 'Zoho'],
    category: 'Aggregation',
    description:
      'Write an SQL query to report all the duplicate emails in the `Candidate` table. Return the email strings under the column alias "Email".',
    schemaTables: [
      {
        tableName: 'Candidate',
        columns: [
          { name: 'id', type: 'INT', isKey: true },
          { name: 'email', type: 'VARCHAR(100)' },
        ],
        rows: [
          { id: 1, email: 'student1@college.edu' },
          { id: 2, email: 'placement@college.edu' },
          { id: 3, email: 'student1@college.edu' },
          { id: 4, email: 'alumni@college.edu' },
          { id: 5, email: 'placement@college.edu' },
        ],
      },
    ],
    starterQuery: `-- Group by email and count occurrences
SELECT
  email AS Email
FROM Candidate;`,
    expectedQuery: `SELECT email AS Email
FROM Candidate
GROUP BY email
HAVING COUNT(email) > 1;`,
    expectedOutput: [
      { Email: 'student1@college.edu' },
      { Email: 'placement@college.edu' },
    ],
    explanation:
      '`GROUP BY email` groups matching emails together. `HAVING COUNT(email) > 1` filters groups having two or more occurrences, effectively isolating duplicates.',
  },
  {
    id: 'sql-005',
    title: 'Department Top 3 Salaries (Dense Ranking)',
    difficulty: 'Hard',
    companyTags: ['Infosys SP', 'Persistent Martian', 'Zoho L2'],
    category: 'Window Functions',
    description:
      'A company’s executives are interested in seeing who earns the most money in each of the company’s departments. A high earner in a department is an employee who has a salary in the top three unique salaries for that department. Write an SQL query to find employees who are high earners in each department.',
    schemaTables: [
      {
        tableName: 'Department',
        columns: [
          { name: 'id', type: 'INT', isKey: true },
          { name: 'name', type: 'VARCHAR(50)' },
        ],
        rows: [
          { id: 1, name: 'IT' },
          { id: 2, name: 'Sales' },
        ],
      },
      {
        tableName: 'Employee',
        columns: [
          { name: 'id', type: 'INT', isKey: true },
          { name: 'name', type: 'VARCHAR(50)' },
          { name: 'salary', type: 'INT' },
          { name: 'department_id', type: 'INT' },
        ],
        rows: [
          { id: 1, name: 'Joe', salary: 85000, department_id: 1 },
          { id: 2, name: 'Henry', salary: 80000, department_id: 2 },
          { id: 3, name: 'Sam', salary: 60000, department_id: 2 },
          { id: 4, name: 'Max', salary: 90000, department_id: 1 },
          { id: 5, name: 'Janet', salary: 69000, department_id: 1 },
          { id: 6, name: 'Randy', salary: 85000, department_id: 1 },
          { id: 7, name: 'Will', salary: 70000, department_id: 1 },
        ],
      },
    ],
    starterQuery: `-- Use DENSE_RANK() OVER (PARTITION BY ... ORDER BY ...)
WITH RankedSalaries AS (
  SELECT
    d.name AS Department,
    e.name AS Employee,
    e.salary AS Salary,
    DENSE_RANK() OVER (PARTITION BY e.department_id ORDER BY e.salary DESC) AS rnk
  FROM Employee e
  JOIN Department d ON e.department_id = d.id
)
SELECT Department, Employee, Salary
FROM RankedSalaries;`,
    expectedQuery: `WITH RankedSalaries AS (
  SELECT
    d.name AS Department,
    e.name AS Employee,
    e.salary AS Salary,
    DENSE_RANK() OVER (PARTITION BY e.department_id ORDER BY e.salary DESC) AS rnk
  FROM Employee e
  JOIN Department d ON e.department_id = d.id
)
SELECT Department, Employee, Salary
FROM RankedSalaries
WHERE rnk <= 3;`,
    expectedOutput: [
      { Department: 'IT', Employee: 'Max', Salary: 90000 },
      { Department: 'IT', Employee: 'Joe', Salary: 85000 },
      { Department: 'IT', Employee: 'Randy', Salary: 85000 },
      { Department: 'IT', Employee: 'Will', Salary: 70000 },
      { Department: 'Sales', Employee: 'Henry', Salary: 80000 },
      { Department: 'Sales', Employee: 'Sam', Salary: 60000 },
    ],
    explanation:
      '`DENSE_RANK()` assigns ranks to distinct salaries without skipping numbers when ties occur (e.g., both Joe and Randy receive rank 2). The CTE filters for `rnk <= 3` to capture the top 3 salary tiers.',
  },
];

