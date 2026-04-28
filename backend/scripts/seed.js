#!/usr/bin/env node

/**
 * CLI Script for Database Operations
 * Usage: node scripts/seed.js
 */

const { seedDatabase, clearCollections } = require('../src/seeds/seedDatabase');

const args = process.argv.slice(2);
const command = args[0] || 'seed';

const run = async () => {
  try {
    switch (command) {
      case 'seed':
        await seedDatabase({ clearFirst: true });
        process.exit(0);
        break;
        
      case 'seed:append':
        console.log('📝 Appending mock data (without clearing existing data)...\n');
        await seedDatabase({ clearFirst: false });
        process.exit(0);
        break;
        
      case 'clear':
        console.log('🧹 Clearing all data from database...\n');
        await clearCollections();
        console.log('✅ Database cleared successfully!\n');
        process.exit(0);
        break;
        
      case '--help':
      case '-h':
        console.log(`
🛠️  Civic Bridge - Database Management CLI

Commands:
  seed           - Clear database and seed with mock data (default)
  seed:append    - Add mock data without clearing existing data
  clear          - Clear all data from database
  --help         - Show this help message

Examples:
  node scripts/seed.js              # Full reset with mock data
  node scripts/seed.js seed:append  # Add mock data to existing data
  node scripts/seed.js clear        # Clear database only

        `);
        process.exit(0);
        break;
        
      default:
        console.error(`❌ Unknown command: ${command}`);
        console.log('Use "node scripts/seed.js --help" for usage information');
        process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error executing command:', error);
    process.exit(1);
  }
};

run();
