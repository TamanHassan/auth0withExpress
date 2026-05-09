// Profile.test.jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Profile from './Profile.jsx';

// Mock axios to control the API response
vi.mock('axios', () => ({
  default: {
    get: vi.fn()
  }
}));

import axios from 'axios';

describe('Profile Component - Task A Tests', () => {

  // Test 1: Loading skeleton shows while fetching
  it('shows loading skeleton while loading', async () => {
    axios.get.mockImplementation(() => new Promise(() => {})); // Never resolves
    
    const { container } = render(<Profile />);
    
    // Check for loading skeleton elements - look for the div with padding
    const skeletonContainer = container.querySelector('[style*="padding: 20px"]');
    expect(skeletonContainer).toBeInTheDocument();
    
    // Check for skeleton elements within
    const skeletonAvatar = skeletonContainer.querySelector('[style*="width: 80px"]');
    expect(skeletonAvatar).toBeInTheDocument();
  });

  // Test 2: Shows user name when logged in
  it('displays user name when logged in', async () => {
    const mockUser = {
      given_name: 'John',
      name: 'John Doe',
      email: 'john.doe@example.com',
      picture: 'https://example.com/avatar.jpg'
    };
    
    axios.get.mockResolvedValue({ data: mockUser });
    
    render(<Profile />);
    
    // Wait for the component to update
    expect(await screen.findByText('Hello John')).toBeInTheDocument();
  });

  // Test 3: Shows user email when logged in
  it('displays user email when logged in', async () => {
    const mockUser = {
      given_name: 'Jane',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      picture: 'https://example.com/avatar.jpg'
    };
    
    axios.get.mockResolvedValue({ data: mockUser });
    
    render(<Profile />);
    
    expect(await screen.findByText('jane.smith@example.com')).toBeInTheDocument();
  });

  // Test 4: Shows profile picture with correct styling
  it('displays profile picture with circular border radius', async () => {
    const mockUser = {
      given_name: 'Bob',
      name: 'Bob Wilson',
      email: 'bob@example.com',
      picture: 'https://example.com/bob.jpg'
    };
    
    axios.get.mockResolvedValue({ data: mockUser });
    
    render(<Profile />);
    
    const img = await screen.findByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/bob.jpg');
    expect(img).toHaveAttribute('alt', 'Bob Wilson');
    expect(img).toHaveStyle({ width: '80px', borderRadius: '50%' });
  });

  // Test 5: Shows logout button
  it('displays logout button linking to correct URL', async () => {
    const mockUser = {
      given_name: 'Alice',
      name: 'Alice Brown',
      email: 'alice@example.com',
      picture: 'https://example.com/alice.jpg'
    };
    
    axios.get.mockResolvedValue({ data: mockUser });
    
    render(<Profile />);
    
    const logoutLink = await screen.findByText('Log out');
    expect(logoutLink).toBeInTheDocument();
    expect(logoutLink).toHaveAttribute('href', 'http://localhost:3000/logout');
  });

  // Test 6: Shows "Not logged in" when no user
  it('shows not logged in message when user is null', async () => {
    axios.get.mockRejectedValue(new Error('Not authenticated'));
    
    render(<Profile />);
    
    expect(await screen.findByText('Not logged in.')).toBeInTheDocument();
  });

  // Test 7: Falls back to name when given_name is missing
  it('uses name as fallback when given_name is missing', async () => {
    const mockUser = {
      name: 'Charlie Davis',
      email: 'charlie@example.com',
      picture: 'https://example.com/charlie.jpg'
    };
    
    axios.get.mockResolvedValue({ data: mockUser });
    
    render(<Profile />);
    
    expect(await screen.findByText('Hello Charlie Davis')).toBeInTheDocument();
  });

});
