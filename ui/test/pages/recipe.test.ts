import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'

// Mock useAuth composable
vi.mock('~/composables/useAuth', () => ({
  useAuth: () => ({
    login: vi.fn(),
    logout: vi.fn(),
    isLoading: ref(false),
    error: ref(''),
    isAuthenticated: ref(true),
    currentUser: ref({ id: 1, username: 'testuser' })
  })
}))

// Mock API service
vi.mock('~/services/api', () => ({
  aiApi: {
    generateRecipe: vi.fn()
  }
}))

describe('Recipe Page', () => {
  let wrapper: any

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  it('should mount recipe page without errors', async () => {
    const Recipe = (await import('../../app/pages/recipe.vue')).default
    
    wrapper = mount(Recipe, {
      global: {
        stubs: {
          'NuxtLink': true,
          'NuxtRouteAnnouncer': true,
          'NuxtPage': true
        }
      }
    })
    
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h1').text()).toBe('ComKit')
  })

  it('should display all required UI elements', async () => {
    const Recipe = (await import('../../app/pages/recipe.vue')).default
    
    wrapper = mount(Recipe, {
      global: {
        stubs: {
          'NuxtLink': true,
          'NuxtRouteAnnouncer': true,
          'NuxtPage': true
        }
      }
    })
    
    // Check navigation elements
    expect(wrapper.find('nav').exists()).toBe(true)
    expect(wrapper.find('[data-testid="homepage-link"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="recipe-link"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="mypage-link"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="add-item-btn"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="logout-btn"]').exists()).toBe(true)
    
    // Check recipe form elements
    expect(wrapper.find('[data-testid="ingredients-textarea"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="generate-btn"]').exists()).toBe(true)
    
    // Recipe container should not be visible initially (no recipe generated yet)
    expect(wrapper.find('[data-testid="recipe-container"]').exists()).toBe(false)
  })

  it('should handle ingredient input correctly', async () => {
    const Recipe = (await import('../../app/pages/recipe.vue')).default
    
    wrapper = mount(Recipe, {
      global: {
        stubs: {
          'NuxtLink': true,
          'NuxtRouteAnnouncer': true,
          'NuxtPage': true
        }
      }
    })
    
    const ingredientsTextarea = wrapper.find('[data-testid="ingredients-textarea"]')
    await ingredientsTextarea.setValue('tomato, onion, garlic')
    
    expect((wrapper.vm as any).ingredients).toBe('tomato, onion, garlic')
  })

  it('should show loading state during recipe generation', async () => {
    const { aiApi } = await import('../../services/api')
    vi.mocked(aiApi.generateRecipe).mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({
        recipe: {
          title: 'Test Recipe',
          ingredients: ['tomato', 'onion', 'garlic'],
          instructions: ['Step 1', 'Step 2'],
          cooking_time: '30',
          servings: '4',
          difficulty: 'easy'
        },
        generated_at: '2026-03-04T12:00:00Z'
      }), 100))
    )
    
    const Recipe = (await import('../../app/pages/recipe.vue')).default
    
    wrapper = mount(Recipe, {
      global: {
        stubs: {
          'NuxtLink': true,
          'NuxtRouteAnnouncer': true,
          'NuxtPage': true
        }
      }
    })
    
    const ingredientsTextarea = wrapper.find('[data-testid="ingredients-textarea"]')
    const generateBtn = wrapper.find('[data-testid="generate-btn"]')
    
    await ingredientsTextarea.setValue('tomato, onion, garlic')
    await generateBtn.trigger('click')
    
    // Check loading state
    expect(wrapper.find('[data-testid="loading-spinner"]').exists()).toBe(true)
    expect(generateBtn.attributes('disabled')).toBeDefined()
    expect(ingredientsTextarea.attributes('disabled')).toBeDefined()
  })

  it('should display generated recipe successfully', async () => {
    const { aiApi } = await import('../../services/api')
    const mockRecipeResponse = {
      recipe: {
        title: 'Tomato Garlic Pasta',
        ingredients: [
          '400g pasta',
          '3 ripe tomatoes',
          '3 cloves garlic',
          '2 tbsp olive oil',
          'Salt and pepper to taste',
          'Fresh basil leaves'
        ],
        instructions: [
          'Cook pasta according to package directions',
          'Meanwhile, heat olive oil in a pan',
          'Add minced garlic and sauté for 1 minute',
          'Add chopped tomatoes and cook for 5 minutes',
          'Drain pasta and add to tomato mixture',
          'Season with salt and pepper',
          'Serve with fresh basil'
        ],
        cooking_time: '25',
        servings: '4',
        difficulty: 'easy'
      },
      generated_at: '2026-03-04T12:00:00Z'
    }
    
    vi.mocked(aiApi.generateRecipe).mockResolvedValue(mockRecipeResponse)
    
    const Recipe = (await import('../../app/pages/recipe.vue')).default
    
    wrapper = mount(Recipe, {
      global: {
        stubs: {
          'NuxtLink': true,
          'NuxtRouteAnnouncer': true,
          'NuxtPage': true
        }
      }
    })
    
    const ingredientsTextarea = wrapper.find('[data-testid="ingredients-textarea"]')
    const generateBtn = wrapper.find('[data-testid="generate-btn"]')
    
    await ingredientsTextarea.setValue('tomato, garlic, pasta')
    await generateBtn.trigger('click')
    
    // Wait for async operation to complete
    await new Promise(resolve => setTimeout(resolve, 150))
    
    // Check recipe display
    expect(wrapper.find('[data-testid="recipe-title"]').text()).toBe('Tomato Garlic Pasta')
    expect(wrapper.find('[data-testid="recipe-cooking-time"]').text()).toContain('25')
    expect(wrapper.find('[data-testid="recipe-servings"]').text()).toContain('4')
    expect(wrapper.find('[data-testid="recipe-difficulty"]').text()).toContain('easy')
    
    // Check ingredients list
    const ingredientItems = wrapper.findAll('[data-testid="recipe-ingredient"]')
    expect(ingredientItems.length).toBe(6)
    expect(ingredientItems[0].text()).toBe('400g pasta')
    expect(ingredientItems[1].text()).toBe('3 ripe tomatoes')
    
    // Check instructions list
    const instructionItems = wrapper.findAll('[data-testid="recipe-instruction"]')
    expect(instructionItems.length).toBe(7)
    expect(instructionItems[0].text()).toBe('Cook pasta according to package directions')
    expect(instructionItems[1].text()).toBe('Meanwhile, heat olive oil in a pan')
  })

  it('should handle API errors gracefully', async () => {
    const { aiApi } = await import('../../services/api')
    vi.mocked(aiApi.generateRecipe).mockRejectedValue({
      detail: 'AI service unavailable',
      status: 503
    })
    
    const Recipe = (await import('../../app/pages/recipe.vue')).default
    
    wrapper = mount(Recipe, {
      global: {
        stubs: {
          'NuxtLink': true,
          'NuxtRouteAnnouncer': true,
          'NuxtPage': true
        }
      }
    })
    
    const ingredientsTextarea = wrapper.find('[data-testid="ingredients-textarea"]')
    const generateBtn = wrapper.find('[data-testid="generate-btn"]')
    
    await ingredientsTextarea.setValue('tomato, garlic')
    await generateBtn.trigger('click')
    
    // Wait for async operation to complete
    await new Promise(resolve => setTimeout(resolve, 150))
    
    // Check error display
    expect(wrapper.find('[data-testid="error-message"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="error-message"]').text()).toContain('AI service unavailable')
    
    // Check that loading state is cleared
    expect(wrapper.find('[data-testid="loading-spinner"]').exists()).toBe(false)
    expect(generateBtn.attributes('disabled')).toBeUndefined()
  })

  it('should validate empty ingredients input', async () => {
    const Recipe = (await import('../../app/pages/recipe.vue')).default
    
    wrapper = mount(Recipe, {
      global: {
        stubs: {
          'NuxtLink': true,
          'NuxtRouteAnnouncer': true,
          'NuxtPage': true
        }
      }
    })
    
    const ingredientsTextarea = wrapper.find('[data-testid="ingredients-textarea"]')
    const generateBtn = wrapper.find('[data-testid="generate-btn"]')
    
    // Test with empty input
    await ingredientsTextarea.setValue('')
    await generateBtn.trigger('click')
    
    // Should not call API with empty ingredients
    const { aiApi } = await import('../../services/api')
    expect(vi.mocked(aiApi.generateRecipe)).not.toHaveBeenCalled()
  })

  it('should handle whitespace-only ingredients input', async () => {
    const Recipe = (await import('../../app/pages/recipe.vue')).default
    
    wrapper = mount(Recipe, {
      global: {
        stubs: {
          'NuxtLink': true,
          'NuxtRouteAnnouncer': true,
          'NuxtPage': true
        }
      }
    })
    
    const ingredientsTextarea = wrapper.find('[data-testid="ingredients-textarea"]')
    const generateBtn = wrapper.find('[data-testid="generate-btn"]')
    
    // Test with whitespace-only input
    await ingredientsTextarea.setValue('   \n\t   ')
    await generateBtn.trigger('click')
    
    // Should not call API with whitespace-only ingredients
    const { aiApi } = await import('../../services/api')
    expect(vi.mocked(aiApi.generateRecipe)).not.toHaveBeenCalled()
  })

  it('should display generated timestamp correctly', async () => {
    const { aiApi } = await import('../../services/api')
    const mockRecipeResponse = {
      recipe: {
        title: 'Test Recipe',
        ingredients: ['ingredient1', 'ingredient2'],
        instructions: ['Step 1', 'Step 2'],
        cooking_time: '30',
        servings: '2',
        difficulty: 'easy'
      },
      generated_at: '2026-03-04T15:30:10.508418Z'
    }
    
    vi.mocked(aiApi.generateRecipe).mockResolvedValue(mockRecipeResponse)
    
    const Recipe = (await import('../../app/pages/recipe.vue')).default
    
    wrapper = mount(Recipe, {
      global: {
        stubs: {
          'NuxtLink': true,
          'NuxtRouteAnnouncer': true,
          'NuxtPage': true
        }
      }
    })
    
    const ingredientsTextarea = wrapper.find('[data-testid="ingredients-textarea"]')
    const generateBtn = wrapper.find('[data-testid="generate-btn"]')
    
    await ingredientsTextarea.setValue('ingredient1, ingredient2')
    await generateBtn.trigger('click')
    
    // Wait for async operation to complete
    await new Promise(resolve => setTimeout(resolve, 150))
    
    // Check timestamp display
    expect(wrapper.find('[data-testid="generated-at"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="generated-at"]').text()).toContain('3/4/2026')
  })

  it('should handle logout functionality', async () => {
    const Recipe = (await import('../../app/pages/recipe.vue')).default
    
    wrapper = mount(Recipe, {
      global: {
        stubs: {
          'NuxtLink': true,
          'NuxtRouteAnnouncer': true,
          'NuxtPage': true
        }
      }
    })
    
    const logoutBtn = wrapper.find('[data-testid="logout-btn"]')
    
    // Check that logout button exists and can be clicked
    expect(logoutBtn.exists()).toBe(true)
    expect(logoutBtn.attributes('disabled')).toBeUndefined()
    
    // Test that clicking the button doesn't throw errors
    await expect(logoutBtn.trigger('click')).resolves.not.toThrow()
  })
})
