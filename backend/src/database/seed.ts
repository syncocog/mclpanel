import { DataSource } from 'typeorm';

export async function seed(dataSource: DataSource) {
  // No test data - production ready
  // Create your first admin user through the registration endpoint
  console.log('✅ Database initialized - ready for production use');
}
