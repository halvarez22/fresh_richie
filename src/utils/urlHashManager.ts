/**
 * URL Hash Manager - Handles browser history and hash-based navigation
 */

export interface URLHashManager {
  updateHash: (hash: string) => void;
  getCurrentHash: () => string | null;
  clearHash: () => void;
  isValidSectionHash: (hash: string) => boolean;
  handleBrowserNavigation: (callback: (hash: string | null) => void) => () => void;
  navigateToHashOnLoad: (callback: (hash: string) => void) => void;
}

const VALID_SECTION_HASHES = ['music', 'videos', 'bio', 'gallery', 'newsletter', 'contact'];

class URLHashManagerImpl implements URLHashManager {
  /**
   * Update the URL hash without triggering a page reload
   */
  updateHash(hash: string): void {
    const cleanHash = hash.startsWith('#') ? hash : `#${hash}`;
    
    if (window.location.hash !== cleanHash) {
      console.log('🔗 Updating URL hash to:', cleanHash);
      window.history.pushState({}, '', cleanHash);
    }
  }

  /**
   * Get the current hash from the URL (without the # symbol)
   */
  getCurrentHash(): string | null {
    const hash = window.location.hash.substring(1);
    return hash || null;
  }

  /**
   * Clear the hash from the URL (navigate to root)
   */
  clearHash(): void {
    console.log('🔗 Clearing URL hash');
    window.history.pushState({}, '', window.location.pathname);
  }

  /**
   * Check if a hash corresponds to a valid section
   */
  isValidSectionHash(hash: string): boolean {
    const cleanHash = hash.startsWith('#') ? hash.substring(1) : hash;
    return VALID_SECTION_HASHES.includes(cleanHash);
  }

  /**
   * Set up browser navigation event handling (back/forward buttons)
   * Returns a cleanup function to remove the event listener
   */
  handleBrowserNavigation(callback: (hash: string | null) => void): () => void {
    const handlePopState = (event: PopStateEvent) => {
      console.log('🔙 Browser navigation detected:', event);
      const currentHash = this.getCurrentHash();
      console.log('🔙 Current hash after navigation:', currentHash);
      callback(currentHash);
    };

    window.addEventListener('popstate', handlePopState);
    
    // Return cleanup function
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }

  /**
   * Handle initial navigation based on URL hash when page loads
   * SIMPLIFIED - just returns the hash, doesn't force navigation
   */
  navigateToHashOnLoad(callback: (hash: string) => void): void {
    // Wait for DOM to be ready
    const handleInitialNavigation = () => {
      const initialHash = this.getCurrentHash();
      
      console.log('🚀 URLHashManager: Initial page load, hash:', initialHash);
      
      if (initialHash && this.isValidSectionHash(initialHash)) {
        console.log('🚀 URLHashManager: Valid hash found, will callback:', initialHash);
        // Let the caller handle the navigation timing
        callback(initialHash);
      } else if (initialHash) {
        // Invalid hash, clear it
        console.log('❌ URLHashManager: Invalid hash detected, clearing:', initialHash);
        this.clearHash();
      }
      // Don't force scroll to top here - let App.tsx handle it
    };

    // If DOM is already loaded, run immediately
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      handleInitialNavigation();
    } else {
      // Wait for DOM to load
      document.addEventListener('DOMContentLoaded', handleInitialNavigation);
    }
  }
}

// Create singleton instance
const urlHashManager = new URLHashManagerImpl();

export default urlHashManager;

/**
 * React hook for URL hash management
 */
export const useURLHashManager = () => {
  return urlHashManager;
};