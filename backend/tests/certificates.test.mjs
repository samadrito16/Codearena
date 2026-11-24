import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { db } from '../dist/db/database.js';

await db.init();

console.log('\n--- 1. Testing Database Certificate & Public Profile Methods ---');

const users = db.listUsers();
assert.ok(users.length > 0, 'Should have users seeded in db');
const testUser = users[0];

// Test findUserByIdOrHandle
const foundById = db.findUserByIdOrHandle(testUser.id);
assert.ok(foundById, 'Should find user by id');
assert.equal(foundById.id, testUser.id);

const foundByHandle = db.findUserByIdOrHandle(testUser.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
assert.ok(foundByHandle, 'Should find user by handle-style name');
assert.equal(foundByHandle.id, testUser.id);
console.log('  [PASS] findUserByIdOrHandle successfully finds by id and handle');

// Seed test problem solves so badges and certificates have active data
await db.recordProblemSolved(testUser.id, 'two-sum');
await db.recordProblemSolved(testUser.id, 'valid-parentheses');
await db.recordProblemSolved(testUser.id, 'merge-two-sorted-lists');
await db.recordProblemSolved(testUser.id, 'reverse-linked-list');
await db.recordProblemSolved(testUser.id, 'binary-search');

// Test computeUserBadges
const badges = db.computeUserBadges(testUser.id);
assert.ok(Array.isArray(badges), 'Should return an array of badges');
assert.ok(badges.length > 0, 'Should have unlocked badges now');
assert.ok(badges[0].verificationHash.startsWith('PRISM-BDG-'), 'Badge should have PRISM-BDG hash');
console.log(`  [PASS] computeUserBadges computed ${badges.length} badges with tamper-evident hashes`);

// Test createCertificate
const year = new Date().getFullYear();
const certId = `PRISM-CERT-${year}-TEST-0001`;
const credentialHash = crypto.createHash('sha256').update(`${testUser.id}:foundation-25:${certId}`).digest('hex');

const cert = await db.createCertificate({
  id: certId,
  userId: testUser.id,
  recipientName: testUser.name,
  trackId: 'foundation-25',
  title: 'Algorithm Foundation (25 Problems)',
  description: 'Successfully verified mastery over foundational data structure and algorithm challenges on PrismCode.',
  skills: ['Arrays', 'Strings', 'Hash Maps', 'Two Pointers'],
  issueDate: new Date().toISOString(),
  credentialHash,
  metrics: {
    solvedCount: 25,
    mediumCount: 10,
    hardCount: 2,
    rankPercentile: 92.5,
  },
});

assert.ok(cert, 'Certificate should be created');
assert.ok(cert.id.startsWith('PRISM-CERT-'), 'Certificate ID format should start with PRISM-CERT-');
assert.ok(cert.credentialHash, 'Certificate should have cryptographic SHA-256 verification hash');
assert.equal(cert.recipientName, testUser.name);
console.log(`  [PASS] createCertificate generated certificate ${cert.id}`);

// Test findCertificateById
const retrievedCert = db.findCertificateById(cert.id);
assert.ok(retrievedCert, 'Should retrieve certificate by id');
assert.equal(retrievedCert.id, cert.id);
assert.equal(retrievedCert.credentialHash, cert.credentialHash);
console.log('  [PASS] findCertificateById retrieves exact certificate record');

// Test listCertificates
const userCerts = db.listCertificates(testUser.id);
assert.ok(userCerts.some((c) => c.id === cert.id), 'User certificates should contain created cert');
console.log(`  [PASS] listCertificates returns ${userCerts.length} certificates for user`);

// Test getPublicProfileData
const publicProfile = db.getPublicProfileData(testUser.id);
assert.ok(publicProfile, 'Public profile data should be generated');
assert.equal(publicProfile.visibility, 'public');
assert.ok(publicProfile.name, 'Should contain name');
assert.ok(publicProfile.stats, 'Should contain stats');
assert.ok(Array.isArray(publicProfile.badges), 'Should contain badges array');
assert.ok(Array.isArray(publicProfile.certificates), 'Should contain certificates array');
console.log('  [PASS] getPublicProfileData returns full profile, stats, badges, and certificates');

// Test Privacy Toggle
await db.updateUserProfile(testUser.id, { visibility: 'private' });
const privateProfile = db.getPublicProfileData(testUser.id);
assert.ok(privateProfile, 'Should return data even for private profile');
assert.equal(privateProfile.visibility, 'private', 'visibility must be private');
console.log('  [PASS] getPublicProfileData honors user privacy setting (visibility: private)');

// Restore public
await db.updateUserProfile(testUser.id, { visibility: 'public' });

console.log('\n================================');
console.log('All Certificate & Public Profile tests passed!');
console.log('================================\n');
process.exit(0);
