# Form Wizard Challenge

## Background

Create a flexible form wizard using React and TypeScript that guides users through multi-step data collection. The component should be easy to extend and modify, with a backend that persists the data. You'll implement a registration flow as an example, but your solution should accommodate different types of form workflows.

## Requirements

### Backend Requirements

- Single endpoint to handle final form submission
- Error handling
- Data persistence (any storage solution)

### Implementation Example

Implement a user registration flow with these steps:

#### 1. Personal Information

- First Name (Required)
- Last Name (Required)
- Email (Required, must be a valid email)

#### 2. Delivery Preferences

- Delivery Address (Required)
- Preferred Time (morning, afternoon, evening) (Required)
- Special Instructions (Optional)

#### 3. Review and Submit

- Display entered information
- Allow editing
- Submit Form

### Bonus Features (Choose 1)

1. **Progress Persistence**

    - Save partial progress to localStorage
    - Restore form state on page reload

2. **Testing Suite**

    - Unit tests for form validation
    - Integration tests for form navigation

3. **Dynamic Forms**
    - Conditional form fields based on previous answers

## Time Expectation

- Estimated time: 4-6 hours
- Focus on quality over quantity
- It's okay to leave TODOs for future improvements
