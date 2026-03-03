// Simple test to verify authentication is working
// This file can be run with: node test-auth.js

const { itemsApi } = require('./dist/server/chunks/build/api-IKHGjd3e.mjs');

async function testAuth() {
  try {
    console.log('Testing API authentication...');
    
    // This should work if cookies are properly sent
    const response = await itemsApi.getItems();
    console.log('✅ API call successful:', response);
    console.log('Items count:', response.items?.length || 0);
    
  } catch (error) {
    console.error('❌ API call failed:', error);
    if (error.detail) {
      console.error('Error detail:', error.detail);
    }
  }
}

testAuth();
